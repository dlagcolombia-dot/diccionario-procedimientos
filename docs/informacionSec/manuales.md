# 📚 Manuales

<div class="cards-grid">

  <div class="doc-card">
    <div class="doc-icon">🤖</div>
    <div class="doc-info">
      <h3>Manual Cierre Bot</h3>
      <p>Manual de procedimientos para el cierre correcto del Bot del área de innovación.</p>
      <div class="doc-date">📅 Agregado: 23/02/2026</div>
    </div>
    <div class="doc-actions">
      <button class="btn-preview" onclick="openPreview('pdfs/Manual-Cierre-Bot.pdf', 'Manual Cierre Bot')">👁️ Vista Previa</button>
      <a class="btn-download" href="pdfs/Manual-Cierre-Bot.pdf" download>📥 Descargar</a>
    </div>
  </div>

  <div class="doc-card">
    <div class="doc-icon">📘</div>
    <div class="doc-info">
      <h3>Manual de Usuario Modulo Back UMM</h3>
      <p>Manual de usuario para el módulo Back UMM, con instrucciones detalladas de uso.</p>
      <div class="doc-date">📅 Agregado: 23/02/2026</div>
    </div>
    <div class="doc-actions">
      <button class="btn-preview" onclick="openPreview('pdfs/Manual-de-Usuario-Modulo-Back-UMM-1pptx.pdf', 'Manual de Usuario Modulo Back UMM')">👁️ Vista Previa</button>
      <a class="btn-download" href="pdfs/Manual-de-Usuario-Modulo-Back-UMM-1pptx.pdf" download>📥 Descargar</a>
    </div>
  </div>

</div>

<!-- Modal vista previa -->
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
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 24px;
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
.doc-card:hover {
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}
.doc-icon { font-size: 36px; }
.doc-info h3 {
  margin: 0 0 8px 0;
  font-size: 15px;
  color: #1f2937;
  line-height: 1.4;
  border-bottom: none !important;
}
.doc-info p {
  margin: 0 0 6px 0;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
}
.doc-date {
  font-size: 11px;
  color: #9ca3af;
}
.doc-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}
.btn-preview {
  flex: 1;
  padding: 8px 12px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: opacity 0.2s;
}
.btn-preview:hover { opacity: 0.85; }
.btn-download {
  flex: 1;
  padding: 8px 12px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 7px;
  text-decoration: none !important;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  transition: background 0.2s;
}
.btn-download:hover { background: #e5e7eb; }
.modal-overlay {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  z-index: 9999;
  align-items: center;
  justify-content: center;
}
.modal-overlay.active { display: flex; }
.modal-box {
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 900px;
  height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  gap: 12px;
}
.btn-volver {
  background: #f3f4f6;
  border: none;
  border-radius: 7px;
  padding: 7px 14px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  transition: background 0.2s;
  white-space: nowrap;
}
.btn-volver:hover { background: #e5e7eb; }
#modal-title {
  flex: 1;
  font-weight: 700;
  font-size: 14px;
  color: #1f2937;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.modal-close {
  background: #fee2e2;
  border: none;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 14px;
  color: #dc2626;
  font-weight: 700;
  transition: background 0.2s;
}
.modal-close:hover { background: #fecaca; }
.modal-body { flex: 1; overflow: hidden; }
.modal-body iframe { width: 100%; height: 100%; }
@media (max-width: 768px) {
  .cards-grid { grid-template-columns: 1fr; }
  .modal-box { width: 100%; height: 100%; border-radius: 0; }
}
</style>


