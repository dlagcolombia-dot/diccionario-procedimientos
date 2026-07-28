const Document = require('../models/Document');
const cloudinary = require('../config/cloudinary');
const { today } = require('../utils/dateHelper');
const { isValidModule, isValidTitulo, isValidDescripcion } = require('../utils/validators');

class DocumentController {
  static async getAll(req, res) {
    const { modulo } = req.params;
    
    if (!isValidModule(modulo)) {
      return res.status(400).json({ error: 'Módulo no válido' });
    }
    
    try {
      const docs = await Document.findAll(modulo);
      res.json(docs);
    } catch (error) {
      console.error('Error leyendo datos:', error);
      res.status(500).json({ error: 'Error al obtener documentos' });
    }
  }

  static async create(req, res) {
    const { modulo } = req.params;

    if (!isValidModule(modulo)) {
      return res.status(400).json({ error: 'Módulo no válido' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ningún PDF' });
    }

    const { titulo, descripcion, area } = req.body;

    if (!titulo) {
      return res.status(400).json({ error: 'El título es obligatorio' });
    }

    if (!isValidTitulo(titulo)) {
      return res.status(400).json({ error: 'Título inválido. Use entre 3 y 150 caracteres, sin caracteres especiales.' });
    }

    if (!isValidDescripcion(descripcion)) {
      return res.status(400).json({ error: 'La descripción no puede superar 300 caracteres.' });
    }

    // Validar que el archivo sea PDF
    if (req.file.mimetype !== 'application/pdf' && !req.file.originalname.match(/\.pdf$/i)) {
      return res.status(400).json({ error: 'Solo se permiten archivos PDF.' });
    }

    // Máximo 20 MB
    if (req.file.size > 20 * 1024 * 1024) {
      return res.status(400).json({ error: 'El archivo no puede superar 20 MB.' });
    }

    try {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `diccionario/${modulo}`,
          resource_type: 'raw',
          public_id: req.file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.\-_]/g, '').replace('.pdf', ''),
          format: 'pdf',
          access_mode: 'public',
          type: 'upload'
        },
        async (error, result) => {
          if (error) {
            console.error('Error subiendo a Cloudinary:', error);
            return res.status(500).json({ error: 'Error al subir el archivo' });
          }

          const signedUrl = cloudinary.url(result.public_id, {
            resource_type: 'raw',
            type: 'upload',
            sign_url: true,
            secure: true,
            format: 'pdf'
          });

          const nuevoDoc = {
            id: Date.now(),
            titulo,
            descripcion: descripcion || '',
            area: area || 'General',
            archivo: signedUrl || result.secure_url,
            cloudinary_id: result.public_id,
            fecha: today()
          };

          try {
            await Document.create(modulo, nuevoDoc);
            console.log(`[${modulo.toUpperCase()}] Nuevo documento: ${titulo}`);
            res.status(201).json({ mensaje: 'Documento subido correctamente', doc: nuevoDoc });
          } catch (err) {
            console.error('Error guardando en MongoDB:', err);
            res.status(500).json({ error: 'Error al guardar el documento' });
          }
        }
      );

      uploadStream.end(req.file.buffer);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error al procesar el archivo' });
    }
  }

  static async delete(req, res) {
    const { modulo, id } = req.params;

    if (!isValidModule(modulo)) {
      return res.status(400).json({ error: 'Módulo no válido' });
    }

    try {
      const doc = await Document.findById(modulo, id);

      if (!doc) {
        return res.status(404).json({ error: 'Documento no encontrado' });
      }

      if (doc.cloudinary_id) {
        try {
          await cloudinary.uploader.destroy(doc.cloudinary_id, { resource_type: 'raw', invalidate: true });
        } catch (e) {
          try {
            await cloudinary.uploader.destroy(doc.cloudinary_id, { resource_type: 'image', invalidate: true });
          } catch (e2) {
            console.log('No se pudo eliminar de Cloudinary, puede que ya no exista');
          }
        }
        console.log(`[${modulo.toUpperCase()}] Eliminado de Cloudinary: ${doc.cloudinary_id}`);
      }

      await Document.delete(modulo, id);
      res.json({ mensaje: 'Documento eliminado correctamente' });
    } catch (error) {
      console.error('Error eliminando documento:', error);
      res.status(500).json({ error: 'Error al eliminar el documento' });
    }
  }

}

module.exports = DocumentController;
