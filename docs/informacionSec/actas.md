# <i class="bi bi-file-earmark-text"></i> Actas

<div class="container-fluid px-0">
  <!-- Barra de búsqueda y filtros -->
  <div class="row g-3 mb-4">
    <div class="col-md-8">
      <div class="input-group">
        <span class="input-group-text bg-white">
          <i class="bi bi-search"></i>
        </span>
        <input type="text" id="search-actas" class="form-control" placeholder="Buscar acta por título o descripción..." />
      </div>
    </div>
    <div class="col-md-4">
      <select id="sort-actas" class="form-select">
        <option value="desc"><i class="bi bi-calendar"></i> Más reciente primero</option>
        <option value="asc"><i class="bi bi-calendar"></i> Más antiguo primero</option>
      </select>
    </div>
  </div>

  <!-- Botón agregar -->
  <div class="mb-4">
    <button class="btn btn-primary" onclick="toggleForm()">
      <i class="bi bi-plus-circle"></i> Agregar Acta
    </button>
  </div>

  <!-- Formulario de subida -->
  <div id="upload-form" class="card mb-4" style="display:none">
    <div class="card-header bg-primary text-white">
      <h5 class="mb-0"><i class="bi bi-cloud-upload"></i> Subir nueva Acta</h5>
    </div>
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Título *</label>
          <input type="text" id="input-titulo" class="form-control" placeholder="Ej: Acta Reunión Febrero 2026" />
        </div>
        <div class="col-md-6">
          <label class="form-label">Descripción</label>
          <input type="text" id="input-desc" class="form-control" placeholder="Breve descripción del acta" />
        </div>
        <div class="col-12">
          <label class="form-label">Archivo PDF *</label>
          <input type="file" id="input-pdf" class="form-control" accept=".pdf" />
        </div>
      </div>
      <div class="mt-3">
        <div id="upload-msg" class="alert" style="display:none"></div>
      </div>
    </div>
    <div class="card-footer">
      <button class="btn btn-secondary" onclick="toggleForm()">Cancelar</button>
      <button class="btn btn-primary ms-2" onclick="subirDoc('actas')">
        <i class="bi bi-cloud-upload"></i> Subir
      </button>
    </div>
  </div>

  <!-- Grid de documentos -->
  <div id="actas-grid" class="row g-3"></div>
</div>

<script>
(function() {
  var API = (window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://diccionario-backend-ahtd.onrender.com') + '/api/actas';
  var allDocs = [];

  function toggleForm() {
    var f = document.getElementById('upload-form');
    if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
    var msg = document.getElementById('upload-msg');
    if (msg) { msg.style.display = 'none'; msg.textContent = ''; }
  }
  window.toggleForm = toggleForm;

  function cargarDocs() {
    var grid = document.getElementById('actas-grid');
    if (!grid) return;
    fetch(API)
      .then(function(r) { return r.json(); })
      .then(function(docs) {
        allDocs = docs;
        renderDocs(docs);
      })
      .catch(function() {
        grid.innerHTML = '<div class="col-12"><div class="alert alert-warning"><i class="bi bi-exclamation-triangle"></i> No se pudo conectar al servidor.</div></div>';
      });
  }

  function renderDocs(docs) {
    var grid = document.getElementById('actas-grid');
    if (!grid) return;
    
    if (!docs.length) {
      grid.innerHTML = '<div class="col-12"><div class="alert alert-info"><i class="bi bi-inbox"></i> No hay actas todavía. ¡Sube la primera!</div></div>';
      return;
    }
    
    var sortOrder = document.getElementById('sort-actas').value;
    docs.sort(function(a, b) { 
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    });
    
    grid.innerHTML = docs.map(function(d) {
      return '<div class="col-md-6 col-lg-4">' +
        '<div class="card h-100 shadow-sm">' +
          '<div class="card-body">' +
            '<div class="d-flex align-items-center mb-3">' +
              '<i class="bi bi-file-earmark-pdf text-danger fs-1 me-3"></i>' +
              '<div class="flex-grow-1">' +
                '<h5 class="card-title mb-1">' + d.titulo + '</h5>' +
                '<small class="text-muted"><i class="bi bi-calendar3"></i> ' + d.fecha + '</small>' +
              '</div>' +
            '</div>' +
            (d.descripcion ? '<p class="card-text text-muted small">' + d.descripcion + '</p>' : '') +
          '</div>' +
          '<div class="card-footer bg-transparent">' +
            '<a href="' + d.archivo + '" class="btn btn-danger w-100" download>' +
              '<i class="bi bi-download"></i> Descargar PDF' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  window.subirDoc = function(modulo) {
    var titulo = document.getElementById('input-titulo').value.trim();
    var desc   = document.getElementById('input-desc').value.trim();
    var pdf    = document.getElementById('input-pdf').files[0];
    var msg    = document.getElementById('upload-msg');

    if (!titulo || !pdf) {
      msg.className = 'alert alert-danger';
      msg.style.display = 'block';
      msg.innerHTML = '<i class="bi bi-exclamation-circle"></i> El título y el PDF son obligatorios.';
      return;
    }

    var form = new FormData();
    form.append('titulo', titulo);
    form.append('descripcion', desc);
    form.append('pdf', pdf);

    var btn = document.querySelector('.card-footer .btn-primary');
    var originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Subiendo...';
    btn.disabled = true;

    fetch(API, { 
      method: 'POST', 
      body: form,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      }
    })
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res.error) throw new Error(res.error);
        msg.className = 'alert alert-success';
        msg.style.display = 'block';
        msg.innerHTML = '<i class="bi bi-check-circle"></i> Acta subida correctamente!';
        document.getElementById('input-titulo').value = '';
        document.getElementById('input-desc').value = '';
        document.getElementById('input-pdf').value = '';
        cargarDocs();
        setTimeout(function() { toggleForm(); }, 1500);
      })
      .catch(function(e) {
        msg.className = 'alert alert-danger';
        msg.style.display = 'block';
        msg.innerHTML = '<i class="bi bi-exclamation-circle"></i> Error: ' + e.message;
      })
      .finally(function() {
        btn.innerHTML = originalText;
        btn.disabled = false;
      });
  };

  function buscarActas() {
    var searchTerm = document.getElementById('search-actas').value.toLowerCase();
    var filtered = allDocs.filter(function(doc) {
      return doc.titulo.toLowerCase().includes(searchTerm) || 
             (doc.descripcion && doc.descripcion.toLowerCase().includes(searchTerm));
    });
    renderDocs(filtered);
  }

  document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('search-actas');
    if (searchInput) {
      searchInput.addEventListener('input', buscarActas);
    }
    var sortSelect = document.getElementById('sort-actas');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        renderDocs(allDocs);
      });
    }
    cargarDocs();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarDocs);
  } else {
    cargarDocs();
    var searchInput = document.getElementById('search-actas');
    if (searchInput) {
      searchInput.addEventListener('input', buscarActas);
    }
    var sortSelect = document.getElementById('sort-actas');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        renderDocs(allDocs);
      });
    }
  }
  setTimeout(cargarDocs, 300);
})();
</script>
