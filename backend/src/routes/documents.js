const express = require('express');
const fs = require('fs');
const path = require('path');
const DocumentController = require('../controllers/documentController');
const { requireAuth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { isValidTermino, isValidDefinicion } = require('../utils/validators');

const router = express.Router();
const glossaryFile = path.join(__dirname, '..', '..', 'data', 'glossary-proposals.json');

router.post('/glosario/propuestas', requireAuth, (req, res) => {
  try {
    const { termino, definicion, categoria } = req.body;

    if (!termino || !definicion) {
      return res.status(400).json({ error: 'El término y la definición son obligatorios' });
    }

    if (!isValidTermino(termino)) {
      return res.status(400).json({ error: 'Término inválido. Use entre 2 y 100 caracteres, sin caracteres especiales.' });
    }

    if (!isValidDefinicion(definicion)) {
      return res.status(400).json({ error: 'La definición debe tener entre 5 y 500 caracteres.' });
    }

    fs.mkdirSync(path.dirname(glossaryFile), { recursive: true });

    let propuestas = [];
    if (fs.existsSync(glossaryFile)) {
      propuestas = JSON.parse(fs.readFileSync(glossaryFile, 'utf8'));
    }

    propuestas.push({
      id: Date.now(),
      termino,
      definicion,
      categoria: categoria || 'general',
      fecha: new Date().toISOString()
    });

    fs.writeFileSync(glossaryFile, JSON.stringify(propuestas, null, 2));
    res.status(201).json({ ok: true, propuesta: propuestas[propuestas.length - 1] });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo guardar la propuesta' });
  }
});

module.exports = router;
