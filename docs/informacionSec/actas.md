# 📋 Actas

<div class="search-bar">
  <input type="text" id="search-actas" placeholder="🔍 Buscar acta..." class="search-input" />
  <select id="sort-actas" class="sort-select">
    <option value="asc">📅 Más antiguo primero</option>
    <option value="desc">📅 Más reciente primero</option>
  </select>
</div>

<div class="upload-bar">
  <button class="btn-abrir-form" onclick="toggleForm()">➕ Agregar Acta</button>
</div>

<div id="upload-form" class="upload-form" style="display:none">
  <h3>📤 Subir nueva Acta</h3>
  <div class="form-grid">
    <div class="form-group">
      <label>Título *</label>
      <input type="text" id="input-titulo" placeholder="Ej: Acta Reunión Febrero 2026" />
    </div>
    <div class="form-group">
      <label>Descripción</label>
      <input type="text" id="input-desc" placeholder="Breve descripción del acta" />
    </div>
    <div class="form-group">
      <label>Archivo PDF *</label>
      <input type="file" id="input-pdf" accept=".pdf" />
    </div>
  </div>
  <div class="form-actions">
    <button class="btn-cancelar" onclick="toggleForm()">Cancelar</button>
    <button class="btn-subir" onclick="subirDoc('actas')">📤 Subir</button>
  </div>
  <div id="upload-msg" class="upload-msg"></div>
</div>

<div id="actas-grid" class="cards-grid"></div>

<div id="pdf-modal" class="modal-overlay" onclick="closePreview(event)">
  <div class="modal-box">
    <div class="modal-header">
      <button class="btn-volver" onclick="closeModal()">← Volver</button>
      <span id="modal-title">Vista Previa</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <iframe id="modal-iframe" src="" frameborder="0"></iframe>
    </div>
  </div>
</div>

<style>
.search-bar {
  margin: 16px 0;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
.search-input {
  flex: 1;
  min-width: 200px;
  max-width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  font-family: inherit;
  transition: border-color 0.3s;
  box-sizing: border-box;
}
.search-input:focus {
  border-color: #2c3e50;
  box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
}
.sort-select {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  font-family: inherit;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;
  box-sizing: border-box;
  min-width: 180px;
}
.sort-select:focus {
  border-color: #2c3e50;
  box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
}
@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .search-input {
    width: 100%;
    min-width: 100%;
  }
  .sort-select {
    width: 100%;
  }
}
.upload-bar { margin: 16px 0; }
.btn-abrir-form {
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.2s;
}
.btn-abrir-form:hover { opacity: 0.85; }
.upload-form {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}
.upload-form h3 { margin: 0 0 16px 0; font-size: 15px; color: #1f2937; border-bottom: none !important; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group:last-child { grid-column: 1 / -1; }
.form-group label { font-size: 12px; font-weight: 600; color: #6b7280; }
.form-group input {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 7px;
  font-size: 13px;
  outline: none;
  font-family: inherit;
}
.form-group input:focus { border-color: #2c3e50; }
.form-actions { display: flex; gap: 10px; margin-top: 16px; justify-content: flex-end; }
.btn-cancelar {
  padding: 8px 18px;
  background: #f3f4f6;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}
.btn-subir {
  padding: 8px 18px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: opacity 0.2s;
}
.btn-subir:hover { opacity: 0.85; }
.upload-msg { margin-top: 10px; font-size: 13px; padding: 8px 12px; border-radius: 6px; display: none; }
.upload-msg.ok { background: #dcfce7; color: #166534; display: block; }
.upload-msg.err { background: #fee2e2; color: #dc2626; display: block; }
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 8px;
}
.doc-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: box-shadow 0.2s, transform 0.2s;
}
.doc-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.1); transform: translateY(-2px); }
.doc-icon { font-size: 36px; }
.doc-info h3 { margin: 0 0 6px 0; font-size: 15px; color: #1f2937; line-height: 1.4; border-bottom: none !important; }
.doc-info p { margin: 0 0 4px 0; font-size: 13px; color: #6b7280; line-height: 1.5; }
.doc-date { font-size: 11px; color: #9ca3af; }
.doc-actions { display: flex; gap: 10px; margin-top: auto; }
.btn-preview {
  flex: 1; padding: 8px 12px; background: #2c3e50; color: white;
  border: none; border-radius: 7px; cursor: pointer; font-size: 13px;
  font-weight: 600; transition: opacity 0.2s;
}
.btn-preview:hover { opacity: 0.85; }
.btn-download {
  flex: 1; padding: 8px 12px; background: #f3f4f6; color: #374151;
  border-radius: 7px; text-decoration: none !important; font-size: 13px;
  font-weight: 600; text-align: center; transition: background 0.2s;
}
.btn-download:hover { background: #e5e7eb; }
.btn-eliminar {
  padding: 8px 12px; background: #fee2e2; color: #dc2626;
  border: none; border-radius: 7px; cursor: pointer; font-size: 13px;
  font-weight: 600; transition: background 0.2s;
}
.btn-eliminar:hover { background: #fecaca; }
.empty-state { text-align: center; padding: 40px; color: #9ca3af; font-size: 14px; }
.modal-overlay {
  display: none; position: fixed; top: 0; left: 0;
  width: 100%; height: 100%; background: rgba(0,0,0,0.6);
  z-index: 9999; align-items: center; justify-content: center;
}
.modal-overlay.active { display: flex; }
.modal-box {
  background: #fff; border-radius: 12px; width: 90%; max-width: 900px;
  height: 85vh; display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; border-bottom: 1px solid #e5e7eb; gap: 12px;
}
.btn-volver {
  background: #f3f4f6; border: none; border-radius: 7px; padding: 7px 14px;
  cursor: pointer; font-size: 13px; font-weight: 600; color: #374151; white-space: nowrap;
}
.btn-volver:hover { background: #e5e7eb; }
#modal-title { flex: 1; font-weight: 700; font-size: 14px; color: #1f2937; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.modal-close {
  background: #fee2e2; border: none; border-radius: 6px; width: 32px; height: 32px;
  cursor: pointer; font-size: 14px; color: #dc2626; font-weight: 700;
}
.modal-close:hover { background: #fecaca; }
.modal-body { flex: 1; overflow: hidden; }
.modal-body iframe { width: 100%; height: 100%; }
@media (max-width: 768px) {
  .form-grid { grid-template-columns: 1fr; }
  .cards-grid { grid-template-columns: 1fr; }
  .modal-box { width: 100%; height: 100%; border-radius: 0; }
}
</style>

<script>
(function() {
  var API = (window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://diccionario-backend-ahtd.onrender.com') + '/api/actas';
  var allDocs = [];

  function toggleForm() {
    var f = document.getElementById('upload-form');
    if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
    var msg = document.getElementById('upload-msg');
    if (msg) { msg.className = 'upload-msg'; msg.textContent = ''; }
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
        grid.innerHTML = '<div class="empty-state">⚠️ No se pudo conectar al servidor.</div>';
      });
  }

  function renderDocs(docs) {
    var grid = document.getElementById('actas-grid');
    if (!grid) return;
    
    if (!docs.length) {
      grid.innerHTML = '<div class="empty-state">📭 No hay actas todavía. ¡Sube la primera!</div>';
      return;
    }
    
    // Obtener orden seleccionado
    var sortOrder = document.getElementById('sort-actas').value;
    
    // Ordenar según la selección
    docs.sort(function(a, b) { 
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    });
    
    grid.innerHTML = docs.map(function(d) {
      return '<div class="doc-card">' +
        '<div class="doc-icon">📄</div>' +
        '<div class="doc-info">' +
          '<h3>' + d.titulo + '</h3>' +
          (d.descripcion ? '<p>' + d.descripcion + '</p>' : '') +
          '<div class="doc-date">📅 Agregado: ' + d.fecha + '</div>' +
        '</div>' +
        '<div class="doc-actions">' +
          '<button class="btn-preview" onclick="openPreview(\'' + d.archivo + '\', \'' + d.titulo.replace(/'/g, "\\'") + '\')">👁️ Vista Previa</button>' +
          '<a class="btn-download" href="' + d.archivo + '" download>📥 Descargar</a>' +
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
      msg.className = 'upload-msg err';
      msg.textContent = '⚠️ El título y el PDF son obligatorios.';
      return;
    }

    var form = new FormData();
    form.append('titulo', titulo);
    form.append('descripcion', desc);
    form.append('pdf', pdf);

    var btn = document.querySelector('.btn-subir');
    btn.textContent = 'Subiendo...';
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
        msg.className = 'upload-msg ok';
        msg.textContent = '✅ Acta subida correctamente!';
        document.getElementById('input-titulo').value = '';
        document.getElementById('input-desc').value = '';
        document.getElementById('input-pdf').value = '';
        cargarDocs();
        setTimeout(function() { toggleForm(); }, 1500);
      })
      .catch(function(e) {
        msg.className = 'upload-msg err';
        msg.textContent = '⚠️ Error: ' + e.message;
      })
      .finally(function() {
        btn.textContent = '📤 Subir';
        btn.disabled = false;
      });
  };

  window.eliminarDoc = function(id) {
    if (!confirm('¿Seguro que quieres eliminar este documento?')) return;
    fetch(API + '/' + id, { 
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      }
    })
      .then(function(r) { return r.json(); })
      .then(function() { cargarDocs(); })
      .catch(function() { alert('Error al eliminar el documento.'); });
  };

  // Función de búsqueda
  function buscarActas() {
    var searchTerm = document.getElementById('search-actas').value.toLowerCase();
    var filtered = allDocs.filter(function(doc) {
      return doc.titulo.toLowerCase().includes(searchTerm) || 
             (doc.descripcion && doc.descripcion.toLowerCase().includes(searchTerm));
    });
    renderDocs(filtered);
  }

  // Event listeners
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

  // Funciones del modal
  window.openPreview = function(url, titulo) {
    var modal = document.getElementById('pdf-modal');
    var iframe = document.getElementById('modal-iframe');
    var modalTitle = document.getElementById('modal-title');
    
    if (modal && iframe && modalTitle) {
      modalTitle.textContent = titulo;
      // Modificar URL de Cloudinary para forzar visualización inline
      var viewUrl = url.replace('/upload/', '/upload/fl_attachment:false/');
      iframe.src = viewUrl;
      modal.classList.add('active');
    }
  };

  window.closeModal = function() {
    var modal = document.getElementById('pdf-modal');
    var iframe = document.getElementById('modal-iframe');
    
    if (modal && iframe) {
      modal.classList.remove('active');
      iframe.src = '';
    }
  };

  window.closePreview = function(event) {
    if (event.target.id === 'pdf-modal') {
      closeModal();
    }
  };

  // Cargar al iniciar
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
