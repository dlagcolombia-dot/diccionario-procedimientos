

function openPreview(url, title) {
  var modal = document.getElementById('pdf-modal');
  if (!modal) return;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-iframe').src = url;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
 
function closeModal() {
  var modal = document.getElementById('pdf-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.getElementById('modal-iframe').src = '';
  document.body.style.overflow = '';
}
 
function closePreview(event) {
  if (event.target === document.getElementById('pdf-modal')) closeModal();
}
 