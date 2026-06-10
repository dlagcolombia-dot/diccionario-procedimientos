// auth.js - Sistema de autenticación compartido

// URL del backend
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001'
  : 'https://diccionario-backend-ahtd.onrender.com';

// Obtener token del localStorage
function getAuthToken() {
  return localStorage.getItem('authToken');
}

// Obtener usuario del localStorage
function getUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// Obtener rol del usuario
function getUserRole() {
  const user = getUser();
  return user ? user.role : 'visitante';
}

// Verificar si está autenticado
function isAuthenticated() {
  return !!getAuthToken();
}

// Verificar permisos según rol
function hasPermission(action) {
  const role = getUserRole();
  
  const permissions = {
    visitante: ['view'],
    colaborador: ['view', 'download', 'upload', 'favorite'],
    admin: ['view', 'download', 'upload', 'favorite', 'delete']
  };
  
  return permissions[role]?.includes(action) || false;
}

// Cerrar sesión
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/login.html';
}

// Redirigir al login si no está autenticado
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}

// Hacer petición autenticada
async function authenticatedFetch(url, options = {}) {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No autenticado');
  }
  
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`
  };
  
  const response = await fetch(url, {
    ...options,
    headers
  });
  
  // Si el token expiró, redirigir al login
  if (response.status === 401) {
    logout();
    throw new Error('Sesión expirada');
  }
  
  return response;
}

// Mostrar/ocultar botones según autenticación y rol
function updateUIForAuth() {
  const isAuth = isAuthenticated();
  const user = getUser();
  const role = getUserRole();
  
  // Ocultar botones de agregar si no tiene permiso
  const addButtons = document.querySelectorAll('[onclick*="toggle"]');
  addButtons.forEach(btn => {
    if (btn.textContent.includes('Agregar')) {
      btn.style.display = hasPermission('upload') ? 'inline-block' : 'none';
    }
  });
  
  // Ocultar botones de descargar si no tiene permiso
  const downloadButtons = document.querySelectorAll('.btn-download');
  downloadButtons.forEach(btn => {
    if (!hasPermission('download')) {
      btn.style.display = 'none';
    }
  });
  
  // Agregar botón de logout/login
  if (isAuth && user) {
    addLogoutButton(user, role);
  } else {
    addLoginButton();
  }
}

// Agregar botón de logout
function addLogoutButton(user, role) {
  // Verificar si ya existe
  if (document.getElementById('auth-info')) return;
  
  const roleLabels = {
    admin: '👑 Admin',
    colaborador: '👤 Colaborador',
    visitante: '👁️ Visitante'
  };
  
  const authInfo = document.createElement('div');
  authInfo.id = 'auth-info';
  authInfo.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
  `;
  
  authInfo.innerHTML = `
    <span style="color: #374151; font-weight: 600;">${roleLabels[role] || '👤'} ${user.username}</span>
    <button onclick="logout()" style="
      background: #dc2626;
      color: white;
      border: none;
      padding: 5px 12px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
    ">Cerrar Sesión</button>
  `;
  
  document.body.appendChild(authInfo);
}

// Agregar botón de login
function addLoginButton() {
  // Verificar si ya existe
  if (document.getElementById('auth-info')) return;
  
  const authInfo = document.createElement('div');
  authInfo.id = 'auth-info';
  authInfo.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
  `;
  
  authInfo.innerHTML = `
    <button onclick="window.location.href='/login.html'" style="
      background: #2c3e50;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
    ">🔐 Iniciar Sesión</button>
  `;
  
  document.body.appendChild(authInfo);
}

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
  // NO forzar login automáticamente, permitir navegación sin autenticación
  // Solo se pedirá login al intentar subir o eliminar documentos
  updateUIForAuth();
});

// Exportar funciones globalmente
window.auth = {
  getAuthToken,
  getUser,
  getUserRole,
  hasPermission,
  isAuthenticated,
  logout,
  requireAuth,
  authenticatedFetch,
  updateUIForAuth,
  API_URL
};
