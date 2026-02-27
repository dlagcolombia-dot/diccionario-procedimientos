# 🏢 Glosario Institucional

> Términos y conceptos del día a día en Claro

<div class="glosario-wrapper">

  <div class="glosario-search-bar">
    <span class="search-icon">🔍</span>
    <input type="text" id="search-inst" placeholder="Buscar término..." oninput="filtrarInst()" />
  </div>

  <div class="glosario-categorias" id="cats-inst">
    <button class="cat-btn active" onclick="setCatInst('todos', this)">Todos</button>
    <button class="cat-btn" onclick="setCatInst('comunicacion', this)">📢 Comunicación</button>
    <button class="cat-btn" onclick="setCatInst('operativa', this)">🛠️ Operativa</button>
    <button class="cat-btn" onclick="setCatInst('kpis', this)">📊 KPIs</button>
    <button class="cat-btn" onclick="setCatInst('tecnologias', this)">💻 Tecnologías</button>
    <button class="cat-btn" onclick="setCatInst('campo', this)">👷 Campo</button>
    <button class="cat-btn" onclick="setCatInst('sistemas', this)">📂 Sistemas</button>
    <button class="cat-btn" onclick="setCatInst('geografico', this)">📍 Geográfico</button>
  </div>

  <div class="glosario-grid" id="grid-inst"></div>
  <div class="glosario-empty" id="empty-inst" style="display:none">😔 No se encontraron términos</div>

</div>

<style>
.glosario-wrapper { margin-top: 20px; }
.glosario-search-bar {
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 16px;
  margin-bottom: 16px;
  gap: 10px;
  transition: border-color 0.2s;
}
.glosario-search-bar:focus-within { border-color: #2c3e50; }
.search-icon { font-size: 18px; }
.glosario-search-bar input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  width: 100%;
  font-family: inherit;
  color: #1f2937;
}
.glosario-categorias {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.cat-btn {
  padding: 6px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  transition: all 0.2s;
  font-family: inherit;
}
.cat-btn:hover { border-color: #2c3e50; color: #2c3e50; }
.cat-btn.active { background: #2c3e50; color: #fff; border-color: #2c3e50; }
.glosario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.glosario-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s, transform 0.2s;
}
.glosario-card:hover { box-shadow: 0 6px 18px rgba(0,0,0,0.1); transform: translateY(-2px); }
.glosario-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.glosario-card-icon { font-size: 28px; }
.glosario-card-title {
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.3;
}
.glosario-card-cat {
  font-size: 10px;
  color: #9ca3af;
  margin-top: 2px;
}
.glosario-card-desc {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}
.glosario-card-desc strong { color: #374151; }
.glosario-empty {
  text-align: center;
  padding: 40px;
  color: #9ca3af;
  font-size: 14px;
}
.highlight { background: #fef08a; border-radius: 3px; padding: 0 2px; }
@media (max-width: 768px) {
  .glosario-grid { grid-template-columns: 1fr; }
}
</style>

<script>
(function() {
  var terminosInst = [
    { icon:'🤝', titulo:'CONECTATEC', cat:'comunicacion', catLabel:'Comunicación', desc:'Reunión <strong>trimestral de ingeniería</strong> para presentar estados del área y reconocimientos al equipo.' },
    { icon:'📰', titulo:'OTC NEWS', cat:'comunicacion', catLabel:'Comunicación', desc:'Encuentro <strong>mensual</strong> para compartir indicadores y avances de mejora continua.' },
    { icon:'📈', titulo:'MAGAZÍN ESTRATÉGICO', cat:'comunicacion', catLabel:'Comunicación', desc:'Revisión <strong>mensual</strong> de logros y proyecciones regionales.' },
    { icon:'🎙️', titulo:'HABLEMOS LO NUESTRO', cat:'comunicacion', catLabel:'Comunicación', desc:'Espacio de Presidencia para cifras clave del negocio como <strong>NPS y ventas</strong>.' },
    { icon:'⚡', titulo:'SHOT DE AGILISMO', cat:'comunicacion', catLabel:'Comunicación', desc:'Ceremonia para fomentar la <strong>cultura ágil</strong> en COT Claro R3.' },
    { icon:'🤜🤛', titulo:'Los 4 Acuerdos de Confianza', cat:'comunicacion', catLabel:'Comunicación', desc:'<strong>Dar contexto · Generar acuerdos · Enseñar el camino · Asegurar resultados.</strong>' },
    { icon:'🚀', titulo:'Mentalidad Proactiva', cat:'comunicacion', catLabel:'Comunicación', desc:'<strong>Ownership</strong> (dueño) + <strong>Accountability</strong> (responsabilidad) + <strong>Autodesarrollo</strong>.' },
    { icon:'🧘', titulo:'SER, SABER y HACER', cat:'operativa', catLabel:'Operativa', desc:'Los tres ejes: <strong>SER</strong> (capacidad emocional), <strong>SABER</strong> (conocimiento técnico) y <strong>HACER</strong> (aplicación práctica).' },
    { icon:'🏆', titulo:'Los 4 Pilares Estratégicos', cat:'operativa', catLabel:'Operativa', desc:'<strong>Red</strong> (mejor red) · <strong>Experiencia</strong> (mejor servicio) · <strong>Automatización</strong> (digitalización) · <strong>Personas</strong> (mejor talento).' },
    { icon:'❤️', titulo:'NPS (Net Promoter Score)', cat:'kpis', catLabel:'KPIs', desc:'Mide la <strong>lealtad del cliente</strong>: Promotores (9-10), Pasivos (7-8) y Detractores (0-6).' },
    { icon:'⏱️', titulo:'KPI / SLA', cat:'kpis', catLabel:'KPIs', desc:'<strong>KPI:</strong> Indicadores clave de desempeño. <strong>SLA:</strong> Acuerdos de nivel de servicio y tiempos comprometidos.' },
    { icon:'📉', titulo:'ICR / ICRM / ICRF', cat:'kpis', catLabel:'KPIs', desc:'Índices de calidad de red: <strong>ICR</strong> general, <strong>ICRM</strong> móvil y <strong>ICRF</strong> fijo.' },
    { icon:'⏳', titulo:'TRF', cat:'kpis', catLabel:'KPIs', desc:'<strong>Tiempo de Respuesta a Fallos.</strong> Mide qué tan rápido se atiende y resuelve una falla.' },
    { icon:'📺', titulo:'HFC', cat:'tecnologias', catLabel:'Tecnologías', desc:'<strong>Hybrid Fiber-Coaxial.</strong> Tecnología que combina fibra óptica y cable coaxial para internet de alta velocidad.' },
    { icon:'🏠', titulo:'FTTH / FTTX', cat:'tecnologias', catLabel:'Tecnologías', desc:'<strong>FTTH:</strong> Fibra óptica al hogar. <strong>FTTX:</strong> Fibra a Pymes u otras ubicaciones.' },
    { icon:'🔬', titulo:'GPON', cat:'tecnologias', catLabel:'Tecnologías', desc:'Tecnología dentro de las redes de fibra óptica. Distribuye la señal a múltiples usuarios desde un solo punto.' },
    { icon:'📡', titulo:'DTH', cat:'tecnologias', catLabel:'Tecnologías', desc:'<strong>Direct To Home.</strong> Distribución de televisión vía satélite directamente al hogar.' },
    { icon:'📱', titulo:'Red Móvil vs. Fijo', cat:'tecnologias', catLabel:'Tecnologías', desc:'<strong>Móvil:</strong> Servicios de telefonía e internet móvil. <strong>Fijo:</strong> Servicios residenciales y corporativos.' },
    { icon:'📝', titulo:'OT / LLS', cat:'campo', catLabel:'Campo', desc:'<strong>OT:</strong> Orden de Trabajo asignada a una cuadrilla. <strong>LLS:</strong> Llamadas de servicio por mantenimiento.' },
    { icon:'🔧', titulo:'Tipos de Mantenimiento', cat:'campo', catLabel:'Campo', desc:'<strong>Preventivo</strong> (mitigar fallas) · <strong>Correctivo</strong> (recuperar servicio) · <strong>Predictivo</strong> (monitoreo programado).' },
    { icon:'🚐', titulo:'Cuadrilla', cat:'campo', catLabel:'Campo', desc:'Grupo técnico con vehículo y herramientas que <strong>ejecuta las labores en campo</strong>.' },
    { icon:'📞', titulo:'Backoffice', cat:'campo', catLabel:'Campo', desc:'Personal de soporte interno que <strong>asigna recursos y cierra las OT</strong> sin ir a campo.' },
    { icon:'🤝', titulo:'Aliado', cat:'campo', catLabel:'Campo', desc:'Empresa <strong>contratista</strong> que opera los servicios de mantenimiento bajo lineamientos de Claro.' },
    { icon:'🤖', titulo:'WFM / OFSC', cat:'sistemas', catLabel:'Sistemas', desc:'Plataforma con <strong>inteligencia artificial</strong> para programar y ejecutar el trabajo de campo.' },
    { icon:'👥', titulo:'CRM', cat:'sistemas', catLabel:'Sistemas', desc:'<strong>Customer Relationship Management.</strong> Sistema para gestionar interacciones con el cliente.' },
    { icon:'🗺️', titulo:'GIS / Smallworld', cat:'sistemas', catLabel:'Sistemas', desc:'Sistemas de <strong>información geográfica</strong> para gestionar el inventario físico de la red en el mapa.' },
    { icon:'🗄️', titulo:'RR (AS400)', cat:'sistemas', catLabel:'Sistemas', desc:'Base de datos <strong>principal</strong> donde están registrados todos los clientes de Claro.' },
    { icon:'📂', titulo:'Remedy / Maximo', cat:'sistemas', catLabel:'Sistemas', desc:'Herramientas para la <strong>administración de incidentes</strong> de la red móvil.' },
    { icon:'🌄', titulo:'VACANA', cat:'geografico', catLabel:'Geográfico', desc:'Región que comprende: <strong>Valle, Cauca y Nariño.</strong>' },
    { icon:'🏜️', titulo:'TOLHUCA', cat:'geografico', catLabel:'Geográfico', desc:'Región que comprende: <strong>Tolima, Huila y Caquetá.</strong>' },
    { icon:'🏢', titulo:'UMM / UMC', cat:'geografico', catLabel:'Geográfico', desc:'<strong>UMM:</strong> Unidad de Mercado Masivo (residencial). <strong>UMC:</strong> Unidad de Mercado Corporativo.' },
    { icon:'🏪', titulo:'Pymes / Soho', cat:'geografico', catLabel:'Geográfico', desc:'<strong>Pymes:</strong> Pequeñas y medianas empresas. <strong>Soho:</strong> Small Office/Home Office, negocios de barrio.' }
  ];

  var catActualInst = 'todos';

  function renderInst(terminos, busqueda) {
    var grid  = document.getElementById('grid-inst');
    var empty = document.getElementById('empty-inst');
    if (!grid) return;

    var filtrados = terminos.filter(function(t) {
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

    grid.innerHTML = filtrados.map(function(t) {
      var titulo = busqueda ? t.titulo.replace(new RegExp('(' + busqueda + ')', 'gi'), '<span class="highlight">$1</span>') : t.titulo;
      return '<div class="glosario-card">' +
        '<div class="glosario-card-header">' +
          '<div class="glosario-card-icon">' + t.icon + '</div>' +
          '<div>' +
            '<div class="glosario-card-title">' + titulo + '</div>' +
            '<div class="glosario-card-cat">' + t.catLabel + '</div>' +
          '</div>' +
        '</div>' +
        '<p class="glosario-card-desc">' + t.desc + '</p>' +
      '</div>';
    }).join('');
  }

  window.filtrarInst = function() {
    var q = document.getElementById('search-inst').value.trim().toLowerCase();
    renderInst(terminosInst, q);
  };

  window.setCatInst = function(cat, btn) {
    catActualInst = cat;
    document.querySelectorAll('#cats-inst .cat-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var q = document.getElementById('search-inst').value.trim().toLowerCase();
    renderInst(terminosInst, q);
  };

  function init() {
    var grid = document.getElementById('grid-inst');
    if (grid) { renderInst(terminosInst, ''); }
    else { setTimeout(init, 200); }
  }
  init();
})();
</script>