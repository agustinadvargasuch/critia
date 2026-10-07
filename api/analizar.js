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

  // Modelo a usar (gemini-3.8-flash tiene capa gratuita generosa)
  const MODEL = 'gemini-3.8-flash';

  // URL del endpoint de Gemini
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  // Construir el prompt para Gemini
  const prompt = `Eres un crítico de diseño gráfico profesional con experiencia docente. 
Analizás diseños de estudiantes con criterio técnico riguroso pero constructivo.

PROYECTO ANALIZADO:
- Tipo: ${tipo}
- Objetivo de la pieza: ${objetivo || 'No especificado'}
- Público objetivo: ${audiencia || 'No especificado'}
- Mensaje o sensación que debe transmitir: ${mensaje || 'No especificado'}

TAREA:
Analizá esta pieza de diseño gráfico según los siguientes 6 principios. 
Para cada uno, asigná un estado: "bien", "mejorar" o "revisar".

1. Jerarquía visual — ¿Qué llama la atención primero? ¿El orden visual guía correctamente la lectura?
2. Composición — Distribución de elementos, equilibrio, espacio negativo, alineación y ritmo.
3. Contraste — Legibilidad del texto, contraste de color, distinción entre elementos.
4. Tipografía — Coherencia de fuentes, variaciones de peso, espaciado y ajuste conceptual.
5. Color — Paleta, jerarquía a través del color, relación con el concepto del proyecto.
6. Coherencia conceptual — ¿Las decisiones visuales comunican el objetivo y mensaje declarados?

FORMATO DE RESPUESTA (JSON estricto, sin texto adicional):
{
  "pregunta": "Una pregunta reflexiva específica sobre ESTE diseño para que el estudiante piense antes de ver el análisis completo. Debe ser concreta, referida a algo visible en la imagen.",
  "dimensiones": [
    {
      "nombre": "Jerarquía visual",
      "estado": "bien",
      "analisis": "Descripción técnica de 2-3 oraciones. Qué funciona o qué problema hay.",
      "mejora": "Una sugerencia concreta y accionable. Dejar vacío si estado es bien."
    },
    {
      "nombre": "Composición",
      "estado": "mejorar",
      "analisis": "...",
      "mejora": "..."
    },
    {
      "nombre": "Contraste",
      "estado": "revisar",
      "analisis": "...",
      "mejora": "..."
    },
    {
      "nombre": "Tipografía",
      "estado": "bien",
      "analisis": "...",
      "mejora": ""
    },
    {
      "nombre": "Color",
      "estado": "mejorar",
      "analisis": "...",
      "mejora": "..."
    },
    {
      "nombre": "Coherencia conceptual",
      "estado": "bien",
      "analisis": "...",
      "mejora": ""
    }
  ]
}`;

  try {
    // Llamar a la API de Google Gemini
    const geminiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: mediaType || 'image/jpeg',
                  data: imagen,
                },
              },
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.4,
          maxOutputTokens: 1500,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errData = await geminiResponse.json().catch(() => ({}));
      console.error('[CRITIA] Error Gemini API:', errData);
      const errMsg = errData?.error?.message || `Error del servidor: ${geminiResponse.status}`;
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

    return res.status(200).json(parsed);

  } catch (err) {
    console.error('[CRITIA] Error inesperado:', err);
    return res.status(500).json({
      error: 'Error interno del servidor. Intentá de nuevo.',
    });
  }
}
