// Sistema de guía interactiva (Tour)
(function() {
  var tourSteps = [
    {
      title: '¡Bienvenido al Diccionario de Procedimientos! ',
      content: 'Te voy a mostrar cómo usar esta plataforma en solo 4 pasos.',
      target: null,
      position: 'center'
    },
    {
      title: 'Menú de navegación ',
      content: 'Aquí encontrarás todas las secciones: Actas, Manuales, Procedimientos, Glosarios y más. Haz clic en cualquier sección para explorar.',
      target: '.sidebar',
      position: 'right'
    },
    {
      title: 'Búsqueda rápida ',
      content: 'Usa Ctrl + K en cualquier momento para buscar documentos rápidamente. También puedes usar la barra de búsqueda en cada sección.',
      target: '.search',
      position: 'bottom'
    },
    {
      title: 'Favoritos ',
      content: 'Marca documentos importantes como favoritos haciendo clic en la estrella. Podrás filtrarlos después para acceso rápido.',
      target: null,
      position: 'center'
    },
    {
      title: '¡Listo para empezar! ',
      content: 'Ya conoces lo básico. Explora la plataforma y si necesitas ayuda, revisa la sección "Cómo usar".',
      target: null,
      position: 'center'
    }
  ];
  
  var currentStep = 0;
  var tourActive = false;
  
  function hasSeenTour() {
    return localStorage.getItem('tour_completed') === 'true';
  }
  
  function markTourAsCompleted() {
    localStorage.setItem('tour_completed', 'true');
  }
  
  function createTourOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'tour-overlay';
    overlay.className = 'tour-overlay';
    document.body.appendChild(overlay);
    
    var modal = document.createElement('div');
    modal.id = 'tour-modal';
    modal.className = 'tour-modal';
    document.body.appendChild(modal);
    
    return { overlay: overlay, modal: modal };
  }
  
  function showStep(stepIndex) {
    if (stepIndex >= tourSteps.length) {
      endTour();
      return;
    }
    
    var step = tourSteps[stepIndex];
    var modal = document.getElementById('tour-modal');
    
    if (!modal) return;
    
    // Siempre centrar el modal
    modal.className = 'tour-modal';
    
    // Contenido del modal
    modal.innerHTML = 
      '<div class="tour-header">' +
        '<h3>' + step.title + '</h3>' +
        '<button class="tour-close" onclick="window.endTour()"><i class="bi bi-x-lg"></i></button>' +
      '</div>' +
      '<div class="tour-body">' +
        '<p>' + step.content + '</p>' +
      '</div>' +
      '<div class="tour-footer">' +
        '<div class="tour-progress">' +
          '<span>' + (stepIndex + 1) + ' de ' + tourSteps.length + '</span>' +
        '</div>' +
        '<div class="tour-buttons">' +
          (stepIndex > 0 ? '<button class="btn btn-secondary btn-sm" onclick="window.prevTourStep()">Anterior</button>' : '') +
          '<button class="btn btn-primary btn-sm" onclick="window.nextTourStep()">' + 
            (stepIndex === tourSteps.length - 1 ? 'Finalizar' : 'Siguiente') +
          '</button>' +
        '</div>' +
      '</div>';
    
    modal.classList.add('active');
  }
  
  function clearHighlights() {
    var highlights = document.querySelectorAll('.tour-highlight');
    highlights.forEach(function(el) {
      el.classList.remove('tour-highlight');
    });
  }
  
  function startTour() {
    if (tourActive) return;
    
    tourActive = true;
    currentStep = 0;
    createTourOverlay();
    showStep(0);
  }
  
  function endTour() {
    tourActive = false;
    markTourAsCompleted();
    
    var overlay = document.getElementById('tour-overlay');
    var modal = document.getElementById('tour-modal');
    
    if (overlay) overlay.remove();
    if (modal) modal.remove();
    
    clearHighlights();
  }
  
  function nextTourStep() {
    clearHighlights();
    currentStep++;
    showStep(currentStep);
  }
  
  function prevTourStep() {
    clearHighlights();
    currentStep--;
    showStep(currentStep);
  }
  
  // Exponer funciones globalmente
  window.startTour = startTour;
  window.endTour = endTour;
  window.nextTourStep = nextTourStep;
  window.prevTourStep = prevTourStep;
})();
