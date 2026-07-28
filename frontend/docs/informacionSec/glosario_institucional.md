# 🏢 Glosario Institucional

> Términos y conceptos del día a día en Claro

<div class="container-fluid px-0">
  <!-- Barra de búsqueda -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="input-group">
        <span class="input-group-text bg-white">
          <i class="bi bi-search"></i>
        </span>
        <input type="text" id="search-inst" class="form-control" placeholder="Buscar término institucional..." oninput="filtrarInst()" />
      </div>
    </div>
  </div>

  <!-- Categorías -->
  <div class="mb-4">
    <div class="d-flex flex-wrap gap-2" id="cats-inst">
      <button class="btn btn-sm btn-outline-danger active" onclick="setCatInst('todos', this)">Todos</button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatInst('comunicacion', this)">
        <i class="bi bi-megaphone"></i> Comunicación
      </button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatInst('operativa', this)">
        <i class="bi bi-tools"></i> Operativa
      </button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatInst('kpis', this)">
        <i class="bi bi-graph-up"></i> KPIs
      </button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatInst('tecnologias', this)">
        <i class="bi bi-cpu"></i> Tecnologías
      </button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatInst('campo', this)">
        <i class="bi bi-person-workspace"></i> Campo
      </button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatInst('sistemas', this)">
        <i class="bi bi-hdd-stack"></i> Sistemas
      </button>
      <button class="btn btn-sm btn-outline-danger" onclick="setCatInst('geografico', this)">
        <i class="bi bi-geo-alt"></i> Geográfico
      </button>
    </div>
  </div>

  <!-- Proponer nuevo término -->
  <div id="inst-form-container" class="card border-0 shadow-sm mb-4" style="display:none;">
    <div class="card-body">
      <div class="d-flex align-items-center gap-2 mb-3">
        <i class="bi bi-plus-circle-fill text-danger fs-4"></i>
        <h5 class="mb-0">Agregar una palabra nueva al glosario</h5>
      </div>
      <p class="text-muted mb-3">Si conoces un término institucional que falta, puedes proponerlo aquí.</p>
      <div class="row g-3">
        <div class="col-md-4">
          <input type="text" id="inst-nuevo-termino" class="form-control" placeholder="Ej. NPS" />
        </div>
        <div class="col-md-4">
          <input type="text" id="inst-nueva-definicion" class="form-control" placeholder="Definición breve" />
        </div>
        <div class="col-md-4">
          <select id="inst-nueva-categoria" class="form-select">
            <option value="comunicacion">Comunicación</option>
            <option value="operativa">Operativa</option>
            <option value="kpis">KPIs</option>
            <option value="tecnologias">Tecnologías</option>
            <option value="campo">Campo</option>
            <option value="sistemas">Sistemas</option>
            <option value="geografico">Geográfico</option>
          </select>
        </div>
      </div>
      <div class="mt-3 d-flex gap-2">
        <button class="btn btn-danger" onclick="agregarTerminoInst()">Enviar propuesta</button>
        <span id="msg-inst" class="align-self-center text-success" style="display:none"></span>
      </div>
    </div>
  </div>

  <!-- Grid de términos -->
  <div id="grid-inst" class="row g-3"></div>
  
  <!-- Mensaje vacío -->
  <div id="empty-inst" class="alert alert-info" style="display:none">
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

.glosario-admin-btns {
  display: flex;
  gap: 6px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f3f4f6;
}

.btn-glosario-edit {
  flex: 1; padding: 4px 8px; font-size: 0.75rem; border: none;
  border-radius: 6px; background: #f0f9ff; color: #0369a1;
  cursor: pointer; font-weight: 600; transition: background 0.2s;
}
.btn-glosario-edit:hover { background: #bae6fd; }

.btn-glosario-delete {
  flex: 1; padding: 4px 8px; font-size: 0.75rem; border: none;
  border-radius: 6px; background: #fff0f0; color: #dc2626;
  cursor: pointer; font-weight: 600; transition: background 0.2s;
}
.btn-glosario-delete:hover { background: #fecaca; }

.glosario-edit-form {
  margin-top: 10px; padding-top: 10px; border-top: 1px solid #f3f4f6;
  display: flex; flex-direction: column; gap: 6px;
}
.glosario-edit-form input, .glosario-edit-form textarea {
  font-size: 0.8rem; padding: 5px 8px; border: 1px solid #d1d5db;
  border-radius: 6px; width: 100%;
}
.glosario-edit-form textarea { resize: vertical; min-height: 60px; }
.glosario-edit-actions { display: flex; gap: 6px; }
.btn-glosario-save {
  flex: 1; padding: 4px 8px; font-size: 0.75rem; border: none;
  border-radius: 6px; background: #dcfce7; color: #16a34a;
  cursor: pointer; font-weight: 600;
}
.btn-glosario-save:hover { background: #bbf7d0; }
.btn-glosario-cancel {
  flex: 1; padding: 4px 8px; font-size: 0.75rem; border: none;
  border-radius: 6px; background: #f3f4f6; color: #6b7280;
  cursor: pointer; font-weight: 600;
}
.btn-glosario-cancel:hover { background: #e5e7eb; }

@media (max-width: 768px) {
  .glosario-card:hover { transform: none; box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important; }
  #inst-form-container .row > div { margin-bottom: 8px; }
  .glosario-icon { width: 46px; height: 46px; }
}
</style>

<script>
(function() {
  var terminosInst = [
    { icon:'<i class="bi bi-people text-primary"></i>', titulo:'CONECTATEC', cat:'comunicacion', catLabel:'Comunicación', desc:'Reunión <strong>trimestral de ingeniería</strong> para presentar estados del área y reconocimientos al equipo.' },
    { icon:'<i class="bi bi-newspaper text-info"></i>', titulo:'OTC NEWS', cat:'comunicacion', catLabel:'Comunicación', desc:'Encuentro <strong>mensual</strong> para compartir indicadores y avances de mejora continua.' },
    { icon:'<i class="bi bi-graph-up-arrow text-success"></i>', titulo:'MAGAZÍN ESTRATÉGICO', cat:'comunicacion', catLabel:'Comunicación', desc:'Revisión <strong>mensual</strong> de logros y proyecciones regionales.' },
    { icon:'<i class="bi bi-mic text-warning"></i>', titulo:'HABLEMOS LO NUESTRO', cat:'comunicacion', catLabel:'Comunicación', desc:'Espacio de Presidencia para cifras clave del negocio como <strong>NPS y ventas</strong>.' },
    { icon:'<i class="bi bi-lightning-charge text-danger"></i>', titulo:'SHOT DE AGILISMO', cat:'comunicacion', catLabel:'Comunicación', desc:'Ceremonia para fomentar la <strong>cultura ágil</strong> en COT Claro R3.' },
    { icon:'<i class="bi bi-hand-thumbs-up text-primary"></i>', titulo:'Los 4 Acuerdos de Confianza', cat:'comunicacion', catLabel:'Comunicación', desc:'<strong>Dar contexto · Generar acuerdos · Enseñar el camino · Asegurar resultados.</strong>' },
    { icon:'<i class="bi bi-rocket-takeoff text-success"></i>', titulo:'Mentalidad Proactiva', cat:'comunicacion', catLabel:'Comunicación', desc:'<strong>Ownership</strong> (dueño) + <strong>Accountability</strong> (responsabilidad) + <strong>Autodesarrollo</strong>.' },
    { icon:'<i class="bi bi-person-check text-info"></i>', titulo:'SER, SABER y HACER', cat:'operativa', catLabel:'Operativa', desc:'Los tres ejes: <strong>SER</strong> (capacidad emocional), <strong>SABER</strong> (conocimiento técnico) y <strong>HACER</strong> (aplicación práctica).' },
    { icon:'<i class="bi bi-trophy text-warning"></i>', titulo:'Los 4 Pilares Estratégicos', cat:'operativa', catLabel:'Operativa', desc:'<strong>Red</strong> (mejor red) · <strong>Experiencia</strong> (mejor servicio) · <strong>Automatización</strong> (digitalización) · <strong>Personas</strong> (mejor talento).' },
    { icon:'<i class="bi bi-heart-fill text-danger"></i>', titulo:'NPS (Net Promoter Score)', cat:'kpis', catLabel:'KPIs', desc:'Mide la <strong>lealtad del cliente</strong>: Promotores (9-10), Pasivos (7-8) y Detractores (0-6).' },
    { icon:'<i class="bi bi-stopwatch text-primary"></i>', titulo:'KPI / SLA', cat:'kpis', catLabel:'KPIs', desc:'<strong>KPI:</strong> Indicadores clave de desempeño. <strong>SLA:</strong> Acuerdos de nivel de servicio y tiempos comprometidos.' },
    { icon:'<i class="bi bi-bar-chart text-success"></i>', titulo:'ICR / ICRM / ICRF', cat:'kpis', catLabel:'KPIs', desc:'Índices de calidad de red: <strong>ICR</strong> general, <strong>ICRM</strong> móvil y <strong>ICRF</strong> fijo.' },
    { icon:'<i class="bi bi-hourglass-split text-warning"></i>', titulo:'TRF', cat:'kpis', catLabel:'KPIs', desc:'<strong>Tiempo de Respuesta a Fallos.</strong> Mide qué tan rápido se atiende y resuelve una falla.' },
    { icon:'<i class="bi bi-tv text-info"></i>', titulo:'HFC', cat:'tecnologias', catLabel:'Tecnologías', desc:'<strong>Hybrid Fiber-Coaxial.</strong> Tecnología que combina fibra óptica y cable coaxial para internet de alta velocidad.' },
    { icon:'<i class="bi bi-house-door text-primary"></i>', titulo:'FTTH / FTTX', cat:'tecnologias', catLabel:'Tecnologías', desc:'<strong>FTTH:</strong> Fibra óptica al hogar. <strong>FTTX:</strong> Fibra a Pymes u otras ubicaciones.' },
    { icon:'<i class="bi bi-bezier2 text-success"></i>', titulo:'GPON', cat:'tecnologias', catLabel:'Tecnologías', desc:'Tecnología dentro de las redes de fibra óptica. Distribuye la señal a múltiples usuarios desde un solo punto.' },
    { icon:'<i class="bi bi-broadcast text-danger"></i>', titulo:'DTH', cat:'tecnologias', catLabel:'Tecnologías', desc:'<strong>Direct To Home.</strong> Distribución de televisión vía satélite directamente al hogar.' },
    { icon:'<i class="bi bi-phone text-warning"></i>', titulo:'Red Móvil vs. Fijo', cat:'tecnologias', catLabel:'Tecnologías', desc:'<strong>Móvil:</strong> Servicios de telefonía e internet móvil. <strong>Fijo:</strong> Servicios residenciales y corporativos.' },
    { icon:'<i class="bi bi-clipboard-check text-primary"></i>', titulo:'OT / LLS', cat:'campo', catLabel:'Campo', desc:'<strong>OT:</strong> Orden de Trabajo asignada a una cuadrilla. <strong>LLS:</strong> Llamadas de servicio por mantenimiento.' },
    { icon:'<i class="bi bi-tools text-secondary"></i>', titulo:'Tipos de Mantenimiento', cat:'campo', catLabel:'Campo', desc:'<strong>Preventivo</strong> (mitigar fallas) · <strong>Correctivo</strong> (recuperar servicio) · <strong>Predictivo</strong> (monitoreo programado).' },
    { icon:'<i class="bi bi-truck text-info"></i>', titulo:'Cuadrilla', cat:'campo', catLabel:'Campo', desc:'Grupo técnico con vehículo y herramientas que <strong>ejecuta las labores en campo</strong>.' },
    { icon:'<i class="bi bi-headset text-success"></i>', titulo:'Backoffice', cat:'campo', catLabel:'Campo', desc:'Personal de soporte interno que <strong>asigna recursos y cierra las OT</strong> sin ir a campo.' },
    { icon:'<i class="bi bi-building text-warning"></i>', titulo:'Aliado', cat:'campo', catLabel:'Campo', desc:'Empresa <strong>contratista</strong> que opera los servicios de mantenimiento bajo lineamientos de Claro.' },
    { icon:'<i class="bi bi-robot text-primary"></i>', titulo:'WFM / OFSC', cat:'sistemas', catLabel:'Sistemas', desc:'Plataforma con <strong>inteligencia artificial</strong> para programar y ejecutar el trabajo de campo.' },
    { icon:'<i class="bi bi-person-lines-fill text-info"></i>', titulo:'CRM', cat:'sistemas', catLabel:'Sistemas', desc:'<strong>Customer Relationship Management.</strong> Sistema para gestionar interacciones con el cliente.' },
    { icon:'<i class="bi bi-map text-success"></i>', titulo:'GIS / Smallworld', cat:'sistemas', catLabel:'Sistemas', desc:'Sistemas de <strong>información geográfica</strong> para gestionar el inventario físico de la red en el mapa.' },
    { icon:'<i class="bi bi-hdd-rack text-secondary"></i>', titulo:'RR (AS400)', cat:'sistemas', catLabel:'Sistemas', desc:'Base de datos <strong>principal</strong> donde están registrados todos los clientes de Claro.' },
    { icon:'<i class="bi bi-folder2 text-warning"></i>', titulo:'Remedy / Maximo', cat:'sistemas', catLabel:'Sistemas', desc:'Herramientas para la <strong>administración de incidentes</strong> de la red móvil.' },
    { icon:'<i class="bi bi-geo-alt text-primary"></i>', titulo:'VACANA', cat:'geografico', catLabel:'Geográfico', desc:'Región que comprende: <strong>Valle, Cauca y Nariño.</strong>' },
    { icon:'<i class="bi bi-geo text-danger"></i>', titulo:'TOLHUCA', cat:'geografico', catLabel:'Geográfico', desc:'Región que comprende: <strong>Tolima, Huila y Caquetá.</strong>' },
    { icon:'<i class="bi bi-buildings text-info"></i>', titulo:'UMM / UMC', cat:'geografico', catLabel:'Geográfico', desc:'<strong>UMM:</strong> Unidad de Mercado Masivo (residencial). <strong>UMC:</strong> Unidad de Mercado Corporativo.' },
    { icon:'<i class="bi bi-shop text-success"></i>', titulo:'Pymes / Soho', cat:'geografico', catLabel:'Geográfico', desc:'<strong>Pymes:</strong> Pequeñas y medianas empresas. <strong>Soho:</strong> Small Office/Home Office, negocios de barrio.' }
  ];

  var isAdminInst = false;
  var catActualInst = 'todos';

  function renderInst(terminos, busqueda) {
    var grid  = document.getElementById('grid-inst');
    var empty = document.getElementById('empty-inst');
    if (!grid) return;

    var filtrados = terminos.map(function(t, i) { return { t: t, i: i }; }).filter(function(obj) {
      var t = obj.t;
      var matchCat = catActualInst === 'todos' || t.cat === catActualInst;
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
      var adminBtns = isAdminInst ? (
        '<div class="glosario-admin-btns">' +
          '<button class="btn-glosario-edit" onclick="editarTerminoInst(' + idx + ')"><i class="bi bi-pencil"></i> Editar</button>' +
          '<button class="btn-glosario-delete" onclick="eliminarTerminoInst(' + idx + ')"><i class="bi bi-trash"></i> Eliminar</button>' +
        '</div>' +
        '<div class="glosario-edit-form" id="edit-inst-' + idx + '" style="display:none;">' +
          '<input type="text" id="edit-inst-titulo-' + idx + '" value="' + t.titulo.replace(/"/g, '&quot;') + '" placeholder="Término" />' +
          '<textarea id="edit-inst-desc-' + idx + '" placeholder="Descripción">' + t.desc.replace(/<[^>]+>/g, '') + '</textarea>' +
          '<div class="glosario-edit-actions">' +
            '<button class="btn-glosario-save" onclick="guardarEdicionInst(' + idx + ')"><i class="bi bi-check-lg"></i> Guardar</button>' +
            '<button class="btn-glosario-cancel" onclick="cancelarEdicionInst(' + idx + ')">Cancelar</button>' +
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

  window.editarTerminoInst = function(idx) {
    var form = document.getElementById('edit-inst-' + idx);
    if (form) form.style.display = form.style.display === 'none' ? 'flex' : 'none';
  };

  window.cancelarEdicionInst = function(idx) {
    var form = document.getElementById('edit-inst-' + idx);
    if (form) form.style.display = 'none';
  };

  window.guardarEdicionInst = function(idx) {
    var nuevoTitulo = document.getElementById('edit-inst-titulo-' + idx).value.trim();
    var nuevaDesc   = document.getElementById('edit-inst-desc-' + idx).value.trim();
    if (!nuevoTitulo || !nuevaDesc) return;
    terminosInst[idx].titulo = nuevoTitulo;
    terminosInst[idx].desc   = nuevaDesc;
    var baseCount = terminosInst.length - JSON.parse(localStorage.getItem('glosario_inst_extra') || '[]').length;
    if (idx >= baseCount) {
      var extras = JSON.parse(localStorage.getItem('glosario_inst_extra') || '[]');
      var extraIdx = idx - baseCount;
      if (extras[extraIdx]) { extras[extraIdx].titulo = nuevoTitulo; extras[extraIdx].desc = nuevaDesc; }
      localStorage.setItem('glosario_inst_extra', JSON.stringify(extras));
    }
    var q = document.getElementById('search-inst').value.trim().toLowerCase();
    renderInst(terminosInst, q);
  };

  window.eliminarTerminoInst = function(idx) {
    if (!confirm('¿Eliminar "' + terminosInst[idx].titulo + '"?')) return;
    var baseCount = terminosInst.length - JSON.parse(localStorage.getItem('glosario_inst_extra') || '[]').length;
    if (idx >= baseCount) {
      var extras = JSON.parse(localStorage.getItem('glosario_inst_extra') || '[]');
      extras.splice(idx - baseCount, 1);
      localStorage.setItem('glosario_inst_extra', JSON.stringify(extras));
    }
    terminosInst.splice(idx, 1);
    var q = document.getElementById('search-inst').value.trim().toLowerCase();
    renderInst(terminosInst, q);
  };

  window.filtrarInst = function() {
    var q = document.getElementById('search-inst').value.trim().toLowerCase();
    renderInst(terminosInst, q);
  };

  window.setCatInst = function(cat, btn) {
    catActualInst = cat;
    document.querySelectorAll('#cats-inst .btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var q = document.getElementById('search-inst').value.trim().toLowerCase();
    renderInst(terminosInst, q);
  };

  window.agregarTerminoInst = function() {
    var termino = document.getElementById('inst-nuevo-termino').value.trim();
    var definicion = document.getElementById('inst-nueva-definicion').value.trim();
    var categoria = document.getElementById('inst-nueva-categoria').value;
    var msg = document.getElementById('msg-inst');

    if (!termino || !definicion) {
      if (msg) { msg.textContent = 'Completa el término y la definición.'; msg.style.display = 'inline-block'; msg.className = 'align-self-center text-danger'; }
      return;
    }

    // Validaciones con expresiones regulares
    var reTerminoInst   = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_./()]{2,100}$/;
    var reDefinicionInst = /^[\s\S]{5,500}$/;
    if (!reTerminoInst.test(termino)) {
      if (msg) { msg.textContent = 'Término inválido (2-100 caracteres, sin caracteres especiales).'; msg.style.display='inline-block'; msg.className='align-self-center text-danger'; }
      return;
    }
    if (!reDefinicionInst.test(definicion)) {
      if (msg) { msg.textContent = 'La definición debe tener entre 5 y 500 caracteres.'; msg.style.display='inline-block'; msg.className='align-self-center text-danger'; }
      return;
    }

    if (!window.auth || !window.auth.isAuthenticated()) {
      if (msg) { msg.textContent = 'Debes iniciar sesión para enviar una propuesta.'; msg.style.display = 'inline-block'; msg.className = 'align-self-center text-danger'; }
      return;
    }
    if (msg) { msg.textContent = 'Enviando propuesta...'; msg.style.display = 'inline-block'; msg.className = 'align-self-center text-muted'; }

    var catLabels = { comunicacion:'Comunicación', operativa:'Operativa', kpis:'KPIs', tecnologias:'Tecnologías', campo:'Campo', sistemas:'Sistemas', geografico:'Geográfico' };
    var nuevo = { icon:'<i class="bi bi-journal-text text-danger"></i>', titulo: termino, cat: categoria, catLabel: catLabels[categoria] || categoria, desc: definicion };

    // Guardar en localStorage para persistencia
    var guardados = JSON.parse(localStorage.getItem('glosario_inst_extra') || '[]');
    guardados.push(nuevo);
    localStorage.setItem('glosario_inst_extra', JSON.stringify(guardados));
    terminosInst.push(nuevo);

    document.getElementById('inst-nuevo-termino').value = '';
    document.getElementById('inst-nueva-definicion').value = '';
    document.getElementById('inst-nueva-categoria').value = 'comunicacion';
    if (msg) { msg.textContent = '¡Término agregado!'; msg.style.display = 'inline-block'; msg.className = 'align-self-center text-success'; }

    var apiBase = window.auth && window.auth.API_URL ? window.auth.API_URL : '';
    fetch(apiBase + '/api/glosario/propuestas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('authToken') },
      body: JSON.stringify({ termino: termino, definicion: definicion, categoria: categoria, tipo: 'institucional' })
    }).catch(function() {}); // silencioso si el backend falla

    var q = document.getElementById('search-inst').value.trim().toLowerCase();
    renderInst(terminosInst, q);
  };

  function init() {
    var grid = document.getElementById('grid-inst');
    var formContainer = document.getElementById('inst-form-container');
    if (!grid) { setTimeout(init, 200); return; }

    // Cargar términos extra guardados en localStorage
    var extra = JSON.parse(localStorage.getItem('glosario_inst_extra') || '[]');
    extra.forEach(function(t) { terminosInst.push(t); });
    renderInst(terminosInst, '');

    // Esperar a que auth.js esté listo para mostrar/ocultar el form
    function checkAuth() {
      if (window.auth) {
        var autenticado = window.auth.isAuthenticated();
        isAdminInst = autenticado && window.auth.getUserRole() === 'admin';
        if (formContainer) formContainer.style.display = autenticado ? 'block' : 'none';
        if (isAdminInst) renderInst(terminosInst, '');
      } else {
        setTimeout(checkAuth, 150);
      }
    }
    checkAuth();
  }
  init();
})();
</script>