# <i class="bi bi-question-circle-fill"></i> Cómo usar el diccionario

<p class="lead text-muted">Aprende a navegar y sacar el máximo provecho del sistema.</p>

<div class="row g-4 mt-3">
  <div class="col-12">
    <div class="card border-0 shadow-sm paso-card">
      <div class="card-body p-4">
        <div class="d-flex align-items-start">
          <div class="paso-numero">1</div>
          <div class="flex-grow-1 ms-4">
            <h4 class="fw-bold mb-3"><i class="bi bi-search text-primary me-2"></i>Buscar</h4>
            <p class="text-muted mb-3">Utiliza la <strong>barra de búsqueda</strong> en la parte superior para encontrar cualquier término o procedimiento rápidamente.</p>
            <ul class="list-unstyled">
              <li class="mb-2"><i class="bi bi-arrow-right-circle text-primary me-2"></i>Usa palabras clave cortas (ej: <code>whatsapp</code>, <code>bot</code>, <code>microservicio</code>)</li>
              <li class="mb-2"><i class="bi bi-arrow-right-circle text-primary me-2"></i>La búsqueda no distingue mayúsculas de minúsculas</li>
              <li><i class="bi bi-arrow-right-circle text-primary me-2"></i>Usa <kbd>Ctrl</kbd> + <kbd>F</kbd> dentro de un documento para buscar dentro del mismo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-12">
    <div class="card border-0 shadow-sm paso-card">
      <div class="card-body p-4">
        <div class="d-flex align-items-start">
          <div class="paso-numero">2</div>
          <div class="flex-grow-1 ms-4">
            <h4 class="fw-bold mb-3"><i class="bi bi-list-ul text-success me-2"></i>Navegar</h4>
            <p class="text-muted mb-3">Explora las secciones usando el <strong>menú lateral izquierdo</strong>:</p>
            <ul class="list-unstyled">
              <li class="mb-2"><i class="bi bi-arrow-right-circle text-success me-2"></i>Haz clic en cualquier módulo para expandirlo o colapsarlo</li>
              <li><i class="bi bi-arrow-right-circle text-success me-2"></i>Los módulos con flecha <code>▾</code> tienen subpáginas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-12">
    <div class="card border-0 shadow-sm paso-card">
      <div class="card-body p-4">
        <div class="d-flex align-items-start">
          <div class="paso-numero">3</div>
          <div class="flex-grow-1 ms-4">
            <h4 class="fw-bold mb-3"><i class="bi bi-eye text-info me-2"></i>Consultar</h4>
            <p class="text-muted mb-3">Haz clic en cualquier documento para ver su contenido completo.</p>
            <ul class="list-unstyled">
              <li class="mb-2"><i class="bi bi-arrow-right-circle text-info me-2"></i>Los PDFs se abren en <strong>vista previa</strong> sin salir de la página</li>
              <li><i class="bi bi-arrow-right-circle text-info me-2"></i>Puedes <strong>descargar</strong> cualquier documento con el botón <i class="bi bi-download"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="alert alert-warning mt-4" role="alert">
  <i class="bi bi-lightbulb-fill me-2"></i>
  <strong>Tip:</strong> En móviles usa el ícono <i class="bi bi-list"></i> para abrir el menú lateral.
</div>

<style>
.paso-card {
  transition: all 0.3s ease;
  border: 2px solid transparent !important;
}

.paso-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
  border-color: #b91c1c !important;
}

.paso-numero {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(185, 28, 28, 0.3);
}

kbd {
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid #d1d5db;
  color: #374151;
  font-weight: 600;
}
</style>