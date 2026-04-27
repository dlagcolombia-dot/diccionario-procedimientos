/**
 * sidebar.js
 * Toggle del sidebar en móvil
 */
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.sidebar-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    document.body.classList.toggle('sidebar-open');
  });

  document.addEventListener('click', function (e) {
    if (document.body.classList.contains('sidebar-open')) {
      var sidebar = document.querySelector('.sidebar');
      if (sidebar && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
        document.body.classList.remove('sidebar-open');
      }
    }
  });

  var nav = document.querySelector('.sidebar-nav');
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.innerWidth <= 768) {
        document.body.classList.remove('sidebar-open');
      }
    });
  }
});