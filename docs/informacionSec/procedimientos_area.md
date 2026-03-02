# 📄 Procedimientos

<div class="upload-bar">
  <button class="btn-abrir-form" onclick="toggleFormProc()">➕ Agregar Procedimiento</button>
</div>

<div id="upload-form-proc" class="upload-form-proc" style="display:none">
  <h3>📤 Subir nueva Procedimiento</h3>
  <div class="form-grid">
    <div class="form-group">
      <label>Título *</label>
      <input type="text" id="input-titulo-p" placeholder="Ej: Procedimiento Reunión Febrero 2026" />
    </div>
    <div class="form-group">
      <label>Descripción</label>
      <input type="text" id="input-desc-p" placeholder="Breve descripción del acta" />
    </div>
    <div class="form-group">
      <label>Archivo PDF *</label>
      <input type="file" id="input-pdf-p" accept=".pdf" />
    </div>
  </div>
  <div class="form-actions">
    <button class="btn-cancelar" onclick="toggleFormProc()">Cancelar</button>
    <button class="btn-subir" onclick="subirDoc('procedimientos')">📤 Subir</button>
  </div>
  <div id="upload-msg-proc" class="upload-msg-proc"></div>
</div>

<div id="procedimientos-grid" class="cards-grid"></div>

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
.upload-form-proc {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}
.upload-form-proc h3 { margin: 0 0 16px 0; font-size: 15px; color: #1f2937; border-bottom: none !important; }
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
.upload-msg-proc { margin-top: 10px; font-size: 13px; padding: 8px 12px; border-radius: 6px; display: none; }
.upload-msg-proc.ok { background: #dcfce7; color: #166534; display: block; }
.upload-msg-proc.err { background: #fee2e2; color: #dc2626; display: block; }
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
  var API = (window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://diccionario-backend-ahtd.onrender.com') + '/api/procedimientos';

  function toggleFormProc() {
    var f = document.getElementById('upload-form-proc');
    if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
    var msg = document.getElementById('upload-msg-proc');
    if (msg) { msg.className = 'upload-msg-proc'; msg.textContent = ''; }
  }
  window.toggleFormProc = toggleFormProc;

  function cargarDocs() {
    var grid = document.getElementById('procedimientos-grid');
    if (!grid) return;
    fetch(API)
      .then(function(r) { return r.json(); })
      .then(function(docs) {
        if (!docs.length) {
          grid.innerHTML = '<div class="empty-state">📭 No hay procedimientos todavía. ¡Sube la primera!</div>';
          return;
        }
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
              '<button class="btn-eliminar" onclick="eliminarDoc(' + d.id + ')">🗑️</button>' +
            '</div>' +
          '</div>';
        }).join('');
      })
      .catch(function() {
        grid.innerHTML = '<div class="empty-state">⚠️ No se pudo conectar al servidor.</div>';
      });
  }

  window.subirDoc = function(modulo) {
    var titulo = document.getElementById('input-titulo-p').value.trim();
    var desc   = document.getElementById('input-desc-p').value.trim();
    var pdf    = document.getElementById('input-pdf-p').files[0];
    var msg    = document.getElementById('upload-msg-proc');

    if (!titulo || !pdf) {
      msg.className = 'upload-msg-proc err';
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

    fetch(API, { method: 'POST', body: form })
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res.error) throw new Error(res.error);
        msg.className = 'upload-msg-proc ok';
        msg.textContent = '✅ Procedimiento subida correctamente!';
        document.getElementById('input-titulo-p').value = '';
        document.getElementById('input-desc-p').value = '';
        document.getElementById('input-pdf-p').value = '';
        cargarDocs();
        setTimeout(function() { toggleFormProc(); }, 1500);
      })
      .catch(function(e) {
        msg.className = 'upload-msg-proc err';
        msg.textContent = '❌ Error: ' + e.message;
      })
      .finally(function() {
        btn.textContent = '📤 Subir';
        btn.disabled = false;
      });
  };

  window.eliminarDoc = function(id) {
    if (!confirm('¿Seguro que quieres eliminar este documento?')) return;
    fetch(API + '/' + id, { method: 'DELETE' })
      .then(function(r) { return r.json(); })
      .then(function() { cargarDocs(); })
      .catch(function() { alert('Error al eliminar el documento.'); });
  };

  // Cargar al iniciar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarDocs);
  } else {
    cargarDocs();
  }
  setTimeout(cargarDocs, 300);
})();
</script>