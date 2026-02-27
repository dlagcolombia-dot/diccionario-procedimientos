# 📚 Glosario Técnico

> Tu diccionario visual de tecnología - Explicado en lenguaje simple

<div class="glosario-wrapper">

  <div class="glosario-search-bar">
    <span class="search-icon">🔍</span>
    <input type="text" id="search-tec" placeholder="Buscar término..." oninput="filtrarTec()" />
  </div>

  <div class="glosario-categorias" id="cats-tec">
    <button class="cat-btn active" onclick="setCatTec('todos', this)">Todos</button>
    <button class="cat-btn" onclick="setCatTec('frontend', this)">💻 Frontend</button>
    <button class="cat-btn" onclick="setCatTec('backend', this)">🧠 Backend</button>
    <button class="cat-btn" onclick="setCatTec('arquitectura', this)">🏗️ Arquitectura</button>
    <button class="cat-btn" onclick="setCatTec('basedatos', this)">💾 Base de Datos</button>
    <button class="cat-btn" onclick="setCatTec('automatizacion', this)">🤖 Automatización</button>
    <button class="cat-btn" onclick="setCatTec('versiones', this)">🗂️ Versiones</button>
    <button class="cat-btn" onclick="setCatTec('gestion', this)">📋 Gestión</button>
  </div>

  <div class="glosario-grid" id="grid-tec"></div>
  <div class="glosario-empty" id="empty-tec" style="display:none">😔 No se encontraron términos</div>

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
  var terminosTec = [
    { icon:'💻', titulo:'Frontend', cat:'frontend', catLabel:'Frontend', desc:'La <strong>"cara" del sistema</strong>. Todo lo que ves, tocas y donde haces clic: botones, colores, gráficos. Como el tablero y el volante de un carro.' },
    { icon:'⚡', titulo:'Vue.js / Svelte', cat:'frontend', catLabel:'Frontend', desc:'Herramientas para construir la cara del sistema. Como tener un <strong>kit de LEGO profesional</strong> en lugar de construir cada pieza desde cero.' },
    { icon:'📊', titulo:'Dashboard', cat:'frontend', catLabel:'Frontend', desc:'Un <strong>tablero de control con gráficas</strong> (como el de un avión) para ver de un vistazo cómo van las operaciones en tiempo real.' },
    { icon:'⚙️', titulo:'Backend', cat:'backend', catLabel:'Backend', desc:'El <strong>"cerebro" y motor</strong> que no ves. Procesa información, valida contraseñas y organiza los datos del sistema.' },
    { icon:'🐍', titulo:'Python', cat:'backend', catLabel:'Backend', desc:'Lenguaje de programación popular por ser <strong>fácil de leer y excelente para datos</strong>. Como hablar inglés en el mundo de la programación.' },
    { icon:'🚀', titulo:'FastAPI / Flask', cat:'backend', catLabel:'Backend', desc:'Herramientas para construir el Backend con Python. <strong>FastAPI:</strong> moderna y rápida. <strong>Flask:</strong> simple y tradicional.' },
    { icon:'🟢', titulo:'Node.js', cat:'backend', catLabel:'Backend', desc:'Permite usar JavaScript para <strong>tareas de servidor o robots</strong>. El mismo código del navegador funciona en el servidor.' },
    { icon:'🔗', titulo:'API', cat:'backend', catLabel:'Backend', desc:'Es el <strong>mensajero</strong> entre sistemas. Como el mesero que lleva tu pedido a la cocina y te trae la comida.' },
    { icon:'🔐', titulo:'JWT (JSON Web Token)', cat:'backend', catLabel:'Backend', desc:'Es un <strong>"pase VIP" digital</strong>. Te autentificas una vez y el sistema te da un token para no repetir tu contraseña en cada clic.' },
    { icon:'🔑', titulo:'OTP (One-Time Password)', cat:'backend', catLabel:'Backend', desc:'La <strong>clave de un solo uso</strong> que llega al celular. Expira en minutos y solo sirve una vez.' },
    { icon:'🧩', titulo:'Microservicios', cat:'arquitectura', catLabel:'Arquitectura', desc:'El sistema dividido en <strong>"pequeños especialistas"</strong>. Si uno falla, los demás siguen funcionando sin problemas.' },
    { icon:'🚪', titulo:'Nginx / Proxy Reverso', cat:'arquitectura', catLabel:'Arquitectura', desc:'Como el <strong>recepcionista de un edificio</strong>. Recibe a todos y los dirige al departamento correcto.' },
    { icon:'📦', titulo:'Docker', cat:'arquitectura', catLabel:'Arquitectura', desc:'Un <strong>"contenedor" de carga</strong>. El programa funciona igual en cualquier computadora, sin el típico "en mi casa sí funcionaba".' },
    { icon:'🏗️', titulo:'SSH (Secure Shell)', cat:'arquitectura', catLabel:'Arquitectura', desc:'El <strong>túnel seguro</strong> por el cual te conectas desde tu computadora al servidor remoto.' },
    { icon:'🚦', titulo:'Puertos', cat:'arquitectura', catLabel:'Arquitectura', desc:'Las <strong>"puertas" del servidor</strong>. Cada servicio usa un puerto específico. Si está cerrado, nadie puede entrar.' },
    { icon:'🛡️', titulo:'Firewall', cat:'arquitectura', catLabel:'Arquitectura', desc:'El <strong>portero de seguridad</strong>. Decide quién entra y quién no según los puertos configurados.' },
    { icon:'🌐', titulo:'IP Estática vs. DNS', cat:'arquitectura', catLabel:'Arquitectura', desc:'<strong>IP Estática:</strong> dirección fija del servidor. <strong>DNS:</strong> la "guía telefónica" que convierte claro.com.co en una IP numérica.' },
    { icon:'🖥️', titulo:'Servidor', cat:'arquitectura', catLabel:'Arquitectura', desc:'Computadora <strong>siempre encendida y conectada</strong> cuya función es atender las peticiones de otras computadoras.' },
    { icon:'🗄️', titulo:'MySQL', cat:'basedatos', catLabel:'Base de Datos', desc:'Un <strong>archivador digital gigante</strong>. Organiza datos en tablas como Excel pero mucho más potente y seguro.' },
    { icon:'🤖', titulo:'Bot ETL', cat:'automatizacion', catLabel:'Automatización', desc:'Robot que <strong>Extrae</strong> (lee correos), <strong>Transforma</strong> (organiza datos) y <strong>Carga</strong> (guarda en BD). Lo que tomaba 2 horas, lo hace en 5 minutos.' },
    { icon:'📁', titulo:'Repositorio (Repo)', cat:'versiones', catLabel:'Versiones', desc:'La <strong>carpeta en la nube</strong> donde vive el código del proyecto (GitHub/GitLab). Historial completo y respaldo automático.' },
    { icon:'⏮️', titulo:'Git', cat:'versiones', catLabel:'Versiones', desc:'Sistema que permite <strong>viajar en el tiempo</strong>. Si alguien borra algo por error, Git permite volver a la versión anterior.' },
    { icon:'🌿', titulo:'Ramas (Branches)', cat:'versiones', catLabel:'Versiones', desc:'<strong>Copias del proyecto</strong> donde cada desarrollador trabaja sin chocar con los demás. Luego se unen en "main".' },
    { icon:'📝', titulo:'Backlog', cat:'gestion', catLabel:'Gestión', desc:'La <strong>lista de tareas pendientes</strong> organizada por prioridad: 🔴 Urgente, 🟡 Importante, 🟢 Cuando se pueda.' },
    { icon:'📜', titulo:'Logs', cat:'gestion', catLabel:'Gestión', desc:'El <strong>diario del sistema</strong>. Anota todo lo que pasa: accesos, errores, conexiones. Esencial para encontrar fallas.' },
    { icon:'🐧', titulo:'Linux', cat:'gestion', catLabel:'Gestión', desc:'El <strong>corazón (Kernel)</strong> del sistema operativo. Gratis, seguro y en todas partes: desde Android hasta servidores de la NASA.' }
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

  window.filtrarTec = function() {
    var q = document.getElementById('search-tec').value.trim().toLowerCase();
    renderTec(terminosTec, q);
  };

  window.setCatTec = function(cat, btn) {
    catActualTec = cat;
    document.querySelectorAll('#cats-tec .cat-btn').forEach(function(b) { b.classList.remove('active'); });
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