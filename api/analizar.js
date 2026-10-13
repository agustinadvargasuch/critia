/* ========================================
   CRITIA — api/analizar.js
   Vercel Serverless Function con Google Gemini

   ⚠️  IMPORTANTE:
   La API key de Gemini NUNCA va acá adentro.
   Se guarda en Vercel → Settings → Environment Variables
   como: GEMINI_API_KEY = AIza...
   ======================================== */

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Leer datos del cuerpo de la solicitud
  const { imagen, mediaType, tipo, objetivo, audiencia, mensaje } = req.body;

  // Validaciones básicas
  if (!imagen) return res.status(400).json({ error: 'Falta la imagen.' });
  if (!tipo)   return res.status(400).json({ error: 'Falta el tipo de proyecto.' });

  // Verificar que tenemos la API key (configurada en Vercel)
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key no configurada en el servidor.' });
  }

  // Modelo de Gemini
  const MODEL = 'gemini-3.8-flash';

  // Tiempo máximo que esperamos a Gemini (un poco menos que maxDuration de vercel.json)
  const LIMITE_MS = 110000;

  // URL del endpoint de Gemini
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  // Construir el prompt para Gemini
  const prompt = `Sos un crítico de diseño gráfico profesional con experiencia docente.
Analizás piezas de estudiantes y freelancers con criterio técnico riguroso pero constructivo.
Escribís en español rioplatense (voseo), con vocabulario técnico y sin adjetivos vacíos.
Nunca digas "me gusta" o "es lindo": describí qué pasa y por qué.

PROYECTO ANALIZADO:
- Tipo: ${tipo}
- Objetivo de la pieza: ${objetivo || 'No especificado'}
- Público objetivo: ${audiencia || 'No especificado'}
- Concepto o sensación que debe transmitir: ${mensaje || 'No especificado'}

TAREA:
Analizá la pieza según estas 6 dimensiones, en este orden exacto:
1. Jerarquía visual: qué se ve primero, qué después, si el ojo tiene un camino claro.
2. Composición: distribución, equilibrio, espacio negativo, alineación y ritmo.
3. Contraste: legibilidad, relación figura-fondo, foco.
4. Tipografía: elección, mezcla, peso, espaciado y ajuste conceptual.
5. Color: paleta, temperatura, jerarquía por color, relación con el concepto.
6. Coherencia conceptual: si la forma comunica el objetivo y el concepto declarados.

Para cada dimensión asigná un estado: "bien", "mejorar" o "revisar", y completá:
- "funciona": qué está resuelto (1 o 2 oraciones, referidas a algo visible).
- "problema": qué genera un problema, señalado con precisión. Si el estado es "bien", poné un detalle menor a cuidar.
- "porque": el principio de diseño detrás, para que la persona lo entienda.
- "mejora": una dirección concreta de mejora (un camino, no una receta).
- "pregunta": una pregunta corta y concreta sobre ESTA pieza para que la persona piense esa dimensión antes de ver tu análisis.
- "pista": una pista breve que ayude a responder la pregunta sin dar la respuesta.

Además, "sintesis": 1 o 2 oraciones que resuman lo más importante de la crítica.

Sé breve: cada campo tiene como máximo 30 palabras. La pregunta y la pista, como máximo 20 palabras cada una.

Respondé SOLO con JSON válido, con esta forma exacta:
{
  "sintesis": "...",
  "dimensiones": [
    { "nombre": "Jerarquía visual", "estado": "bien|mejorar|revisar", "funciona": "...", "problema": "...", "porque": "...", "mejora": "...", "pregunta": "...", "pista": "..." },
    { "nombre": "Composición", ... },
    { "nombre": "Contraste", ... },
    { "nombre": "Tipografía", ... },
    { "nombre": "Color", ... },
    { "nombre": "Coherencia conceptual", ... }
  ]
}`;

  try {
    // Llamar a la API de Google Gemini.
    // "thinkingLevel: low" hace que el modelo piense menos y responda más rápido.
    // Si el modelo no acepta esa opción, se reintenta sin ella.
    const inicio = Date.now();
    const restante = () => LIMITE_MS - (Date.now() - inicio);
    const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

    const llamarGemini = (rapido) => {
      const generationConfig = {
        responseMimeType: 'application/json',
        temperature: 0.4,
        maxOutputTokens: 6000,
      };
      if (rapido) generationConfig.thinkingConfig = { thinkingLevel: 'low' };

      // Cortamos antes del límite de Vercel para poder devolver un mensaje claro
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), Math.max(restante(), 1000));

      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { inlineData: { mimeType: mediaType || 'image/jpeg', data: imagen } },
                { text: prompt },
              ],
            },
          ],
          generationConfig,
        }),
      }).finally(() => clearTimeout(timer));
    };

    // Pedido con reintentos: si Google está saturado (503/429/500),
    // esperamos unos segundos y volvemos a probar, hasta 3 intentos.
    let rapido = true;
    let geminiResponse;
    for (let intento = 1; intento <= 3; intento++) {
      geminiResponse = await llamarGemini(rapido);

      // El modelo no acepta "thinkingLevel": reintentar sin esa opción
      if (geminiResponse.status === 400 && rapido) {
        const errTxt = await geminiResponse.clone().text().catch(() => '');
        if (/thinking/i.test(errTxt)) {
          console.warn('[CRITIA] El modelo no acepta thinkingLevel, reintento sin esa opción');
          rapido = false;
          geminiResponse = await llamarGemini(false);
        }
      }

      const saturado = [429, 500, 503].includes(geminiResponse.status);
      if (!saturado) break;

      const pausa = intento === 1 ? 3000 : 7000;
      if (intento === 3 || restante() < pausa + 20000) break; // no queda tiempo para otro intento
      console.warn('[CRITIA] Gemini saturado (' + geminiResponse.status + '), intento', intento, '- reintento en', pausa, 'ms');
      await esperar(pausa);
    }
    console.log('[CRITIA] Gemini respondió en', Date.now() - inicio, 'ms con estado', geminiResponse.status);

    if (!geminiResponse.ok) {
      const errData = await geminiResponse.json().catch(() => ({}));
      console.error('[CRITIA] Error Gemini API:', errData);
      const status = geminiResponse.status;
      let errMsg;
      if (status === 503 || status === 500) {
        errMsg = 'La IA de Google está con mucha demanda en este momento. Esperá unos minutos y probá de nuevo.';
      } else if (status === 429) {
        errMsg = 'Se alcanzó el límite de análisis por minuto de la IA. Esperá un minuto y probá de nuevo.';
      } else {
        errMsg = errData?.error?.message || `Error del servidor: ${status}`;
      }
      return res.status(502).json({ error: errMsg });
    }

    const geminiData = await geminiResponse.json();

    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!rawText) {
      console.error('[CRITIA] Respuesta vacía de Gemini:', JSON.stringify(geminiData));
      return res.status(500).json({ error: 'La IA no devolvió una respuesta. Intentá de nuevo.' });
    }

    let parsed;
    try {
      const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('[CRITIA] Error parsing JSON de Gemini:', rawText);
      return res.status(500).json({
        error: 'La IA devolvió un formato inesperado. Intentá de nuevo.',
      });
    }

    // Asegurar que siempre vuelvan las 6 dimensiones con todos los campos
    const NOMBRES = ['Jerarquía visual', 'Composición', 'Contraste', 'Tipografía', 'Color', 'Coherencia conceptual'];
    const dims = Array.isArray(parsed.dimensiones) ? parsed.dimensiones : [];
    const resultado = {
      sintesis: typeof parsed.sintesis === 'string' ? parsed.sintesis : '',
      dimensiones: NOMBRES.map((nombre, i) => {
        const d = dims.find((x) => x && x.nombre === nombre)
          || (dims[i] && !NOMBRES.includes(dims[i].nombre) ? dims[i] : {});
        return {
          nombre,
          estado: ['bien', 'mejorar', 'revisar'].includes(d.estado) ? d.estado : 'mejorar',
          funciona: d.funciona || '',
          problema: d.problema || '',
          porque: d.porque || '',
          mejora: d.mejora || '',
          pregunta: d.pregunta || '',
          pista: d.pista || '',
        };
      }),
    };

    return res.status(200).json(resultado);

  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('[CRITIA] Gemini tardó más de', LIMITE_MS, 'ms');
      return res.status(504).json({ error: 'La IA tardó demasiado en responder. Probá de nuevo en un momento.' });
    }
    console.error('[CRITIA] Error inesperado:', err);
    return res.status(500).json({
      error: 'Error interno del servidor. Intentá de nuevo.',
    });
  }
}
