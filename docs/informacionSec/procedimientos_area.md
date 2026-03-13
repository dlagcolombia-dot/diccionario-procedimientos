# <i class="bi bi-list-check"></i> Procedimientos

<div class="container-fluid px-0">
  <!-- Barra de búsqueda y filtros -->
  <div class="row g-3 mb-4">
    <div class="col-md-8">
      <div class="input-group">
        <span class="input-group-text bg-white">
          <i class="bi bi-search"></i>
        </span>
        <input type="text" id="search-procedimientos" class="form-control" placeholder="Buscar procedimiento por título o descripción..." />
      </div>
    </div>
    <div class="col-md-4">
      <select id="sort-procedimientos" class="form-select">
        <option value="desc"><i class="bi bi-calendar"></i> Más reciente primero</option>
        <option value="asc"><i class="bi bi-calendar"></i> Más antiguo primero</option>
      </select>
    </div>
  </div>

  <!-- Botón agregar -->
  <div class="mb-4">
    <button class="btn btn-primary" onclick="toggleFormProcedimientos()">
      <i class="bi bi-plus-circle"></i> Agregar Procedimiento
    </button>
  </div>

  <!-- Formulario de subida -->
  <div id="upload-form-procedimientos" class="card mb-4" style="display:none">
    <div class="card-header bg-primary text-white">
      <h5 class="mb-0"><i class="bi bi-cloud-upload"></i> Subir nuevo Procedimiento</h5>
    </div>
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Título *</label>
          <input type="text" id="input-titulo-procedimientos" class="form-control" placeholder="Ej: Procedimiento de Solicitud de Vacaciones" />
        </div>
        <div class="col-md-6">
          <label class="form-label">Descripción</label>
          <input type="text" id="input-desc-procedimientos" class="form-control" placeholder="Breve descripción del procedimiento" />
        </div>
        <div class="col-12">
          <label class="form-label">Archivo PDF *</label>
          <input type="file" id="input-pdf-procedimientos" class="form-control" accept=".pdf" />
        </div>
      </div>
      <div class="mt-3">
        <div id="upload-msg-procedimientos" class="alert" style="display:none"></div>
      </div>
    </div>
    <div class="card-footer">
      <button class="btn btn-secondary" onclick="toggleFormProcedimientos()">Cancelar</button>
      <button class="btn btn-primary ms-2" onclick="subirDocProcedimientos('procedimientos')">
        <i class="bi bi-cloud-upload"></i> Subir
      </button>
    </div>
  </div>

  <!-- Grid de documentos -->
  <div id="procedimientos-grid" class="row g-3"></div>
</div>

<script>
(function() {
  var API = (window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://diccionario-backend-ahtd.onrender.com') + '/api/procedimientos';
  var allDocs = [];

  function toggleFormProcedimientos() {
    var f = document.getElementById('upload-form-procedimientos');
    if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
    var msg = document.getElementById('upload-msg-procedimientos');
    if (msg) { msg.style.display = 'none'; msg.textContent = ''; }
  }
  window.toggleFormProcedimientos = toggleFormProcedimientos;

  function cargarDocs() {
    var grid = document.getElementById('procedimientos-grid');
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
    var grid = document.getElementById('procedimientos-grid');
    if (!grid) return;
    
    if (!docs.length) {
      grid.innerHTML = '<div class="col-12"><div class="alert alert-info"><i class="bi bi-inbox"></i> No hay procedimientos todavía. ¡Sube el primero!</div></div>';
      return;
    }
    
    var sortOrder = document.getElementById('sort-procedimientos').value;
    docs.sort(function(a, b) { 
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    });
    
    grid.innerHTML = docs.map(function(d) {
      return '<div class="col-md-6 col-lg-4">' +
        '<div class="doc-card">' +
          '<div class="doc-card-header">' +
            '<div class="doc-icon">' +
              '<i class="bi bi-file-earmark-pdf"></i>' +
            '</div>' +
            '<div class="doc-badge">PDF</div>' +
          '</div>' +
          '<div class="doc-card-body">' +
            '<h5 class="doc-title">' + d.titulo + '</h5>' +
            '<p class="doc-date"><i class="bi bi-calendar3"></i> ' + d.fecha + '</p>' +
            (d.descripcion ? '<p class="doc-description">' + d.descripcion + '</p>' : '<p class="doc-description text-muted">Sin descripción</p>') +
          '</div>' +
          '<div class="doc-card-footer">' +
            '<a href="' + d.archivo + '" target="_blank" class="btn-doc-action btn-preview">' +
              '<i class="bi bi-eye"></i> Vista Previa' +
            '</a>' +
            '<a href="' + d.archivo + '" class="btn-doc-action btn-download" download>' +
              '<i class="bi bi-download"></i>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  window.subirDocProcedimientos = function(modulo) {
    var titulo = document.getElementById('input-titulo-procedimientos').value.trim();
    var desc   = document.getElementById('input-desc-procedimientos').value.trim();
    var pdf    = document.getElementById('input-pdf-procedimientos').files[0];
    var msg    = document.getElementById('upload-msg-procedimientos');

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

    var btn = document.querySelector('#upload-form-procedimientos .card-footer .btn-primary');
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
        msg.innerHTML = '<i class="bi bi-check-circle"></i> Procedimiento subido correctamente!';
        document.getElementById('input-titulo-procedimientos').value = '';
        document.getElementById('input-desc-procedimientos').value = '';
        document.getElementById('input-pdf-procedimientos').value = '';
        cargarDocs();
        setTimeout(function() { toggleFormProcedimientos(); }, 1500);
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

  function buscarProcedimientos() {
    var searchTerm = document.getElementById('search-procedimientos').value.toLowerCase();
    var filtered = allDocs.filter(function(doc) {
      return doc.titulo.toLowerCase().includes(searchTerm) || 
             (doc.descripcion && doc.descripcion.toLowerCase().includes(searchTerm));
    });
    renderDocs(filtered);
  }

  document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('search-procedimientos');
    if (searchInput) {
      searchInput.addEventListener('input', buscarProcedimientos);
    }
    var sortSelect = document.getElementById('sort-procedimientos');
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
    var searchInput = document.getElementById('search-procedimientos');
    if (searchInput) {
      searchInput.addEventListener('input', buscarProcedimientos);
    }
    var sortSelect = document.getElementById('sort-procedimientos');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        renderDocs(allDocs);
      });
    }
  }
  setTimeout(cargarDocs, 300);
})();
</script>


<style>
/* Tarjetas de documentos mejoradas */
.doc-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
}

.doc-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.15);
  border-color: #dc2626;
}

.doc-card-header {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.doc-icon {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
}

.doc-icon i {
  font-size: 32px;
  color: #dc2626;
}

.doc-badge {
  background: #dc2626;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.doc-card-body {
  padding: 20px;
  flex-grow: 1;
}

.doc-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.doc-date {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.doc-description {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.doc-card-footer {
  padding: 15px 20px;
  background: #f9fafb;
  display: flex;
  gap: 10px;
  border-top: 1px solid #e5e7eb;
}

.btn-doc-action {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
}

.btn-preview {
  background: #dc2626;
  color: white;
}

.btn-preview:hover {
  background: #ef4444;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.btn-download {
  background: white;
  color: #dc2626;
  border: 2px solid #dc2626;
  flex: 0 0 auto;
  width: 48px;
  padding: 10px;
}

.btn-download:hover {
  background: #dc2626;
  color: white;
  transform: translateY(-2px);
}

/* Modal de Vista Previa */
@media (max-width: 768px) {
  .doc-card-footer {
    flex-direction: column;
  }
  
  .btn-download {
    width: 100%;
  }
}
</style>
