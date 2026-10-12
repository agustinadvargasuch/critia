/* ========================================
   CRITIA — resultado.js
   Pantalla de crítica directa: pieza + 6 dimensiones
   ======================================== */

(function () {
  'use strict';

  const C = window.CRITIA;
  const e = C.escapeHtml;
  const app = document.getElementById('app');
  const datos = C.getAnalisisActual();

  /* ---- Sin datos: mensaje y salida ---- */
  if (!datos) {
    app.innerHTML = `
      <section class="vacio-total">
        <h1 class="display">Todavía no hay<em>una crítica</em></h1>
        <p class="lead">No encontramos un análisis en esta pestaña. Subí una pieza para empezar, o mirá un ejemplo.</p>
        <div class="acciones" style="justify-content:center">
          <a class="btn btn-dark" href="analizar.html">Analizar mi diseño</a>
          <a class="btn" href="ejemplos.html">Ver ejemplos</a>
        </div>
      </section>`;
    document.getElementById('exportarBtn').hidden = true;
    return;
  }

  const { ctx, version, demo, numero } = datos;
  const resultado = C.normalizarResultado(version.resultado);

  if (demo) {
    document.getElementById('demoPill').hidden = false;
    document.getElementById('atrasLink').href = 'ejemplos.html';
    document.title = 'CRITIA — Ejemplo: ' + version.nombre;
  }

  const campo = (label, valor) => `
    <div>
      <dt>${label}</dt>
      <dd class="${valor ? '' : 'vacio'}">${valor ? e(valor) : 'No especificado'}</dd>
    </div>`;

  const botonPieza = demo
    ? `<a class="arrow-btn" href="analizar.html">Analizar mi pieza ${C.FLECHA}</a>`
    : `<a class="arrow-btn" href="analizar.html?v=${numero + 1}">Subir versión ${numero + 1} ${C.FLECHA}</a>`;

  const dimsHtml = resultado.dimensiones.map((d, i) => `
    <div class="dim${i === 0 ? ' open' : ''}">
      <button type="button" class="dim-head" aria-expanded="${i === 0}" aria-controls="dim-${i}">
        <h2>${e(d.nombre)}</h2>
        <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        <span class="dot ${d.estado}" role="img" aria-label="${C.ESTADOS[d.estado].label}" title="${C.ESTADOS[d.estado].label}"></span>
      </button>
      <div class="dim-body bloques" id="dim-${i}">${C.bloquesHtml(d)}</div>
    </div>`).join('');

  app.innerHTML = `
    <div class="layout">
      <aside class="pieza">
        <p class="kicker">Pieza analizada${numero > 1 ? ' · versión ' + numero : ''}</p>
        <div class="pieza-img"><img src="${version.imagen}" alt="${e(version.nombre || 'Pieza analizada')}"></div>
        <dl class="ctx">
          ${campo('Tipo', ctx.tipo)}
          ${campo('Objetivo', ctx.objetivo)}
          ${campo('Público', ctx.audiencia)}
          ${campo('Concepto', ctx.mensaje)}
        </dl>
        <div class="pieza-spacer"></div>
        <div class="pieza-footer no-print">${botonPieza}</div>
      </aside>

      <main class="critica">
        <h1 class="display">Seis dimensiones,<em>una lectura honesta</em></h1>
        ${C.LEYENDA}
        <div class="dims">${dimsHtml}</div>

        ${resultado.sintesis ? `
        <section class="sintesis">
          <p class="label-slash">/ Síntesis de CRITIA</p>
          <blockquote>"${e(resultado.sintesis)}"</blockquote>
        </section>` : ''}

        <div class="acciones no-print">
          ${demo ? '' : `<a class="btn" href="aprendizaje.html">Repasar en modo aprendizaje</a>`}
          <a class="btn btn-dark" href="analizar.html">Analizar otra pieza</a>
        </div>
      </main>
    </div>`;

  /* ---- Acordeón ---- */
  app.querySelectorAll('.dim-head').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dim = btn.closest('.dim');
      const abierto = dim.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(abierto));
    });
  });

  /* ---- Exportar: abre el diálogo de impresión (Guardar como PDF) ---- */
  document.getElementById('exportarBtn').addEventListener('click', () => window.print());
})();
