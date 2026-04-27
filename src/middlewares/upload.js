const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Solo se permiten archivos PDF'));
  },
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB máx
});

module.exports = upload;
