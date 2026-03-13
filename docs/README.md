<div class="page-header">
  <h1 class="page-title">
    <i class="bi bi-journal-bookmark-fill"></i>
    Diccionario de Procedimientos
  </h1>
  <p class="page-subtitle">Sistema unificado de documentación del Área de Innovación</p>
</div>

<div class="stats-section">
  <div class="stat-card">
    <i class="bi bi-book-fill stat-icon"></i>
    <div class="stat-number" id="stat-manuales">-</div>
    <div class="stat-label">Manuales</div>
  </div>
  <div class="stat-card">
    <i class="bi bi-file-earmark-text-fill stat-icon"></i>
    <div class="stat-number" id="stat-actas">-</div>
    <div class="stat-label">Actas</div>
  </div>
  <div class="stat-card">
    <i class="bi bi-list-check stat-icon"></i>
    <div class="stat-number" id="stat-procedimientos">-</div>
    <div class="stat-label">Procedimientos</div>
  </div>
</div>

<div class="features-section">
  <h2 class="section-title">
    <i class="bi bi-star-fill"></i> ¿Qué puedes hacer aquí?
  </h2>
  
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon">
        <i class="bi bi-search"></i>
      </div>
      <h3>Búsqueda Rápida</h3>
      <p>Encuentra cualquier documento en segundos usando nuestra barra de búsqueda inteligente.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <i class="bi bi-folder-fill"></i>
      </div>
      <h3>Organización Clara</h3>
      <p>Documentos organizados por categorías: manuales, actas y procedimientos del área.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <i class="bi bi-eye-fill"></i>
      </div>
      <h3>Vista Previa</h3>
      <p>Visualiza los PDFs directamente en el navegador sin necesidad de descargarlos.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <i class="bi bi-cloud-arrow-up-fill"></i>
      </div>
      <h3>Gestión Fácil</h3>
      <p>Sube, actualiza y elimina documentos de forma sencilla con permisos de administrador.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <i class="bi bi-book"></i>
      </div>
      <h3>Glosarios Técnicos</h3>
      <p>Consulta términos técnicos e institucionales para entender mejor los procedimientos.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <i class="bi bi-arrow-clockwise"></i>
      </div>
      <h3>Siempre Actualizado</h3>
      <p>Accede a la versión más reciente de cada documento con historial de actualizaciones.</p>
    </div>
  </div>
</div>

<div class="quick-start-section">
  <h2 class="section-title">
    <i class="bi bi-rocket-takeoff-fill"></i> Comienza Aquí
  </h2>
  
  <div class="quick-start-steps">
    <div class="step-card">
      <div class="step-number">1</div>
      <h3>Explora el Menú</h3>
      <p>Usa el menú lateral izquierdo para navegar entre las diferentes secciones.</p>
    </div>
    
    <div class="step-card">
      <div class="step-number">2</div>
      <h3>Busca Documentos</h3>
      <p>Utiliza la barra de búsqueda superior o los filtros en cada sección.</p>
    </div>
    
    <div class="step-card">
      <div class="step-number">3</div>
      <h3>Visualiza y Descarga</h3>
      <p>Haz clic en cualquier documento para verlo o descargarlo a tu dispositivo.</p>
    </div>
  </div>
</div>

<div class="tip-section">
  <i class="bi bi-lightbulb-fill"></i>
  <div>
    <strong>Consejo:</strong> Usa <kbd>Ctrl</kbd> + <kbd>K</kbd> para acceder rápidamente a la búsqueda desde cualquier página.
  </div>
</div>

<script>
// Cargar estadísticas
(async function loadStats() {
  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001'
    : 'https://diccionario-backend-ahtd.onrender.com';
  
  try {
    const [manuales, actas, procedimientos] = await Promise.all([
      fetch(`${API_URL}/api/manuales`).then(r => r.json()),
      fetch(`${API_URL}/api/actas`).then(r => r.json()),
      fetch(`${API_URL}/api/procedimientos`).then(r => r.json())
    ]);
    
    document.getElementById('stat-manuales').textContent = manuales.length;
    document.getElementById('stat-actas').textContent = actas.length;
    document.getElementById('stat-procedimientos').textContent = procedimientos.length;
  } catch (error) {
    console.error('Error cargando estadísticas:', error);
    document.getElementById('stat-manuales').textContent = '0';
    document.getElementById('stat-actas').textContent = '0';
    document.getElementById('stat-procedimientos').textContent = '0';
  }
})();
</script>

<style>
.page-header {
  text-align: center;
  margin-bottom: 50px;
  padding: 30px 20px;
}

.page-title {
  font-size: 42px;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.page-title i {
  color: #dc2626;
  font-size: 40px;
}

.page-subtitle {
  font-size: 18px;
  color: #6b7280;
  margin: 0;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 50px;
}

.stat-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.stat-icon {
  font-size: 36px;
  color: #dc2626;
  margin-bottom: 15px;
}

.stat-number {
  font-size: 42px;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-title i {
  color: #dc2626;
}

.features-section {
  margin-bottom: 50px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: all 0.3s;
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  border-color: #dc2626;
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.feature-icon i {
  font-size: 28px;
  color: #dc2626;
}

.feature-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
}

.feature-card p {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
}

.quick-start-section {
  margin-bottom: 50px;
}

.quick-start-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.step-card {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  padding: 30px;
  border-radius: 12px;
  position: relative;
  border: 2px solid #e5e7eb;
}

.step-number {
  position: absolute;
  top: -15px;
  left: 30px;
  width: 40px;
  height: 40px;
  background: #dc2626;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.step-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
  margin-top: 10px;
}

.step-card p {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
}

.tip-section {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  padding: 20px 25px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-left: 4px solid #f59e0b;
  margin-bottom: 30px;
}

.tip-section i {
  font-size: 28px;
  color: #f59e0b;
  flex-shrink: 0;
}

.tip-section kbd {
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid #d97706;
  color: #92400e;
  font-weight: 600;
  display: inline-block;
  min-width: 24px;
  text-align: center;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }
  
  .page-title i {
    font-size: 30px;
  }
  
  .page-subtitle {
    font-size: 16px;
  }
  
  .features-grid,
  .quick-start-steps {
    grid-template-columns: 1fr;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
}
</style>