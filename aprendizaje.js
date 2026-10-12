/* ========================================
   CRITIA — aprendizaje.js
   Modo aprendizaje: una pregunta por dimensión.
   La persona responde y después ve qué detectó CRITIA.
   ======================================== */

(function () {
  'use strict';

  const C = window.CRITIA;
  const e = C.escapeHtml;
  const app = document.getElementById('app');
  const contador = document.getElementById('contador');
  const datos = C.getAnalisisActual();

  if (!datos) {
    contador.hidden = true;
    app.innerHTML = `
      <section class="vacio-total">
        <h1 class="display">Todavía no hay<em>una pieza</em></h1>
        <p class="lead">Para usar el modo aprendizaje primero subí una pieza.</p>
        <div class="acciones" style="justify-content:center">
          <a class="btn btn-dark" href="analizar.html">Analizar mi diseño</a>
          <a class="btn" href="ejemplos.html">Ver ejemplos</a>
        </div>
      </section>`;
    return;
  }

  const { version, demo, demoId, numero } = datos;
  const dims = C.normalizarResultado(version.resultado).dimensiones;
  const sufijoDemo = demo ? '?demo=' + encodeURIComponent(demoId) : '';
  document.getElementById('salirBtn').href = 'resultado.html' + sufijoDemo;

  /* ---- Respuestas guardadas en esta pestaña ---- */
  const KEY = 'critia_respuestas_' + (demo ? demoId : (version.fecha || 'actual'));
  let respuestas = {};
  try { respuestas = JSON.parse(sessionStorage.getItem(KEY) || '{}'); } catch (err) { respuestas = {}; }
  const guardarRespuestas = () => {
    try { sessionStorage.setItem(KEY, JSON.stringify(respuestas)); } catch (err) { /* nada */ }
  };

  // Primera dimensión sin responder
  let actual = dims.findIndex((d) => !(d.nombre in respuestas));
  if (actual === -1) actual = dims.length; // todo respondido
  let viendo = Math.min(actual, dims.length - 1); // dimensión que se muestra en pantalla
  let revelado = false;

  /* ---- Estructura fija ---- */
  app.innerHTML = `
    <div class="layout">
      <aside class="pieza">
        <p class="kicker">Pieza analizada</p>
        <div class="pieza-img"><img src="${version.imagen}" alt="${e(version.nombre || 'Pieza analizada')}"></div>
        <p class="progreso-titulo">Tu progreso</p>
        <div class="barras" id="barras" aria-hidden="true">${dims.map(() => '<span></span>').join('')}</div>
        <p class="progreso-texto" id="progresoTexto"></p>
        <div class="pieza-spacer"></div>
        <div class="porque-preguntar">
          <h2>/ ¿Por qué preguntar?</h2>
          <p>"Cuando anticipás la lectura de tu propia pieza, entrenás el ojo. Ese es el objetivo."</p>
        </div>
      </aside>

      <main class="derecha">
        <section class="pregunta-card" id="card" aria-live="polite"></section>
        <section class="revelado" id="revelado" hidden></section>
        <section class="lista">
          <div class="lista-head">
            <h2>/ Crítica técnica</h2>
            <span class="candado" id="candado"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>Bloqueada</span>
          </div>
          <ul id="lista"></ul>
        </section>
      </main>
    </div>`;

  const card = document.getElementById('card');
  const reveladoEl = document.getElementById('revelado');

  /* ---- Render ---- */
  function render() {
    const terminado = actual >= dims.length;

    // Contador y barras
    contador.textContent = terminado ? '6 de 6 preguntas' : (actual + 1) + ' de 6 preguntas';
    document.querySelectorAll('#barras span').forEach((b, i) => {
      b.className = i < actual ? 'hecha' : (i === actual ? 'actual' : '');
    });
    document.getElementById('progresoTexto').innerHTML = terminado
      ? 'Completaste las seis dimensiones. <strong>Bien ahí.</strong>'
      : `Estás en la dimensión <strong>${e(dims[actual].nombre)}</strong>. Respondé para desbloquear el análisis.`;
    document.getElementById('candado').hidden = terminado;

    // Lista de dimensiones
    document.getElementById('lista').innerHTML = dims.map((d, i) => {
      const hecha = i < actual || (i === actual && revelado && viendo === actual);
      const clase = hecha ? 'hecha' : (i === actual ? 'actual' : '');
      return `<li class="${clase}">
        <button type="button" data-i="${i}" ${hecha ? '' : 'disabled'} aria-label="${e(d.nombre)}${hecha ? ': ver análisis' : ': bloqueada'}">
          <span>${e(d.nombre)}</span>
          ${hecha ? `<span class="dot ${d.estado}" title="${C.ESTADOS[d.estado].label}"></span>` : ''}
        </button>
      </li>`;
    }).join('');

    // Tarjeta principal
    if (terminado && !revelado) {
      card.innerHTML = `
        <div class="final">
          <p class="pregunta-num">Listo</p>
          <h2 style="margin-top:18px">Ya entrenaste el ojo en las seis dimensiones.</h2>
          <p>Ahora podés ver la crítica completa o subir una nueva versión con los cambios.</p>
          <div class="card-acciones" style="justify-content:flex-start">
            <a class="arrow-btn pill" href="resultado.html${sufijoDemo}">Ver crítica completa ${C.FLECHA}</a>
            ${demo ? '' : `<a class="btn btn-on-dark" href="analizar.html?v=${numero + 1}">Subir versión ${numero + 1}</a>`}
          </div>
        </div>`;
      reveladoEl.hidden = true;
      return;
    }

    const d = dims[viendo];
    const respuesta = respuestas[d.nombre];

    if (!revelado) {
      card.innerHTML = `
        <p class="pregunta-num">Pregunta ${viendo + 1} · ${e(d.nombre)}</p>
        <button type="button" class="ayuda-btn" id="ayudaBtn" aria-expanded="false" aria-label="Ver una pista">?</button>
        <h1 class="pregunta">"${e(d.pregunta)}"</h1>
        <p class="pista" id="pista" hidden>${e(d.pista || 'Mirá la pieza como si fuera la primera vez, a un metro de distancia.')}</p>
        <label class="sr-only" for="respuesta" style="position:absolute;left:-9999px">Tu respuesta</label>
        <textarea class="respuesta" id="respuesta" rows="1" placeholder="Escribí tu respuesta acá…"></textarea>
        <div class="card-acciones">
          <button type="button" class="saltar" id="saltarBtn">Prefiero ver directamente</button>
          <button type="button" class="arrow-btn pill" id="verBtn" disabled>Ver qué detectó CRITIA ${C.FLECHA}</button>
        </div>`;
      reveladoEl.hidden = true;

      const input = document.getElementById('respuesta');
      const verBtn = document.getElementById('verBtn');
      input.addEventListener('input', () => {
        verBtn.disabled = input.value.trim().length < 2;
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';
      });
      input.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' && !ev.shiftKey && !verBtn.disabled) {
          ev.preventDefault();
          revelar(input.value.trim());
        }
      });
      verBtn.addEventListener('click', () => revelar(input.value.trim()));
      document.getElementById('saltarBtn').addEventListener('click', () => revelar(''));
      document.getElementById('ayudaBtn').addEventListener('click', (ev) => {
        const pista = document.getElementById('pista');
        pista.hidden = !pista.hidden;
        ev.currentTarget.setAttribute('aria-expanded', String(!pista.hidden));
      });
      setTimeout(() => input.focus({ preventScroll: true }), 50);
    } else {
      card.innerHTML = `
        <p class="pregunta-num">Pregunta ${viendo + 1} · ${e(d.nombre)}</p>
        <h1 class="pregunta">"${e(d.pregunta)}"</h1>
        <div class="tu-lectura">
          <p class="kicker">Tu lectura</p>
          <p>${respuesta ? e(respuesta) : '<em style="opacity:.6">No respondiste esta pregunta.</em>'}</p>
        </div>`;

      const esUltima = actual >= dims.length - 1 && viendo === actual;
      const esRepaso = viendo < actual;
      reveladoEl.hidden = false;
      reveladoEl.innerHTML = `
        <div class="revelado-head">
          <h2>Lo que detectó CRITIA</h2>
          <span class="estado"><span class="dot ${d.estado}" style="width:22px;height:22px"></span>${C.ESTADOS[d.estado].label}</span>
        </div>
        <div class="bloques">${C.bloquesHtml(d)}</div>
        <div class="siguiente">
          ${esRepaso
            ? `<button type="button" class="arrow-btn" id="sigBtn">Volver a la pregunta actual ${C.FLECHA}</button>`
            : `<button type="button" class="arrow-btn" id="sigBtn">${esUltima ? 'Terminar' : 'Siguiente pregunta'} ${C.FLECHA}</button>`}
        </div>`;

      document.getElementById('sigBtn').addEventListener('click', () => {
        if (!esRepaso) actual += 1;
        revelado = false;
        viendo = Math.min(actual, dims.length - 1);
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function revelar(texto) {
    respuestas[dims[viendo].nombre] = texto;
    guardarRespuestas();
    revelado = true;
    render();
    reveladoEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* Repasar una dimensión ya respondida */
  document.getElementById('lista').addEventListener('click', (ev) => {
    const btn = ev.target.closest('button[data-i]');
    if (!btn || btn.disabled) return;
    const i = Number(btn.dataset.i);
    if (i === viendo && revelado) return;
    // Si estaba en medio de la pregunta actual, se guarda el avance al volver
    viendo = i;
    revelado = true;
    if (actual >= dims.length) actual = dims.length; // ya terminado
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  render();
})();
