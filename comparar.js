/* ========================================
   CRITIA — comparar.js
   Compara la última versión con la anterior, dimensión por dimensión
   ======================================== */

(function () {
  'use strict';

  const C = window.CRITIA;
  const e = C.escapeHtml;
  const app = document.getElementById('app');
  const versiones = C.getVersiones();
  const exportarBtn = document.getElementById('exportarBtn');

  if (versiones.length < 2) {
    exportarBtn.hidden = true;
    app.innerHTML = `
      <section class="vacio-total">
        <h1 class="display">Todavía no hay<em>dos versiones</em></h1>
        <p class="lead">Para comparar, primero analizá una pieza y después subí su versión 2 desde la pantalla de la crítica.</p>
        <div class="acciones" style="justify-content:center">
          <a class="btn btn-dark" href="${versiones.length ? 'analizar.html?v=2' : 'analizar.html'}">${versiones.length ? 'Subir versión 2' : 'Analizar mi diseño'}</a>
          <a class="btn" href="ejemplos.html">Ver ejemplos</a>
        </div>
      </section>`;
    return;
  }

  const anterior = versiones[versiones.length - 2];
  const nueva = versiones[versiones.length - 1];
  const nA = anterior.numero || versiones.length - 1;
  const nN = nueva.numero || versiones.length;
  const dA = C.normalizarResultado(anterior.resultado).dimensiones;
  const dN = C.normalizarResultado(nueva.resultado).dimensiones;

  /* ---- Calcular cambios ---- */
  const filas = C.DIMENSIONES.map((nombre, i) => {
    const a = dA[i].estado;
    const n = dN[i].estado;
    const diff = C.ESTADOS[n].rango - C.ESTADOS[a].rango;
    return { nombre, a, n, cambio: diff > 0 ? 'mejoro' : diff < 0 ? 'bajo' : 'igual' };
  });

  const mejoras = filas.filter((f) => f.cambio === 'mejoro');
  const iguales = filas.filter((f) => f.cambio === 'igual');
  const bajas = filas.filter((f) => f.cambio === 'bajo');
  const neto = mejoras.length - bajas.length;

  const plural = (n, uno, varios) => n + ' ' + (n === 1 ? uno : varios);
  const lista = (arr) => {
    const nombres = arr.map((f) => f.nombre.toLowerCase());
    if (nombres.length <= 1) return nombres.join('');
    return nombres.slice(0, -1).join(', ') + ' y ' + nombres[nombres.length - 1];
  };
  const capital = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  /* ---- Síntesis automática a partir de los cambios ---- */
  let sintesis;
  if (!mejoras.length && !bajas.length) {
    sintesis = 'Las seis dimensiones mantienen su estado. Los cambios todavía no movieron la lectura de la pieza.';
  } else {
    const partes = [];
    if (mejoras.length) partes.push(capital(lista(mejoras)) + (mejoras.length === 1 ? ' mejoró.' : ' mejoraron.'));
    if (bajas.length) partes.push(capital(lista(bajas)) + (bajas.length === 1 ? ' bajó y conviene revisarla.' : ' bajaron y conviene revisarlas.'));
    const pendientes = dN.filter((d) => d.estado === 'revisar');
    if (!bajas.length && pendientes.length) {
      partes.push(capital(lista(pendientes)) + (pendientes.length === 1 ? ' sigue siendo un punto a revisar.' : ' siguen siendo puntos a revisar.'));
    }
    sintesis = partes.join(' ');
  }

  const flechaArriba = '<svg viewBox="0 0 24 32" aria-hidden="true"><line x1="12" y1="30" x2="12" y2="3"/><polyline points="3 12 12 3 21 12"/></svg>';

  const badge = (c) => ({
    mejoro: '<span class="cambio mejoro"><b>↑</b>Mejoró</span>',
    igual: '<span class="cambio igual">= Igual</span>',
    bajo: '<span class="cambio bajo">↓ Bajó</span>',
  }[c]);

  app.innerHTML = `
    <div class="wrap">
      <section class="cabecera">
        <h1 class="vs" aria-label="Versión ${nA} frente a versión ${nN}">V${nA}<em>frente a</em>V${nN}<span class="punto" aria-hidden="true"></span></h1>
        <div class="score">
          <div class="score-num ${neto < 0 ? 'baja' : ''}">${neto > 0 ? '+' : ''}${neto}${neto !== 0 ? flechaArriba : ''}</div>
          <p class="score-desc">${plural(mejoras.length, 'mejora', 'mejoras')} · ${plural(iguales.length, 'igual', 'iguales')} · ${plural(bajas.length, 'baja', 'bajas')}</p>
        </div>
      </section>

      <section class="imagenes">
        <figure>
          <div class="img"><img src="${anterior.imagen}" alt="Versión ${nA}"></div>
          <figcaption>Versión ${nA}</figcaption>
        </figure>
        <figure>
          <div class="img"><img src="${nueva.imagen}" alt="Versión ${nN}"></div>
          <figcaption>Versión ${nN}</figcaption>
        </figure>
      </section>

      <div style="margin-top:28px">${C.LEYENDA}</div>

      <ul class="filas">
        ${filas.map((f) => `
          <li class="fila">
            <span class="nombre">${e(f.nombre)}</span>
            <span class="dot ${f.a}" role="img" aria-label="Versión ${nA}: ${C.ESTADOS[f.a].label}" title="V${nA}: ${C.ESTADOS[f.a].label}"></span>
            ${badge(f.cambio)}
            <span class="dot ${f.n}" role="img" aria-label="Versión ${nN}: ${C.ESTADOS[f.n].label}" title="V${nN}: ${C.ESTADOS[f.n].label}"></span>
            <span class="nombre der" aria-hidden="true">${e(f.nombre)}</span>
          </li>`).join('')}
      </ul>
    </div>

    <section class="band-beige sintesis-band">
      <p class="label-slash">/ Síntesis de CRITIA</p>
      <div class="sintesis-grid">
        <div>
          <blockquote>"${e(sintesis)}"</blockquote>
          ${C.normalizarResultado(nueva.resultado).sintesis ? `<p class="ia">Sobre la versión ${nN}: ${e(C.normalizarResultado(nueva.resultado).sintesis)}</p>` : ''}
        </div>
        <div class="acciones no-print">
          <button type="button" class="btn btn-sm" id="reporteBtn">Descargar reporte</button>
          <a class="btn btn-sm" href="resultado.html">Ver crítica de V${nN}</a>
          <a class="btn btn-sm btn-dark" href="analizar.html?v=${nN + 1}">Subir V${nN + 1} →</a>
        </div>
      </div>
    </section>`;

  const imprimir = () => window.print();
  exportarBtn.addEventListener('click', imprimir);
  document.getElementById('reporteBtn').addEventListener('click', imprimir);
})();
