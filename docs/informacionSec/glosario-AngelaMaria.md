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

mark {
  background-color: #fef08a;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 600;
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

  var catActualTec = 'todos';

  function renderTec(terminos, busqueda) {
    var grid  = document.getElementById('grid-tec');
    var empty = document.getElementById('empty-tec');
    if (!grid) return;

    var filtrados = terminos.filter(function(t) {
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

    grid.innerHTML = filtrados.map(function(t) {
      var titulo = busqueda ? t.titulo.replace(new RegExp('(' + busqueda + ')', 'gi'), '<mark>$1</mark>') : t.titulo;
      return '<div class="col-md-6 col-lg-4">' +
        '<div class="card h-100 border-0 shadow-sm glosario-card">' +
          '<div class="card-header border-0 glosario-header">' +
            '<div class="d-flex align-items-center gap-3">' +
              '<div class="glosario-icon">' +
                '<span class="fs-1">' + t.icon + '</span>' +
              '</div>' +
              '<div class="flex-grow-1">' +
                '<h6 class="mb-1 fw-bold">' + titulo + '</h6>' +
                '<small class="text-danger text-uppercase fw-semibold" style="font-size: 0.7rem; letter-spacing: 0.5px;">' + t.catLabel + '</small>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="card-body">' +
            '<p class="card-text text-muted mb-0" style="font-size: 0.9rem; line-height: 1.6;">' + t.desc + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

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

  function init() {
    var grid = document.getElementById('grid-tec');
    if (grid) { renderTec(terminosTec, ''); }
    else { setTimeout(init, 200); }
  }
  init();
})();
</script>
