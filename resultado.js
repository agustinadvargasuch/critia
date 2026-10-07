/* ========================================
   CRITIA — resultado.js
   Lógica de la página de resultados
   ======================================== */

(function () {
  'use strict';

  /* ---- Referencias DOM ---- */
  const resultadoImg       = document.getElementById('resultadoImg');
  const resultadoMeta      = document.getElementById('resultadoMeta');
  const preguntaBox        = document.getElementById('preguntaBox');
  const preguntaText       = document.getElementById('preguntaText');
  const respuestaInput     = document.getElementById('respuestaInput');
  const btnVerAnalisis     = document.getElementById('btnVerAnalisis');
  const dimensionesSection = document.getElementById('dimensionesSection');
  const dimensionesContainer = document.getElementById('dimensionesContainer');
  const errorMsg           = document.getElementById('errorMsg');

  /* ==================================================
     1. LEER datos desde sessionStorage
  ================================================== */

  const base64    = sessionStorage.getItem('critia_imagen');
  const mediaType = sessionStorage.getItem('critia_mediaType') || 'image/jpeg';
  const tipo      = sessionStorage.getItem('critia_tipo');
  const objetivo  = sessionStorage.getItem('critia_objetivo');
  const resultado = JSON.parse(sessionStorage.getItem('critia_resultado') || 'null');

  if (!base64 || !resultado) {
    // No hay datos: redirigir al inicio después de mostrar mensaje
    errorMsg.textContent = 'No encontramos datos de análisis. Redirigiendo al inicio…';
    errorMsg.classList.add('visible');
    setTimeout(() => { window.location.href = 'index.html'; }, 2500);
    return;
  }

  /* ==================================================
     2. MOSTRAR imagen y metadatos
  ================================================== */

  resultadoImg.src = `data:${mediaType};base64,${base64}`;
  resultadoMeta.textContent = tipo ? `Tipo de proyecto: ${tipo}` : '';

  /* ==================================================
     3. PREGUNTA REFLEXIVA (modo aprendizaje)
     Usamos la pregunta que devuelve la API (si existe)
     o un fallback genérico.
  ================================================== */

  if (resultado.pregunta) {
    preguntaText.textContent = resultado.pregunta;
  }

  /* Botón "Ver análisis" */
  btnVerAnalisis.addEventListener('click', () => {
    preguntaBox.style.opacity = '0.6';
    preguntaBox.style.pointerEvents = 'none';
    dimensionesSection.classList.add('visible');

    // Scroll suave hacia las dimensiones
    dimensionesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ==================================================
     4. RENDERIZAR dimensiones
  ================================================== */

  const ESTADO_ICONS = {
    'bien':    { icon: '🟢', label: 'Funciona bien' },
    'mejorar': { icon: '🟡', label: 'Podría mejorarse' },
    'revisar': { icon: '🔴', label: 'Revisar' },
  };

  function renderDimensiones(dimensiones) {
    dimensionesContainer.innerHTML = '';

    dimensiones.forEach((dim, idx) => {
      const estadoInfo = ESTADO_ICONS[dim.estado] || { icon: '⚪', label: dim.estado };

      const card = document.createElement('div');
      card.className = 'dimension-card';
      card.innerHTML = `
        <div class="dimension-header">
          <span class="dimension-num">${String(idx + 1).padStart(2, '0')}</span>
          <span class="dimension-nombre">${escapeHtml(dim.nombre)}</span>
          <span class="estado-badge" title="${estadoInfo.label}">${estadoInfo.icon}</span>
        </div>
        <p class="dimension-analisis">${escapeHtml(dim.analisis)}</p>
        ${dim.mejora ? `<p class="dimension-mejora">${escapeHtml(dim.mejora)}</p>` : ''}
      `;
      dimensionesContainer.appendChild(card);
    });
  }

  if (resultado.dimensiones && resultado.dimensiones.length > 0) {
    renderDimensiones(resultado.dimensiones);
  } else {
    dimensionesContainer.innerHTML = '<p style="color:var(--fg-muted); font-size:14px;">No se pudieron cargar las dimensiones del análisis.</p>';
  }

  /* ==================================================
     5. UTILIDADES
  ================================================== */

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
