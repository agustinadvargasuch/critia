/* ========================================
   CRITIA — app.js
   Lógica de analizar.html (paso 1: archivo y tipo · paso 2: contexto y modo)
   ======================================== */

(function () {
  'use strict';

  const C = window.CRITIA;

  /* ---- ¿Es una versión nueva de una pieza ya analizada? (?v=2, ?v=3) ---- */
  const params = new URLSearchParams(location.search);
  const versionPedida = parseInt(params.get('v'), 10);
  const versionesPrevias = C.getVersiones();
  const ctxPrevio = C.getCtx();
  const esNuevaVersion = versionPedida >= 2 && versionesPrevias.length > 0 && ctxPrevio;

  /* ---- Estado ---- */
  const state = {
    dataUrl: null,    // imagen reducida, lista para mostrar y guardar
    base64: null,     // solo la parte base64, para enviar a la API
    nombre: '',       // nombre del archivo
    tipo: null,
    modo: 'directa',  // 'directa' | 'aprendizaje'
  };

  /* ---- Referencias DOM ---- */
  const $ = (id) => document.getElementById(id);
  const uploadZone = $('uploadZone');
  const fileInput = $('fileInput');
  const mainForm = $('mainForm');
  const submitBtn = $('submitBtn');
  const errorMsg = $('errorMsg');
  const loadingOverlay = $('loadingOverlay');
  const loadingStep = $('loadingStep');
  const continuarBtn = $('continuarBtn');
  const continuarHelp = $('continuarHelp');
  const backBtn = $('backBtn');

  const loadingMessages = [
    'Evaluando jerarquía visual…',
    'Analizando composición…',
    'Revisando contraste y legibilidad…',
    'Estudiando tipografía…',
    'Inspeccionando paleta de color…',
    'Evaluando coherencia conceptual…',
    'Preparando tu crítica…',
  ];

  /* ==================================================
     0. MODO "NUEVA VERSIÓN"
  ================================================== */
  if (esNuevaVersion) {
    const n = Math.min(versionPedida, 9);
    $('versionBadge').hidden = false;
    $('versionBadge').textContent = 'Versión ' + n;
    $('step1Title').innerHTML = 'Subí la<em>versión ' + n + '</em>';
    $('step1Lead').textContent = 'Usamos el mismo contexto que antes y al final comparamos con la versión anterior.';
    document.title = 'CRITIA — Versión ' + n;

    // Precargar tipo y contexto
    state.tipo = ctxPrevio.tipo || null;
    document.querySelectorAll('.tipo-btn').forEach((b) => {
      const sel = b.dataset.tipo === state.tipo;
      b.classList.toggle('selected', sel);
      b.setAttribute('aria-checked', String(sel));
    });
    $('objetivo').value = ctxPrevio.objetivo || '';
    $('audiencia').value = ctxPrevio.audiencia || '';
    $('mensaje').value = ctxPrevio.mensaje || '';

    // En una nueva versión el resultado es la comparación: no hace falta elegir modo
    document.querySelector('.mode-toggle').hidden = true;
    $('modeDesc').textContent = 'Al terminar vas a ver la comparación con la versión anterior.';
    submitBtn.firstChild.textContent = 'Comparar versiones ';
  }

  /* ==================================================
     1. UPLOAD — drag & drop + click
  ================================================== */

  uploadZone.addEventListener('click', (e) => {
    if (e.target.closest('.upload-change-btn')) return;
    if (state.dataUrl) return;
    fileInput.click();
  });

  uploadZone.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !state.dataUrl) {
      e.preventDefault();
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) handleFile(fileInput.files[0]);
  });

  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });

  uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  function handleFile(file) {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      showError('Formato no soportado. Usá PNG, JPG o WEBP. Si tenés un PDF, exportá la página como imagen.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showError('El archivo es muy grande. Máximo 10 MB.');
      return;
    }
    hideError();

    reducirImagen(file)
      .then((dataUrl) => {
        state.dataUrl = dataUrl;
        state.base64 = dataUrl.split(',')[1];
        state.nombre = file.name;
        renderPreview(dataUrl);
        updateState();
      })
      .catch(() => showError('No pudimos leer la imagen. Probá con otro archivo.'));
  }

  /* Reduce la imagen a máx. 1600 px y la pasa a JPEG.
     Así el envío es más rápido y no supera el límite de Vercel (4,5 MB). */
  function reducirImagen(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          const MAX = 1600;
          const escala = Math.min(1, MAX / Math.max(img.width, img.height));
          const w = Math.round(img.width * escala);
          const h = Math.round(img.height * escala);
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff'; // fondo blanco para PNG transparentes
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.86));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function renderPreview(dataUrl) {
    uploadZone.classList.add('has-image');
    uploadZone.querySelectorAll('.upload-preview, .upload-change-btn').forEach((el) => el.remove());
    ['.upload-icon', '.upload-text', '.upload-hint'].forEach((sel) => {
      const el = uploadZone.querySelector(sel);
      if (el) el.style.display = 'none';
    });

    const img = document.createElement('img');
    img.src = dataUrl;
    img.className = 'upload-preview';
    img.alt = 'Vista previa de tu pieza';
    uploadZone.appendChild(img);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'upload-change-btn';
    btn.textContent = 'Cambiar imagen';
    btn.addEventListener('click', resetUpload);
    uploadZone.appendChild(btn);
  }

  function resetUpload() {
    state.dataUrl = null;
    state.base64 = null;
    state.nombre = '';
    uploadZone.classList.remove('has-image');
    uploadZone.querySelectorAll('.upload-preview, .upload-change-btn').forEach((el) => el.remove());
    ['.upload-icon', '.upload-text', '.upload-hint'].forEach((sel) => {
      const el = uploadZone.querySelector(sel);
      if (el) el.style.display = '';
    });
    fileInput.value = '';
    updateState();
  }

  /* ==================================================
     2. TIPO DE PROYECTO
  ================================================== */

  document.querySelectorAll('.tipo-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tipo-btn').forEach((b) => {
        b.classList.remove('selected');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('selected');
      btn.setAttribute('aria-checked', 'true');
      state.tipo = btn.dataset.tipo;
      updateState();
    });
  });

  /* ==================================================
     3. MODO DE ANÁLISIS
  ================================================== */

  const DESCRIPCION_MODO = {
    directa: 'Ves las seis dimensiones resueltas de una vez.',
    aprendizaje: 'Antes de cada dimensión te hacemos una pregunta. Respondés y después ves qué detectó CRITIA.',
  };

  document.querySelectorAll('.mode-toggle button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-toggle button').forEach((b) => b.setAttribute('aria-checked', 'false'));
      btn.setAttribute('aria-checked', 'true');
      state.modo = btn.dataset.modo;
      $('modeDesc').textContent = DESCRIPCION_MODO[state.modo];
    });
  });

  /* ==================================================
     4. VALIDACIÓN Y NAVEGACIÓN ENTRE PASOS
  ================================================== */

  function updateState() {
    const listo = Boolean(state.dataUrl && state.tipo);
    continuarBtn.disabled = !listo;
    if (!state.dataUrl && !state.tipo) continuarHelp.textContent = 'Subí un archivo y elegí el tipo de proyecto.';
    else if (!state.dataUrl) continuarHelp.textContent = 'Falta subir el archivo.';
    else if (!state.tipo) continuarHelp.textContent = 'Falta elegir el tipo de proyecto.';
    else continuarHelp.textContent = '';

    $('resArchivo').textContent = state.nombre || '—';
    $('resArchivo').title = state.nombre || '';
    $('resTipo').textContent = state.tipo || '—';
    submitBtn.disabled = !listo;
  }

  function goToStep(n) {
    document.querySelectorAll('.step').forEach((el) => {
      el.classList.toggle('active', el.dataset.step === String(n));
    });
    document.querySelectorAll('.progress-dot').forEach((dot) => {
      const d = Number(dot.dataset.dot);
      dot.classList.toggle('active', d === n);
      dot.classList.toggle('done', d < n);
    });
    $('progressLabel').textContent = 'Paso ' + n + ' de 3';
    hideError();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (n === 2) setTimeout(() => $('objetivo').focus({ preventScroll: true }), 300);
  }

  continuarBtn.addEventListener('click', () => {
    if (!continuarBtn.disabled) goToStep(2);
  });

  backBtn.addEventListener('click', () => goToStep(1));

  /* ==================================================
     5. ENVIAR — llamar a la API y pasar al resultado
  ================================================== */

  mainForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!state.dataUrl || !state.tipo) {
      goToStep(1);
      return;
    }
    hideError();

    const ctx = {
      tipo: state.tipo,
      objetivo: $('objetivo').value.trim(),
      audiencia: $('audiencia').value.trim(),
      mensaje: $('mensaje').value.trim(),
      modo: esNuevaVersion ? (ctxPrevio.modo || 'directa') : state.modo,
    };

    showLoading();

    // Si la IA tarda más de 70 s, cortamos y avisamos
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 70000);

    try {
      const response = await fetch('/api/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          imagen: state.base64,
          mediaType: 'image/jpeg',
          tipo: ctx.tipo,
          objetivo: ctx.objetivo,
          audiencia: ctx.audiencia,
          mensaje: ctx.mensaje,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        if (response.status === 504) throw new Error('El análisis tardó demasiado. Probá de nuevo en un momento.');
        throw new Error(err.error || 'Error del servidor (' + response.status + ').');
      }

      const data = await response.json();
      const resultado = C.normalizarResultado(data);

      // Guardar
      if (!esNuevaVersion) C.resetVersiones();
      const numero = esNuevaVersion ? Math.min(versionPedida, 9) : 1;
      C.setCtx(ctx);
      C.addVersion({
        imagen: state.dataUrl,
        nombre: state.nombre,
        resultado,
        numero,
        fecha: new Date().toISOString(),
      });

      // Ir a la pantalla que corresponde
      if (esNuevaVersion) window.location.href = 'comparar.html';
      else if (ctx.modo === 'aprendizaje') window.location.href = 'aprendizaje.html';
      else window.location.href = 'resultado.html';

    } catch (err) {
      hideLoading();
      const msg = err.name === 'AbortError'
        ? 'El análisis tardó demasiado. Probá de nuevo en un momento.'
        : err.message;
      showError('Hubo un problema al analizar tu diseño: ' + msg);
      console.error('[CRITIA] Error:', err);
    } finally {
      clearTimeout(timer);
    }
  });

  /* ==================================================
     6. LOADING
  ================================================== */

  let loadingInterval = null;

  function showLoading() {
    loadingOverlay.classList.add('visible');
    let i = 0;
    loadingStep.textContent = loadingMessages[0];
    loadingInterval = setInterval(() => {
      i = (i + 1) % loadingMessages.length;
      loadingStep.textContent = loadingMessages[i];
    }, 1800);
  }

  function hideLoading() {
    loadingOverlay.classList.remove('visible');
    clearInterval(loadingInterval);
  }

  /* ==================================================
     7. ERRORES
  ================================================== */

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.add('visible');
    errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function hideError() {
    errorMsg.textContent = '';
    errorMsg.classList.remove('visible');
  }

  updateState();
})();
