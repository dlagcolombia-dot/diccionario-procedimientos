# 📚 Glosario Técnico

> Tu diccionario visual de tecnología - Explicado en lenguaje simple

<div class="container-fluid px-0">
  <!-- Barra de búsqueda -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="input-group">
        <span class="input-group-text bg-white">
          <i class="bi bi-search"></i>
        </span>
        <input type="text" id="search-tec" class="form-control" placeholder="Buscar término técnico..." oninput="filtrarTec()" />
      </div>
    </div>
  </div>

  <!-- Proponer nuevo término -->
  <div id="glosario-form-container" class="card border-0 shadow-sm mb-4" style="display:none;">
    <div class="card-body">
      <div class="d-flex align-items-center gap-2 mb-3">
        <i class="bi bi-plus-circle-fill text-danger fs-4"></i>
        <h5 class="mb-0">Agregar una palabra nueva al glosario</h5>
      </div>
      <p class="text-muted mb-3">Si conoces un término que falta, puedes proponerlo aquí para que lo añadamos al diccionario.</p>
      <div class="row g-3">
        <div class="col-md-4">
          <input type="text" id="nuevo-termino" class="form-control" placeholder="Ej. API Gateway" />
        </div>
        <div class="col-md-4">
          <input type="text" id="nueva-definicion" class="form-control" placeholder="Definición breve" />
        </div>
        <div class="col-md-4">
          <select id="nueva-categoria" class="form-select">
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="arquitectura">Arquitectura</option>
            <option value="basedatos">Base de Datos</option>
            <option value="automatizacion">Automatización</option>
            <option value="versiones">Versiones</option>
            <option value="gestion">Gestión</option>
          </select>
        </div>
      </div>
      <div class="mt-3 d-flex gap-2">
        <button class="btn btn-danger" onclick="agregarTerminoGlosario()">Enviar propuesta</button>
        <span id="msg-glosario" class="align-self-center text-success" style="display:none"></span>
      </div>
    </div>
  </div>

  <!-- Categorías -->
  <div class="mb-4">
    <div class="d-flex flex-wrap gap-2" id="cats-tec">
      <button class="btn btn-sm btn-outline-danger active" onclick="setCatTec('todos', this)">Todos</button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatTec('frontend', this)">
        <i class="bi bi-laptop"></i> Frontend
      </button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatTec('backend', this)">
        <i class="bi bi-server"></i> Backend
      </button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatTec('arquitectura', this)">
        <i class="bi bi-diagram-3"></i> Arquitectura
      </button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatTec('basedatos', this)">
        <i class="bi bi-database"></i> Base de Datos
      </button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatTec('automatizacion', this)">
        <i class="bi bi-robot"></i> Automatización
      </button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatTec('versiones', this)">
        <i class="bi bi-git"></i> Versiones
      </button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatTec('gestion', this)">
        <i class="bi bi-clipboard-check"></i> Gestión
      </button>
    </div>
  </div>

  <!-- Grid de términos -->
  <div id="grid-tec" class="row g-3"></div>

  <!-- Mensaje vacío -->
  <div id="empty-tec" class="alert alert-info" style="display:none">
    <i class="bi bi-inbox"></i> No se encontraron términos con ese criterio
  </div>
</div>

<style>
.glosario-card {
  transition: all 0.3s ease;
  border: 2px solid transparent !important;
}

.glosario-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.15) !important;
  border-color: #b91c1c !important;
}

.glosario-header {
  background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%) !important;
  padding: 1.25rem !important;
}

.glosario-icon {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(185, 28, 28, 0.3);
  flex-shrink: 0;
}

.btn-outline-danger {
  border: none !important;
  background-color: #f3f4f6 !important;
  color: #6b7280 !important;
}

.btn-outline-danger.active {
  background-color: #b91c1c !important;
  color: white !important;
}

.btn-outline-danger:hover {
  background-color: #fee2e2 !important;
  color: #b91c1c !important;
}

.glosario-admin-btns {
  display: flex;
  gap: 6px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f3f4f6;
}

.btn-glosario-edit {
  flex: 1;
  padding: 4px 8px;
  font-size: 0.75rem;
  border: none;
  border-radius: 6px;
  background: #f0f9ff;
  color: #0369a1;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.btn-glosario-edit:hover { background: #bae6fd; }

.btn-glosario-delete {
  flex: 1;
  padding: 4px 8px;
  font-size: 0.75rem;
  border: none;
  border-radius: 6px;
  background: #fff0f0;
  color: #dc2626;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.btn-glosario-delete:hover { background: #fecaca; }

.glosario-edit-form {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.glosario-edit-form input, .glosario-edit-form textarea {
  font-size: 0.8rem;
  padding: 5px 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  width: 100%;
}
.glosario-edit-form textarea { resize: vertical; min-height: 60px; }
.glosario-edit-actions { display: flex; gap: 6px; }
.btn-glosario-save {
  flex: 1; padding: 4px 8px; font-size: 0.75rem; border: none;
  border-radius: 6px; background: #dcfce7; color: #16a34a;
  cursor: pointer; font-weight: 600; transition: background 0.2s;
}
.btn-glosario-save:hover { background: #bbf7d0; }
.btn-glosario-cancel {
  flex: 1; padding: 4px 8px; font-size: 0.75rem; border: none;
  border-radius: 6px; background: #f3f4f6; color: #6b7280;
  cursor: pointer; font-weight: 600; transition: background 0.2s;
}
.btn-glosario-cancel:hover { background: #e5e7eb; }

@media (max-width: 768px) {
  .glosario-card:hover { transform: none; box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important; }
  #glosario-form-container .row > div { margin-bottom: 8px; }
  .glosario-icon { width: 46px; height: 46px; }
}
</style>

<script>
(function() {
  var terminosTec = [
    { icon:'<i class="bi bi-laptop text-primary"></i>', titulo:'Frontend', cat:'frontend', catLabel:'Frontend', desc:'La <strong>"cara" del sistema</strong>. Todo lo que ves, tocas y donde haces clic: botones, colores, gráficos. Como el tablero y el volante de un carro.' },
    { icon:'<i class="bi bi-lightning-charge text-warning"></i>', titulo:'Vue.js / Svelte', cat:'frontend', catLabel:'Frontend', desc:'Herramientas para construir la cara del sistema. Como tener un <strong>kit de LEGO profesional</strong> en lugar de construir cada pieza desde cero.' },
    { icon:'<i class="bi bi-speedometer2 text-info"></i>', titulo:'Dashboard', cat:'frontend', catLabel:'Frontend', desc:'Un <strong>tablero de control con gráficas</strong> (como el de un avión) para ver de un vistazo cómo van las operaciones en tiempo real.' },
    { icon:'<i class="bi bi-gear-fill text-secondary"></i>', titulo:'Backend', cat:'backend', catLabel:'Backend', desc:'El <strong>"cerebro" y motor</strong> que no ves. Procesa información, valida contraseñas y organiza los datos del sistema.' },
    { icon:'<i class="bi bi-code-slash text-success"></i>', titulo:'Python', cat:'backend', catLabel:'Backend', desc:'Lenguaje de programación popular por ser <strong>fácil de leer y excelente para datos</strong>. Como hablar inglés en el mundo de la programación.' },
    { icon:'<i class="bi bi-rocket-takeoff text-danger"></i>', titulo:'FastAPI / Flask', cat:'backend', catLabel:'Backend', desc:'Herramientas para construir el Backend con Python. <strong>FastAPI:</strong> moderna y rápida. <strong>Flask:</strong> simple y tradicional.' },
    { icon:'<i class="bi bi-circle-fill text-success"></i>', titulo:'Node.js', cat:'backend', catLabel:'Backend', desc:'Permite usar JavaScript para <strong>tareas de servidor o robots</strong>. El mismo código del navegador funciona en el servidor.' },
    { icon:'<i class="bi bi-link-45deg text-primary"></i>', titulo:'API', cat:'backend', catLabel:'Backend', desc:'Es el <strong>mensajero</strong> entre sistemas. Como el mesero que lleva tu pedido a la cocina y te trae la comida.' },
    { icon:'<i class="bi bi-shield-lock text-warning"></i>', titulo:'JWT (JSON Web Token)', cat:'backend', catLabel:'Backend', desc:'Es un <strong>"pase VIP" digital</strong>. Te autentificas una vez y el sistema te da un token para no repetir tu contraseña en cada clic.' },
    { icon:'<i class="bi bi-key-fill text-danger"></i>', titulo:'OTP (One-Time Password)', cat:'backend', catLabel:'Backend', desc:'La <strong>clave de un solo uso</strong> que llega al celular. Expira en minutos y solo sirve una vez.' },
    { icon:'<i class="bi bi-puzzle text-info"></i>', titulo:'Microservicios', cat:'arquitectura', catLabel:'Arquitectura', desc:'El sistema dividido en <strong>"pequeños especialistas"</strong>. Si uno falla, los demás siguen funcionando sin problemas.' },
    { icon:'<i class="bi bi-door-open text-secondary"></i>', titulo:'Nginx / Proxy Reverso', cat:'arquitectura', catLabel:'Arquitectura', desc:'Como el <strong>recepcionista de un edificio</strong>. Recibe a todos y los dirige al departamento correcto.' },
    { icon:'<i class="bi bi-box-seam text-primary"></i>', titulo:'Docker', cat:'arquitectura', catLabel:'Arquitectura', desc:'Un <strong>"contenedor" de carga</strong>. El programa funciona igual en cualquier computadora, sin el típico "en mi casa sí funcionaba".' },
    { icon:'<i class="bi bi-terminal text-dark"></i>', titulo:'SSH (Secure Shell)', cat:'arquitectura', catLabel:'Arquitectura', desc:'El <strong>túnel seguro</strong> por el cual te conectas desde tu computadora al servidor remoto.' },
    { icon:'<i class="bi bi-signpost-split text-warning"></i>', titulo:'Puertos', cat:'arquitectura', catLabel:'Arquitectura', desc:'Las <strong>"puertas" del servidor</strong>. Cada servicio usa un puerto específico. Si está cerrado, nadie puede entrar.' },
    { icon:'<i class="bi bi-shield-fill-check text-danger"></i>', titulo:'Firewall', cat:'arquitectura', catLabel:'Arquitectura', desc:'El <strong>portero de seguridad</strong>. Decide quién entra y quién no según los puertos configurados.' },
    { icon:'<i class="bi bi-globe text-info"></i>', titulo:'IP Estática vs. DNS', cat:'arquitectura', catLabel:'Arquitectura', desc:'<strong>IP Estática:</strong> dirección fija del servidor. <strong>DNS:</strong> la "guía telefónica" que convierte claro.com.co en una IP numérica.' },
    { icon:'<i class="bi bi-server text-secondary"></i>', titulo:'Servidor', cat:'arquitectura', catLabel:'Arquitectura', desc:'Computadora <strong>siempre encendida y conectada</strong> cuya función es atender las peticiones de otras computadoras.' },
    { icon:'<i class="bi bi-database text-primary"></i>', titulo:'MySQL', cat:'basedatos', catLabel:'Base de Datos', desc:'Un <strong>archivador digital gigante</strong>. Organiza datos en tablas como Excel pero mucho más potente y seguro.' },
    { icon:'<i class="bi bi-robot text-success"></i>', titulo:'Bot ETL', cat:'automatizacion', catLabel:'Automatización', desc:'Robot que <strong>Extrae</strong> (lee correos), <strong>Transforma</strong> (organiza datos) y <strong>Carga</strong> (guarda en BD). Lo que tomaba 2 horas, lo hace en 5 minutos.' },
    { icon:'<i class="bi bi-folder2-open text-warning"></i>', titulo:'Repositorio (Repo)', cat:'versiones', catLabel:'Versiones', desc:'La <strong>carpeta en la nube</strong> donde vive el código del proyecto (GitHub/GitLab). Historial completo y respaldo automático.' },
    { icon:'<i class="bi bi-git text-danger"></i>', titulo:'Git', cat:'versiones', catLabel:'Versiones', desc:'Sistema que permite <strong>viajar en el tiempo</strong>. Si alguien borra algo por error, Git permite volver a la versión anterior.' },
    { icon:'<i class="bi bi-diagram-3 text-success"></i>', titulo:'Ramas (Branches)', cat:'versiones', catLabel:'Versiones', desc:'<strong>Copias del proyecto</strong> donde cada desarrollador trabaja sin chocar con los demás. Luego se unen en "main".' },
    { icon:'<i class="bi bi-list-task text-info"></i>', titulo:'Backlog', cat:'gestion', catLabel:'Gestión', desc:'La <strong>lista de tareas pendientes</strong> organizada por prioridad: 🔴 Urgente, 🟡 Importante, 🟢 Cuando se pueda.' },
    { icon:'<i class="bi bi-journal-text text-secondary"></i>', titulo:'Logs', cat:'gestion', catLabel:'Gestión', desc:'El <strong>diario del sistema</strong>. Anota todo lo que pasa: accesos, errores, conexiones. Esencial para encontrar fallas.' },
    { icon:'<i class="bi bi-ubuntu text-warning"></i>', titulo:'Linux', cat:'gestion', catLabel:'Gestión', desc:'El <strong>corazón (Kernel)</strong> del sistema operativo. Gratis, seguro y en todas partes: desde Android hasta servidores de la NASA.' }
  ];

  var isAdmin = false;
  var catActualTec = 'todos';

  function renderTec(terminos, busqueda) {
    var grid  = document.getElementById('grid-tec');
    var empty = document.getElementById('empty-tec');
    if (!grid) return;

    var filtrados = terminos.map(function(t, i) { return { t: t, i: i }; }).filter(function(obj) {
      var t = obj.t;
      var matchCat = catActualTec === 'todos' || t.cat === catActualTec;
      var matchQ   = !busqueda || t.titulo.toLowerCase().includes(busqueda) || t.desc.toLowerCase().includes(busqueda);
      return matchCat && matchQ;
    });

    if (!filtrados.length) {
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    grid.innerHTML = filtrados.map(function(obj) {
      var t = obj.t; var idx = obj.i;
      var titulo = busqueda ? t.titulo.replace(new RegExp('(' + busqueda + ')', 'gi'), '<mark>$1</mark>') : t.titulo;
      var adminBtns = isAdmin ? (
        '<div class="glosario-admin-btns">' +
          '<button class="btn-glosario-edit" onclick="editarTerminoTec(' + idx + ')"><i class="bi bi-pencil"></i> Editar</button>' +
          '<button class="btn-glosario-delete" onclick="eliminarTerminoTec(' + idx + ')"><i class="bi bi-trash"></i> Eliminar</button>' +
        '</div>' +
        '<div class="glosario-edit-form" id="edit-tec-' + idx + '" style="display:none;">' +
          '<input type="text" id="edit-tec-titulo-' + idx + '" value="' + t.titulo.replace(/"/g, '&quot;') + '" placeholder="Término" />' +
          '<textarea id="edit-tec-desc-' + idx + '" placeholder="Descripción">' + t.desc.replace(/<[^>]+>/g, '') + '</textarea>' +
          '<div class="glosario-edit-actions">' +
            '<button class="btn-glosario-save" onclick="guardarEdicionTec(' + idx + ')"><i class="bi bi-check-lg"></i> Guardar</button>' +
            '<button class="btn-glosario-cancel" onclick="cancelarEdicionTec(' + idx + ')">Cancelar</button>' +
          '</div>' +
        '</div>'
      ) : '';
      return '<div class="col-md-6 col-lg-4">' +
        '<div class="card h-100 border-0 shadow-sm glosario-card">' +
          '<div class="card-header border-0 glosario-header">' +
            '<div class="d-flex align-items-center gap-3">' +
              '<div class="glosario-icon"><span class="fs-1">' + t.icon + '</span></div>' +
              '<div class="flex-grow-1">' +
                '<h6 class="mb-1 fw-bold">' + titulo + '</h6>' +
                '<small class="text-danger text-uppercase fw-semibold" style="font-size: 0.7rem; letter-spacing: 0.5px;">' + t.catLabel + '</small>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="card-body">' +
            '<p class="card-text text-muted mb-0" style="font-size: 0.9rem; line-height: 1.6;">' + t.desc + '</p>' +
            adminBtns +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  window.editarTerminoTec = function(idx) {
    var form = document.getElementById('edit-tec-' + idx);
    if (form) form.style.display = form.style.display === 'none' ? 'flex' : 'none';
  };

  window.cancelarEdicionTec = function(idx) {
    var form = document.getElementById('edit-tec-' + idx);
    if (form) form.style.display = 'none';
  };

  window.guardarEdicionTec = function(idx) {
    var nuevoTitulo = document.getElementById('edit-tec-titulo-' + idx).value.trim();
    var nuevaDesc   = document.getElementById('edit-tec-desc-' + idx).value.trim();
    if (!nuevoTitulo || !nuevaDesc) return;
    terminosTec[idx].titulo = nuevoTitulo;
    terminosTec[idx].desc   = nuevaDesc;
    // Sincronizar en localStorage si es un término extra
    var baseCount = terminosTec.length - JSON.parse(localStorage.getItem('glosario_tec_extra') || '[]').length;
    if (idx >= baseCount) {
      var extras = JSON.parse(localStorage.getItem('glosario_tec_extra') || '[]');
      var extraIdx = idx - baseCount;
      if (extras[extraIdx]) { extras[extraIdx].titulo = nuevoTitulo; extras[extraIdx].desc = nuevaDesc; }
      localStorage.setItem('glosario_tec_extra', JSON.stringify(extras));
    }
    var q = document.getElementById('search-tec').value.trim().toLowerCase();
    renderTec(terminosTec, q);
  };

  window.eliminarTerminoTec = function(idx) {
    if (!confirm('¿Eliminar "' + terminosTec[idx].titulo + '"?')) return;
    var baseCount = terminosTec.length - JSON.parse(localStorage.getItem('glosario_tec_extra') || '[]').length;
    if (idx >= baseCount) {
      var extras = JSON.parse(localStorage.getItem('glosario_tec_extra') || '[]');
      extras.splice(idx - baseCount, 1);
      localStorage.setItem('glosario_tec_extra', JSON.stringify(extras));
    }
    terminosTec.splice(idx, 1);
    var q = document.getElementById('search-tec').value.trim().toLowerCase();
    renderTec(terminosTec, q);
  };

  window.filtrarTec = function() {
    var q = document.getElementById('search-tec').value.trim().toLowerCase();
    renderTec(terminosTec, q);
  };

  window.setCatTec = function(cat, btn) {
    catActualTec = cat;
    document.querySelectorAll('#cats-tec .btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var q = document.getElementById('search-tec').value.trim().toLowerCase();
    renderTec(terminosTec, q);
  };

  window.agregarTerminoGlosario = function() {
    var termino = document.getElementById('nuevo-termino').value.trim();
    var definicion = document.getElementById('nueva-definicion').value.trim();
    var categoria = document.getElementById('nueva-categoria').value;
    var msg = document.getElementById('msg-glosario');

    if (!termino || !definicion) {
      if (msg) {
        msg.textContent = 'Completa el término y la definición para enviar la propuesta.';
        msg.style.display = 'inline-block';
        msg.className = 'align-self-center text-danger';
      }
      return;
    }

    if (!window.auth || !window.auth.isAuthenticated()) {
      if (msg) {
        msg.textContent = 'Debes iniciar sesión para enviar una propuesta.';
        msg.style.display = 'inline-block';
        msg.className = 'align-self-center text-danger';
      }
      return;
    }

    if (msg) {
      msg.textContent = 'Enviando propuesta...';
      msg.style.display = 'inline-block';
      msg.className = 'align-self-center text-muted';
    }

    var apiBase = window.auth && window.auth.API_URL ? window.auth.API_URL : '';
    fetch(apiBase + '/api/glosario/propuestas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      },
      body: JSON.stringify({ termino: termino, definicion: definicion, categoria: categoria })
    })
    .then(function(response) {
      var contentType = response.headers.get('content-type') || '';
      return (contentType.includes('application/json')
        ? response.json()
        : response.text().then(function(text) {
            return text ? { raw: text } : {};
          })
      ).then(function(data) {
        if (!response.ok) {
          throw new Error(data.error || data.raw || 'No se pudo guardar la propuesta');
        }
        return data;
      });
    })
    .then(function() {
      var nuevo = {
        icon: '<i class="bi bi-journal-text text-danger"></i>',
        titulo: termino,
        cat: categoria,
        catLabel: categoria === 'frontend' ? 'Frontend' : categoria === 'backend' ? 'Backend' : categoria === 'arquitectura' ? 'Arquitectura' : categoria === 'basedatos' ? 'Base de Datos' : categoria === 'automatizacion' ? 'Automatización' : categoria === 'versiones' ? 'Versiones' : 'Gestión',
        desc: definicion
      };

      // Guardar en localStorage para persistencia
      var guardados = JSON.parse(localStorage.getItem('glosario_tec_extra') || '[]');
      guardados.push(nuevo);
      localStorage.setItem('glosario_tec_extra', JSON.stringify(guardados));

      terminosTec.push(nuevo);
      document.getElementById('nuevo-termino').value = '';
      document.getElementById('nueva-definicion').value = '';
      document.getElementById('nueva-categoria').value = 'frontend';

      if (msg) {
        msg.textContent = '¡Propuesta enviada! Gracias por ayudar a enriquecer el glosario.';
        msg.style.display = 'inline-block';
        msg.className = 'align-self-center text-success';
      }

      var q = document.getElementById('search-tec').value.trim().toLowerCase();
      renderTec(terminosTec, q);
    })
    .catch(function(error) {
      if (msg) {
        msg.textContent = error.message;
        msg.style.display = 'inline-block';
        msg.className = 'align-self-center text-danger';
      }
    });
  };

  function init() {
    var grid = document.getElementById('grid-tec');
    var formContainer = document.getElementById('glosario-form-container');
    if (!grid) { setTimeout(init, 200); return; }

    // Cargar términos extra guardados en localStorage
    var extra = JSON.parse(localStorage.getItem('glosario_tec_extra') || '[]');
    extra.forEach(function(t) { terminosTec.push(t); });
    renderTec(terminosTec, '');

    // Esperar a que auth.js esté listo para mostrar/ocultar el form
    function checkAuth() {
      if (window.auth) {
        var autenticado = window.auth.isAuthenticated();
        isAdmin = autenticado && window.auth.getUserRole() === 'admin';
        if (formContainer) formContainer.style.display = autenticado ? 'block' : 'none';
        if (isAdmin) renderTec(terminosTec, '');
      } else {
        setTimeout(checkAuth, 150);
      }
    }
    checkAuth();
  }
  init();
})();
</script>