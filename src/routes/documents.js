const express = require('express');
const DocumentController = require('../controllers/documentController');
const { requireAuth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/pdf-proxy', DocumentController.pdfProxy);
router.get('/:modulo', DocumentController.getAll);
router.post('/:modulo', requireAuth, upload.single('pdf'), DocumentController.create);
router.delete('/:modulo/:id', requireAuth, DocumentController.delete);

module.exports = router;
