/* ========================================
   CRITIA — app.js
   Lógica de la página principal (analizar.html)
   ======================================== */

(function () {
  'use strict';

  /* ---- Estado ---- */
  const state = {
    file: null,       // File object
    base64: null,     // string sin prefijo data:...
    mediaType: null,  // 'image/jpeg' | 'image/png' | 'image/webp'
    tipo: null,       // string seleccionado
  };

  /* ---- Referencias DOM ---- */
  const uploadZone   = document.getElementById('uploadZone');
  const fileInput    = document.getElementById('fileInput');
  const mainForm     = document.getElementById('mainForm');
  const submitBtn    = document.getElementById('submitBtn');
  const errorMsg     = document.getElementById('errorMsg');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loadingStep  = document.getElementById('loadingStep');
  const continuarBtn = document.getElementById('continuarBtn');
  const continuarHelp = document.getElementById('continuarHelp');
  const submitHelp   = document.getElementById('submitHelp');
  const backBtn      = document.getElementById('backBtn');

  /* ---- Mensajes de carga rotativos ---- */
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
     1. UPLOAD — drag & drop + click
  ================================================== */

  /* Click en la zona abre el selector */
  uploadZone.addEventListener('click', (e) => {
    // Evitar que el botón "Cambiar imagen" (dentro de la zona) reabra el input
    if (e.target.closest('.upload-change-btn')) return;
    fileInput.click();
  });

  /* Teclado: Enter o espacio abren el selector */
  uploadZone.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !state.base64) {
      e.preventDefault();
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) handleFile(fileInput.files[0]);
  });

  /* Drag & drop */
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });

  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  /* Procesar archivo */
  function handleFile(file) {
    // Validar tipo
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      showError('Formato no soportado. Usá JPG, PNG o WebP.');
      return;
    }
    // Validar tamaño (10 MB)
    if (file.size > 10 * 1024 * 1024) {
      showError('El archivo es muy grande. Máximo 10 MB.');
      return;
    }

    hideError();
    state.file = file;
    state.mediaType = file.type;

    const reader = new FileReader();
    reader.onload = (e) => {
      // e.target.result = "data:image/png;base64,AAAA..."
      const dataUrl = e.target.result;
      state.base64 = dataUrl.split(',')[1]; // Solo la parte base64

      // Mostrar preview
      renderPreview(dataUrl);

      updateSubmitState();
    };
    reader.readAsDataURL(file);
  }

  /* Mostrar preview en la upload zone */
  function renderPreview(dataUrl) {
    uploadZone.classList.add('has-image');

    // Limpiar contenido anterior (mantener el input)
    const existingPreview = uploadZone.querySelector('.upload-preview');
    const existingBtn = uploadZone.querySelector('.upload-change-btn');
    if (existingPreview) existingPreview.remove();
    if (existingBtn) existingBtn.remove();
    // Ocultar texto
    const icon = uploadZone.querySelector('.upload-icon');
    const text = uploadZone.querySelector('.upload-text');
    const hint = uploadZone.querySelector('.upload-hint');
    if (icon) icon.style.display = 'none';
    if (text) text.style.display = 'none';
    if (hint) hint.style.display = 'none';

    const img = document.createElement('img');
    img.src = dataUrl;
    img.className = 'upload-preview';
    img.alt = 'Preview de tu diseño';
    uploadZone.appendChild(img);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'upload-change-btn';
    btn.textContent = 'Cambiar imagen';
    btn.addEventListener('click', resetUpload);
    uploadZone.appendChild(btn);
  }

  /* Resetear zona de upload */
  function resetUpload() {
    state.file = null;
    state.base64 = null;
    state.mediaType = null;

    uploadZone.classList.remove('has-image');
    const img = uploadZone.querySelector('.upload-preview');
    const btn = uploadZone.querySelector('.upload-change-btn');
    if (img) img.remove();
    if (btn) btn.remove();

    const icon = uploadZone.querySelector('.upload-icon');
    const text = uploadZone.querySelector('.upload-text');
    const hint = uploadZone.querySelector('.upload-hint');
    if (icon) icon.style.display = '';
    if (text) text.style.display = '';
    if (hint) hint.style.display = '';

    fileInput.value = '';
    updateSubmitState();
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
      updateSubmitState();
    });
  });

  /* ==================================================
     3. VALIDACIÓN del botón submit
  ================================================== */

  function updateSubmitState() {
    const objetivo = document.getElementById('objetivo');
    const audiencia = document.getElementById('audiencia');
    const mensaje = document.getElementById('mensaje');

    const formReady =
      state.base64 &&
      state.tipo &&
      objetivo && objetivo.value.trim() &&
      audiencia && audiencia.value.trim() &&
      mensaje && mensaje.value.trim();

    submitBtn.disabled = !formReady;

    // Paso 1: necesita archivo + tipo
    const paso1Listo = Boolean(state.base64 && state.tipo);
    continuarBtn.disabled = !paso1Listo;
    if (!state.base64 && !state.tipo) continuarHelp.textContent = 'Subí un archivo y elegí el tipo de proyecto.';
    else if (!state.base64) continuarHelp.textContent = 'Falta subir el archivo.';
    else if (!state.tipo) continuarHelp.textContent = 'Falta elegir el tipo de proyecto.';
    else continuarHelp.textContent = '';

    submitHelp.textContent = formReady ? '' : 'Completá los tres campos.';
  }

  /* ==================================================
     3b. NAVEGACIÓN ENTRE PASOS
  ================================================== */

  function goToStep(n) {
    document.querySelectorAll('.step').forEach((el) => {
      el.classList.toggle('active', el.dataset.step === String(n));
    });
    document.querySelectorAll('.progress-dot').forEach((dot) => {
      const d = Number(dot.dataset.dot);
      dot.classList.toggle('active', d === n);
      dot.classList.toggle('done', d < n);
    });
    document.getElementById('progressLabel').textContent = 'Paso ' + n + ' de 3';
    hideError();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (n === 2) {
      const first = document.getElementById('objetivo');
      if (first) setTimeout(() => first.focus({ preventScroll: true }), 300);
    }
  }

  continuarBtn.addEventListener('click', () => {
    if (!continuarBtn.disabled) goToStep(2);
  });

  backBtn.addEventListener('click', () => goToStep(1));

  /* Escuchar cambios en los inputs del formulario */
  ['objetivo', 'audiencia', 'mensaje'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateSubmitState);
  });

  /* ==================================================
     4. SUBMIT — llamar API y navegar a resultado
  ================================================== */

  mainForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const objetivo = document.getElementById('objetivo').value.trim();
    const audiencia = document.getElementById('audiencia').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Guardar contexto en sessionStorage para resultado.html
    sessionStorage.setItem('critia_imagen', state.base64);
    sessionStorage.setItem('critia_mediaType', state.mediaType);
    sessionStorage.setItem('critia_tipo', state.tipo);
    sessionStorage.setItem('critia_objetivo', objetivo);
    sessionStorage.setItem('critia_audiencia', audiencia);
    sessionStorage.setItem('critia_mensaje', mensaje);

    // Mostrar loading
    showLoading();

    try {
      // Llamar al endpoint
      const response = await fetch('/api/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imagen: state.base64,
          mediaType: state.mediaType,
          tipo: state.tipo,
          objetivo,
          audiencia,
          mensaje,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Error del servidor: ${response.status}`);
      }

      const data = await response.json();

      // Guardar resultado en sessionStorage
      sessionStorage.setItem('critia_resultado', JSON.stringify(data));

      // Navegar a resultado.html
      window.location.href = 'resultado.html';

    } catch (err) {
      hideLoading();
      showError('Hubo un problema al analizar tu diseño: ' + err.message);
      console.error('[CRITIA] Error:', err);
    }
  });

  /* ==================================================
     5. LOADING overlay
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
     6. ERRORES
  ================================================== */

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.add('visible');
  }

  function hideError() {
    errorMsg.textContent = '';
    errorMsg.classList.remove('visible');
  }

})();
