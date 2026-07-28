const MODULOS_VALIDOS = ['actas', 'manuales', 'procedimientos'];

function isValidModule(modulo) {
  return MODULOS_VALIDOS.includes(modulo);
}

// Título: 3-150 caracteres, letras, números, espacios y -_.()
function isValidTitulo(titulo) {
  return typeof titulo === 'string' && /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_.()]{3,150}$/.test(titulo.trim());
}

// Descripción: opcional, máximo 300 caracteres
function isValidDescripcion(desc) {
  if (!desc) return true;
  return typeof desc === 'string' && desc.length <= 300;
}

// Término de glosario: 2-100 caracteres
function isValidTermino(termino) {
  return typeof termino === 'string' && /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_./()]{2,100}$/.test(termino.trim());
}

// Definición de glosario: 5-500 caracteres
function isValidDefinicion(def) {
  return typeof def === 'string' && def.trim().length >= 5 && def.trim().length <= 500;
}

module.exports = { MODULOS_VALIDOS, isValidModule, isValidTitulo, isValidDescripcion, isValidTermino, isValidDefinicion };
