const MODULOS_VALIDOS = ['actas', 'manuales', 'procedimientos'];

function isValidModule(modulo) {
  return MODULOS_VALIDOS.includes(modulo);
}

module.exports = { MODULOS_VALIDOS, isValidModule };
