# 🔗 Enlaces Empresariales

> Acceso rápido a recursos y sistemas principales de la empresa

<div class="container-fluid px-0">

  <!-- Barra de búsqueda -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="input-group">
        <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
        <input type="text" id="search-enlaces" class="form-control" placeholder="Buscar enlace..." oninput="filtrarEnlaces()" />
      </div>
    </div>
  </div>

  <!-- Formulario agregar (solo autenticados) -->
  <div id="form-agregar-enlace" class="card border-0 shadow-sm mb-4" style="display:none;">
    <div class="card-body">
      <div class="d-flex align-items-center gap-2 mb-3">
        <i class="bi bi-plus-circle-fill text-danger fs-4"></i>
        <h5 class="mb-0">Agregar nuevo enlace</h5>
      </div>
      <div class="row g-3">
        <div class="col-md-3"><input type="text" id="enlace-nombre" class="form-control" placeholder="Nombre (ej. SharePoint)" /></div>
        <div class="col-md-3"><input type="text" id="enlace-desc" class="form-control" placeholder="Descripción breve" /></div>
        <div class="col-md-3"><input type="url" id="enlace-url" class="form-control" placeholder="https://..." /></div>
        <div class="col-md-3">
          <select id="enlace-categoria" class="form-select">
            <option value="Operaciones">Operaciones</option>
            <option value="Infraestructura">Infraestructura</option>
            <option value="Desarrollo">Desarrollo</option>
            <option value="Seguridad">Seguridad</option>
            <option value="Analitica">Analítica</option>
            <option value="Redes">Redes</option>
            <option value="Despacho">Despacho</option>
            <option value="Innovación">Innovación</option>
            <option value="Bots Telegram">Bots Telegram</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>
      <div class="mt-3 d-flex gap-2 align-items-center">
        <button class="btn btn-danger" onclick="agregarEnlace()"><i class="bi bi-plus-lg"></i> Agregar</button>
        <span id="msg-enlace" style="display:none; font-size:0.9rem;"></span>
      </div>
    </div>
  </div>

  <!-- Filtros por categoría -->
  <div class="mb-4">
    <div class="d-flex flex-wrap gap-2" id="cats-enlaces">
      <button class="btn btn-sm btn-outline-danger active" onclick="setCatEnlaces('todos', this)">Todos</button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatEnlaces('Operaciones', this)"><i class="bi bi-calendar-check"></i> Operaciones</button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatEnlaces('Infraestructura', this)"><i class="bi bi-cpu"></i> Infraestructura</button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatEnlaces('Desarrollo', this)"><i class="bi bi-diagram-3"></i> Desarrollo</button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatEnlaces('Seguridad', this)"><i class="bi bi-shield-check"></i> Seguridad</button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatEnlaces('Innovación', this)"><i class="bi bi-trophy-fill"></i> Innovación</button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatEnlaces('Analitica', this)"><i class="bi bi-bar-chart-fill"></i> Analítica</button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatEnlaces('Redes', this)"><i class="bi bi-people-fill"></i> Redes</button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatEnlaces('Despacho', this)"><i class="bi bi-compass"></i> Despacho</button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatEnlaces('Bots Telegram', this)"><i class="bi bi-telegram"></i> Bots Telegram</button>
    </div>
  </div>

  <!-- Grid de tarjetas -->
  <div id="grid-enlaces" class="row g-3"></div>

  <!-- Mensaje vacío -->
  <div id="empty-enlaces" class="alert alert-info" style="display:none;">
    <i class="bi bi-inbox"></i> No se encontraron enlaces con ese criterio
  </div>

</div>

<style>
.enlace-card {
  transition: all 0.3s ease;
  border: 2px solid transparent !important;
}
.enlace-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.15) !important;
  border-color: #b91c1c !important;
}
.enlace-header {
  background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%) !important;
  padding: 1.25rem !important;
}
.enlace-icon {
  width: 60px; height: 60px;
  background: white;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(185,28,28,0.3);
  flex-shrink: 0;
}
.enlace-badge {
  background: #fee2e2;
  color: #b91c1c;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
.btn-ir {
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: center;
  transition: background 0.2s;
  letter-spacing: 0.3px;
}
.btn-ir:hover { background: #dc2626; color: white; text-decoration: none; }
.enlace-admin-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f3f4f6;
}
.btn-enlace-edit {
  padding: 8px 6px;
  font-size: 0.8rem;
  border: 2px solid #bae6fd;
  border-radius: 8px;
  background: #f0f9ff;
  color: #0369a1;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s;
}
.btn-enlace-edit:hover { background: #bae6fd; border-color: #0369a1; }
.btn-enlace-del {
  padding: 8px 6px;
  font-size: 0.8rem;
  border: 2px solid #fecaca;
  border-radius: 8px;
  background: #fff0f0;
  color: #dc2626;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s;
}
.btn-enlace-del:hover { background: #fecaca; border-color: #dc2626; }
mark { background-color:#fef08a; padding:2px 4px; border-radius:3px; font-weight:600; }
.enlace-edit-form {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
}
.enlace-confirm-del {
  margin-top: 12px;
  padding: 12px;
  padding-top: 12px;
  border-top: 1px solid #fecaca;
  background: #fff5f5;
  border-radius: 8px;
}
@media (max-width: 768px) {
  .enlace-card:hover { transform: none; }
}
</style>

<script>
(function() {
  var BASE_LINKS = [
    { icon:'bi-calendar-check', nombre:'Agendamiento',         cat:'Operaciones',     desc:'Sistema para agendar OT, llamadas y citas técnicas.',          url:'https://moduloagenda.cable.net.co/index.php' },
    { icon:'bi-compass',        nombre:'Consola de Despacho',  cat:'Despacho',        desc:'Gestión de workforce, técnicos y aliados.',                    url:'https://amx-res-co.fs.ocs.oraclecloud.com/' },
    { icon:'bi-diagram-3',      nombre:'Proyecto OTC',         cat:'Desarrollo',      desc:'Unificación central de backends empresariales.',               url:'https://moduloccot.ngrok.app/login' },
    { icon:'bi-activity',       nombre:'Estado de Nodos',      cat:'Infraestructura', desc:'Monitoreo de infraestructura y sistemas.',                     url:'https://imservice.sytes.net/nodos/' },
    { icon:'bi-lightning-fill', nombre:'AVANZA',               cat:'Operaciones',     desc:'Portal de gestión y consultas corporativas.',                  url:'https://avanza.claro.com.co/#/site/AVANZA/views' },
    { icon:'bi-map',            nombre:'MER MER',              cat:'Operaciones',     desc:'Catastro y gestión territorial.',                              url:'https://merapp.claro.com.co:8002/catastro-warIns/view/MGL/template/login.xhtml' },
    { icon:'bi-shield-check',   nombre:'UMBRELLA',             cat:'Seguridad',       desc:'Plataforma de seguridad corporativa.',                         url:'https://claro.lavenirapps.co/es/login' },
    { icon:'bi-cpu',            nombre:'MYIT',                 cat:'Infraestructura', desc:'Gestión de infraestructura IT y servicios.',                   url:'https://myit.claro.com.co:8443/myit/#/' },
    { icon:'bi-people-fill',    nombre:'Conectados',           cat:'Redes',           desc:'Red de conexión y colaboración empresarial.',                  url:'https://conectados.com.co/inicio' },
    { icon:'bi-bug',            nombre:'Diagnosticador',       cat:'Infraestructura', desc:'Herramienta de diagnóstico técnico residencial.',              url:'http://100.123.246.38/diagnosticador/residencial/' },
    { icon:'bi-telephone-fill', nombre:'ASC',                  cat:'Operaciones',     desc:'Atención y servicio al cliente.',                             url:'https://acstr069.claro.net.co/CSR/Login.aspx' },
    { icon:'bi-bar-chart-fill', nombre:'REPORTING',            cat:'Analitica',       desc:'Reportes y análisis de datos GIR.',                           url:'https://reportinggir.claro.com.co/ReportingGIR/' },
    { icon:'bi-trophy-fill',    nombre:'Excelencia Operativa', cat:'Innovación',      desc:'Optimización y mejora de procesos.',                          url:'https://excelenciaotc.ngrok.app/web/login' },
    { icon:'bi-grid-1x2-fill',  nombre:'SIXTRA',               cat:'Operaciones',     desc:'Portal de extras y gestión complementaria.',                  url:'https://sixtra.claro.net.co/loginExtras' },
    { icon:'bi-telegram',       nombre:'Bot Niveles Claro',    cat:'Bots Telegram',   desc:'Bot de Telegram para consulta de niveles Claro.',             url:'https://t.me/Niveles_claro_bot' }
  ];

  var enlacesExtra = [];
  var isAdmin = false;
  var catActual = 'todos';

  function allLinks() { return BASE_LINKS.concat(enlacesExtra); }

  function saveExtra() {
    try { localStorage.setItem('enlaces_extra', JSON.stringify(enlacesExtra)); } catch(e) {}
  }

  function renderEnlaces(busqueda) {
    var grid  = document.getElementById('grid-enlaces');
    var empty = document.getElementById('empty-enlaces');
    if (!grid) return;
    var q = (busqueda || '').toLowerCase();
    var links = allLinks();

    var filtrados = links.map(function(e, i) { return { e:e, i:i }; }).filter(function(obj) {
      var e = obj.e;
      var matchCat = catActual === 'todos' || e.cat === catActual;
      var matchQ   = !q || e.nombre.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q) || e.cat.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    if (!filtrados.length) {
      grid.innerHTML = ''; empty.style.display = 'block'; return;
    }
    empty.style.display = 'none';

    grid.innerHTML = filtrados.map(function(obj) {
      var e = obj.e; var idx = obj.i;
      var esExtra = idx >= BASE_LINKS.length;
      var extraIdx = idx - BASE_LINKS.length;
      var nombre = q ? e.nombre.replace(new RegExp('('+q+')', 'gi'), '<mark>$1</mark>') : e.nombre;
      var adminBtns = isAdmin ? (
        '<div class="enlace-admin-btns">' +
          '<button class="btn-enlace-edit" onclick="editarEnlaceItem('+(esExtra ? extraIdx : idx)+','+(esExtra?'true':'false')+')"><i class="bi bi-pencil"></i> Editar</button>' +
          '<button class="btn-enlace-del" onclick="'+(esExtra ? 'eliminarEnlace('+extraIdx+')' : 'eliminarEnlaceBase('+idx+')')+';"><i class="bi bi-trash"></i> Eliminar</button>' +
        '</div>'
      ) : '';
      return '<div class="col-md-6 col-lg-4" data-link-idx="'+idx+'">' +
        '<div class="card h-100 border-0 shadow-sm enlace-card">' +
          '<div class="card-header border-0 enlace-header">' +
            '<div class="d-flex align-items-center gap-3">' +
              '<div class="enlace-icon"><span class="fs-2"><i class="bi '+e.icon+' text-danger"></i></span></div>' +
              '<div class="flex-grow-1">' +
                '<h6 class="mb-1 fw-bold">'+nombre+'</h6>' +
                '<span class="enlace-badge">'+e.cat+'</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="card-body d-flex flex-column">' +
            '<p class="card-text text-muted mb-3" style="font-size:0.9rem;line-height:1.6;">'+e.desc+'</p>' +
            '<a href="'+e.url+'" target="_blank" class="btn-ir mt-auto"><i class="bi bi-box-arrow-up-right"></i> Abrir</a>' +
            adminBtns +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  window.filtrarEnlaces = function() {
    var q = document.getElementById('search-enlaces').value.trim().toLowerCase();
    renderEnlaces(q);
  };

  window.setCatEnlaces = function(cat, btn) {
    catActual = cat;
    document.querySelectorAll('#cats-enlaces .btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    var q = document.getElementById('search-enlaces').value.trim().toLowerCase();
    renderEnlaces(q);
  };

  window.agregarEnlace = function() {
    var nombre = document.getElementById('enlace-nombre').value.trim();
    var desc   = document.getElementById('enlace-desc').value.trim();
    var url    = document.getElementById('enlace-url').value.trim();
    var cat    = document.getElementById('enlace-categoria').value;
    var msg    = document.getElementById('msg-enlace');
    if (!nombre || !url) { msg.textContent='El nombre y la URL son obligatorios.'; msg.style.display='inline'; msg.className='text-danger'; return; }
    if (!url.startsWith('http')) { msg.textContent='La URL debe comenzar con http://'; msg.style.display='inline'; msg.className='text-danger'; return; }
    var iconMap = { Operaciones:'bi-calendar-check', Infraestructura:'bi-cpu', Desarrollo:'bi-diagram-3', Seguridad:'bi-shield-check', Analitica:'bi-bar-chart-fill', Redes:'bi-people-fill', Despacho:'bi-compass', 'Innovación':'bi-trophy-fill', 'Bots Telegram':'bi-telegram', Otro:'bi-link-45deg' };
    enlacesExtra.push({ icon: iconMap[cat]||'bi-link-45deg', nombre:nombre, desc:desc||'Sin descripcion', url:url, cat:cat });
    saveExtra();
    document.getElementById('enlace-nombre').value='';
    document.getElementById('enlace-desc').value='';
    document.getElementById('enlace-url').value='';
    msg.textContent='Enlace agregado!'; msg.style.display='inline'; msg.className='text-success';
    setTimeout(function(){ msg.style.display='none'; }, 2500);
    renderEnlaces(document.getElementById('search-enlaces').value.trim().toLowerCase());
  };

  window.eliminarEnlace = function(idx) {
    mostrarConfirmEliminar(BASE_LINKS.length + idx, true, idx);
  };

  window.eliminarEnlaceBase = function(idx) {
    mostrarConfirmEliminar(idx, false, idx);
  };

  function mostrarConfirmEliminar(realIdx, esExtra, idx) {
    // Cerrar confirmaciones previas
    document.querySelectorAll('.enlace-confirm-del').forEach(function(f){ f.remove(); });
    var cards = document.querySelectorAll('#grid-enlaces .col-md-6');
    var card = null;
    cards.forEach(function(c) {
      if (c.getAttribute('data-link-idx') == realIdx) card = c;
    });
    if (!card) return;
    var nombre = esExtra ? enlacesExtra[idx].nombre : BASE_LINKS[idx].nombre;
    var box = document.createElement('div');
    box.className = 'enlace-confirm-del';
    box.innerHTML =
      '<p class="mb-2" style="font-size:0.85rem;color:#1f2937;">¿Eliminar <strong>' + nombre + '</strong>?</p>' +
      '<div class="d-flex gap-2">' +
        '<button class="btn btn-sm btn-danger flex-fill" onclick="confirmarEliminar('+idx+','+esExtra+')"><i class="bi bi-trash"></i> Sí, eliminar</button>' +
        '<button class="btn btn-sm btn-secondary flex-fill" onclick="this.closest(\'.enlace-confirm-del\').remove()">Cancelar</button>' +
      '</div>';
    card.querySelector('.card-body').appendChild(box);
  }

  window.confirmarEliminar = function(idx, esExtra) {
    if (esExtra) {
      enlacesExtra.splice(idx, 1); saveExtra();
    } else {
      BASE_LINKS.splice(idx, 1);
    }
    renderEnlaces(document.getElementById('search-enlaces').value.trim().toLowerCase());
  };

  window.editarEnlaceItem = function(idx, esExtra) {
    // Cerrar cualquier form de edición abierto
    document.querySelectorAll('.enlace-edit-form').forEach(function(f){ f.remove(); });
    var e = esExtra ? enlacesExtra[idx] : BASE_LINKS[idx];
    // Buscar la tarjeta por data-idx
    var realIdx = esExtra ? BASE_LINKS.length + idx : idx;
    var cards = document.querySelectorAll('#grid-enlaces .col-md-6');
    var card = null;
    cards.forEach(function(c) {
      if (c.getAttribute('data-link-idx') == realIdx) card = c;
    });
    if (!card) return;
    var form = document.createElement('div');
    form.className = 'enlace-edit-form';
    form.innerHTML =
      '<input type="text" id="ef-nombre" class="form-control form-control-sm mb-2" value="'+e.nombre.replace(/"/g,'&quot;')+'" placeholder="Nombre"/>' +
      '<input type="text" id="ef-desc" class="form-control form-control-sm mb-2" value="'+e.desc.replace(/"/g,'&quot;')+'" placeholder="Descripcion"/>' +
      '<input type="url" id="ef-url" class="form-control form-control-sm mb-2" value="'+e.url+'" placeholder="URL"/>' +
      '<div class="d-flex gap-2">' +
        '<button class="btn btn-sm btn-success flex-fill" onclick="guardarEdicionEnlace('+idx+','+esExtra+')"><i class="bi bi-check-lg"></i> Guardar</button>' +
        '<button class="btn btn-sm btn-secondary flex-fill" onclick="this.closest(\'.enlace-edit-form\').remove()">Cancelar</button>' +
      '</div>';
    card.querySelector('.card-body').appendChild(form);
  };

  window.guardarEdicionEnlace = function(idx, esExtra) {
    var nombre = document.getElementById('ef-nombre').value.trim();
    var desc   = document.getElementById('ef-desc').value.trim();
    var url    = document.getElementById('ef-url').value.trim();
    var e = esExtra ? enlacesExtra[idx] : BASE_LINKS[idx];
    if (nombre) e.nombre = nombre;
    if (desc)   e.desc   = desc;
    if (url)    e.url    = url;
    if (esExtra) saveExtra();
    renderEnlaces(document.getElementById('search-enlaces').value.trim().toLowerCase());
  };

  function init() {
    var root = document.getElementById('grid-enlaces');
    if (!root) { setTimeout(init, 200); return; }
    try { enlacesExtra = JSON.parse(localStorage.getItem('enlaces_extra') || '[]'); } catch(e) { enlacesExtra = []; }

    function checkAuth() {
      if (window.auth) {
        var autenticado = window.auth.isAuthenticated();
        isAdmin = autenticado && window.auth.getUserRole() === 'admin';
        var form = document.getElementById('form-agregar-enlace');
        if (form) form.style.display = autenticado ? 'block' : 'none';
        renderEnlaces('');
      } else {
        setTimeout(checkAuth, 150);
      }
    }
    checkAuth();
  }
  init();
})();
</script>
