/* ========================================
   CRITIA — critia-common.js
   Funciones compartidas entre pantallas:
   guardar/leer el análisis, íconos, utilidades.
   ======================================== */

(function () {
  'use strict';

  /* Las 6 dimensiones, siempre en este orden */
  const DIMENSIONES = [
    'Jerarquía visual',
    'Composición',
    'Contraste',
    'Tipografía',
    'Color',
    'Coherencia conceptual',
  ];

  /* Estados posibles y su orden (para comparar versiones) */
  const ESTADOS = {
    bien:    { label: 'Funciona bien',    rango: 3 },
    mejorar: { label: 'Podría mejorarse', rango: 2 },
    revisar: { label: 'Revisar',          rango: 1 },
  };

  /* Preguntas por defecto del modo aprendizaje (si la IA no manda una) */
  const PREGUNTAS_BASE = {
    'Jerarquía visual': '¿Cuál creés que es el primer elemento que ve una persona en tu pieza?',
    'Composición': '¿Dónde sentís que la pieza está más cargada y dónde le sobra aire?',
    'Contraste': '¿Qué parte de la pieza creés que se lee con más dificultad?',
    'Tipografía': '¿Por qué elegiste esa tipografía y qué querías que transmitiera?',
    'Color': '¿Qué color manda en tu pieza y qué querés que comunique?',
    'Coherencia conceptual': 'Si alguien ve la pieza sin contexto, ¿qué palabra creés que usaría para describirla?',
  };

  /* ---------- Almacenamiento (sessionStorage) ---------- */
  const KEY_CTX = 'critia_ctx';
  const KEY_VERS = 'critia_versiones';

  function leer(key, fallback) {
    try {
      const v = sessionStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function guardar(key, valor) {
    try {
      sessionStorage.setItem(key, JSON.stringify(valor));
      return true;
    } catch (e) {
      console.error('[CRITIA] No se pudo guardar en sessionStorage', e);
      return false;
    }
  }

  /* Contexto del proyecto: tipo, objetivo, audiencia, mensaje, modo */
  function getCtx() { return leer(KEY_CTX, null); }
  function setCtx(ctx) { return guardar(KEY_CTX, ctx); }

  /* Versiones analizadas: [{ imagen, nombre, resultado, fecha }] */
  function getVersiones() { return leer(KEY_VERS, []); }

  function addVersion(version) {
    const lista = getVersiones();
    lista.push(version);
    // Guardamos como máximo 3 versiones para no llenar la memoria del navegador
    while (lista.length > 3) lista.shift();
    if (!guardar(KEY_VERS, lista)) {
      // Si no entra, nos quedamos solo con la última
      guardar(KEY_VERS, [version]);
    }
  }

  function resetVersiones() {
    try { sessionStorage.removeItem(KEY_VERS); } catch (e) { /* nada */ }
  }

  /* Datos para mostrar en resultado/aprendizaje: análisis propio o ejemplo (?demo=id) */
  function getAnalisisActual() {
    const params = new URLSearchParams(location.search);
    const demoId = params.get('demo');
    if (demoId && window.CRITIA_EJEMPLOS) {
      const ej = window.CRITIA_EJEMPLOS.find((e) => e.id === demoId) || window.CRITIA_EJEMPLOS[0];
      return {
        demo: true,
        demoId: ej.id,
        ctx: { tipo: ej.tipo, objetivo: ej.objetivo, audiencia: ej.audiencia, mensaje: ej.mensaje },
        version: { imagen: svgToDataUrl(ej.svg), nombre: ej.titulo, resultado: ej.resultado },
        numero: 1,
      };
    }
    const versiones = getVersiones();
    if (!versiones.length) return null;
    return {
      demo: false,
      ctx: getCtx() || {},
      version: versiones[versiones.length - 1],
      numero: versiones[versiones.length - 1].numero || versiones.length,
    };
  }

  /* ---------- Utilidades ---------- */
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function svgToDataUrl(svg) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  /* Normaliza la respuesta de la IA para que siempre tenga las 6 dimensiones */
  function normalizarResultado(res) {
    const dims = (res && Array.isArray(res.dimensiones)) ? res.dimensiones : [];
    return {
      sintesis: (res && res.sintesis) || '',
      dimensiones: DIMENSIONES.map((nombre, i) => {
        const d = dims.find((x) => x && x.nombre === nombre)
          || (dims[i] && !DIMENSIONES.includes(dims[i].nombre) ? dims[i] : {});
        const estado = ESTADOS[d.estado] ? d.estado : 'mejorar';
        return {
          nombre,
          estado,
          funciona: d.funciona || '',
          problema: d.problema || '',
          porque: d.porque || '',
          mejora: d.mejora || '',
          pregunta: d.pregunta || PREGUNTAS_BASE[nombre],
          pista: d.pista || '',
        };
      }),
    };
  }

  let toastTimer = null;
  function toast(msg) {
    let el = document.getElementById('critiaToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'critiaToast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('visible'), 3600);
  }

  /* Íconos SVG de los 4 bloques de cada dimensión */
  const ICONOS = {
    funciona: '<span class="q-icon funciona" aria-hidden="true"><svg viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="6 11 12 5 18 11"/></svg></span>',
    problema: '<span class="q-icon problema" aria-hidden="true"><svg viewBox="0 0 24 24"><line x1="7" y1="7" x2="17" y2="17"/><line x1="17" y1="7" x2="7" y2="17"/></svg></span>',
    porque:   '<span class="q-icon porque" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9.2 9a3 3 0 1 1 4.3 2.7c-.9.4-1.5 1.2-1.5 2.2v.6"/><line x1="12" y1="18" x2="12" y2="18.2"/></svg></span>',
    mejora:   '<span class="q-icon mejora" aria-hidden="true"><svg viewBox="0 0 24 24"><line x1="6" y1="12" x2="18" y2="12"/><polyline points="13 7 18 12 13 17"/></svg></span>',
  };

  const FLECHA = '<span class="arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg></span>';

  /* HTML de los 4 bloques de una dimensión (usado en resultado y aprendizaje) */
  function bloquesHtml(dim) {
    const e = escapeHtml;
    const bloque = (clave, label, texto, naranja) => `
      <div class="bloque">
        <div class="bloque-label${naranja ? ' naranja' : ''}">${ICONOS[clave]}<span>${label}</span></div>
        <p>${e(texto) || '<span style="color:var(--gray-500)">Sin observaciones.</span>'}</p>
      </div>`;
    return (
      bloque('funciona', 'Lo que funciona', dim.funciona) +
      bloque('problema', 'Lo que genera un problema', dim.problema, true) +
      bloque('porque', 'Por qué es un problema', dim.porque) +
      bloque('mejora', 'Dirección de mejora', dim.mejora)
    );
  }

  /* Leyenda del semáforo */
  const LEYENDA = '<div class="legend" aria-label="Referencias"><span><i class="dot bien"></i>Funciona bien</span><span><i class="dot mejorar"></i>Podría mejorarse</span><span><i class="dot revisar"></i>Revisar</span></div>';

  window.CRITIA = {
    bloquesHtml,
    LEYENDA,
    DIMENSIONES,
    ESTADOS,
    PREGUNTAS_BASE,
    ICONOS,
    FLECHA,
    getCtx,
    setCtx,
    getVersiones,
    addVersion,
    resetVersiones,
    getAnalisisActual,
    normalizarResultado,
    escapeHtml,
    svgToDataUrl,
    toast,
  };
})();
