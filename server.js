const express = require('express');
const multer  = require('multer');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
const jwt     = require('jsonwebtoken');
const session = require('express-session');
const { findUserByUsername, verifyPassword } = require('./users');
const cloudinary = require('cloudinary').v2;

const app  = express();
const PORT = process.env.PORT || 3001;

// Clave secreta para JWT (cámbiala en producción)
const JWT_SECRET = process.env.JWT_SECRET || 'tu-clave-secreta-super-segura-cambiala';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'deb471c7g',
  api_key: process.env.CLOUDINARY_API_KEY || '779756674255571',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Tzo9FmvfsQL0eENqRfn-g8q4Apc'
});

// ── Rutas base ──────────────────────────────────────────────
const DOCS_DIR = path.join(__dirname, 'docs');
const PDFS_DIR = path.join(DOCS_DIR, 'pdfs');
const DATA_DIR = path.join(__dirname, 'data');

// Crear carpetas si no existen
[PDFS_DIR, DATA_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ── Middlewares ─────────────────────────────────────────────
// CORS configuración permisiva
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(cors());
app.use(express.json());
app.use(session({
  secret: JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));
app.use(express.static(DOCS_DIR)); // Sirve Docsify

// ── Middleware de autenticación ─────────────────────────────
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No autorizado. Inicia sesión primero.' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado.' });
  }
}

// ── Ruta de LOGIN ───────────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
  }
  
  const user = findUserByUsername(username);
  
  if (!user || !verifyPassword(password, user.password)) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }
  
  // Crear token JWT
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({
    mensaje: 'Login exitoso',
    token,
    user: { id: user.id, username: user.username, role: user.role }
  });
});

// ── Ruta para verificar sesión ──────────────────────────────
app.get('/api/verify', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// ── Multer: usar memoria para subir a Cloudinary ───────────────────────
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Solo se permiten archivos PDF'));
  },
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB máx
});

// ── Helpers JSON ─────────────────────────────────────────────
function getDataFile(modulo) {
  return path.join(DATA_DIR, `${modulo}.json`);
}

function readData(modulo) {
  const file = getDataFile(modulo);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeData(modulo, data) {
  fs.writeFileSync(getDataFile(modulo), JSON.stringify(data, null, 2));
}

function today() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// ── MÓDULOS válidos ──────────────────────────────────────────
const MODULOS_VALIDOS = ['actas', 'manuales', 'procedimientos'];

// ── GET /api/:modulo → listar documentos ────────────────────
app.get('/api/:modulo', (req, res) => {
  const { modulo } = req.params;
  if (!MODULOS_VALIDOS.includes(modulo)) {
    return res.status(400).json({ error: 'Módulo no válido' });
  }
  res.json(readData(modulo));
});

// ── POST /api/:modulo → subir documento a Cloudinary ─────────────────────
app.post('/api/:modulo', requireAuth, upload.single('pdf'), async (req, res) => {
  const { modulo } = req.params;

  if (!MODULOS_VALIDOS.includes(modulo)) {
    return res.status(400).json({ error: 'Módulo no válido' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No se recibió ningún PDF' });
  }

  const { titulo, descripcion, area } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  try {
    // Subir a Cloudinary usando buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `diccionario/${modulo}`,
        resource_type: 'raw',
        public_id: req.file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.\-_]/g, '').replace('.pdf', ''),
        format: 'pdf'
      },
      (error, result) => {
        if (error) {
          console.error('Error subiendo a Cloudinary:', error);
          return res.status(500).json({ error: 'Error al subir el archivo' });
        }

        const nuevoDoc = {
          id: Date.now(),
          titulo,
          descripcion: descripcion || '',
          area: area || 'General',
          archivo: result.secure_url,
          cloudinary_id: result.public_id,
          fecha: today()
        };

        const data = readData(modulo);
        data.push(nuevoDoc);
        writeData(modulo, data);

        console.log(`[${modulo.toUpperCase()}] Nuevo documento: ${titulo}`);
        res.status(201).json({ mensaje: 'Documento subido correctamente', doc: nuevoDoc });
      }
    );

    // Escribir el buffer al stream
    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al procesar el archivo' });
  }
});

// ── DELETE /api/:modulo/:id → eliminar documento de Cloudinary ─────────────
app.delete('/api/:modulo/:id', requireAuth, async (req, res) => {
  const { modulo, id } = req.params;

  if (!MODULOS_VALIDOS.includes(modulo)) {
    return res.status(400).json({ error: 'Módulo no válido' });
  }

  let data = readData(modulo);
  const doc = data.find(d => d.id === Number(id));

  if (!doc) {
    return res.status(404).json({ error: 'Documento no encontrado' });
  }

  try {
    // Eliminar de Cloudinary si tiene cloudinary_id
    if (doc.cloudinary_id) {
      await cloudinary.uploader.destroy(doc.cloudinary_id, { resource_type: 'raw' });
      console.log(`[${modulo.toUpperCase()}] Eliminado de Cloudinary: ${doc.cloudinary_id}`);
    }

    data = data.filter(d => d.id !== Number(id));
    writeData(modulo, data);

    res.json({ mensaje: 'Documento eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando de Cloudinary:', error);
    // Eliminar de la base de datos aunque falle Cloudinary
    data = data.filter(d => d.id !== Number(id));
    writeData(modulo, data);
    res.json({ mensaje: 'Documento eliminado de la base de datos' });
  }
});

// ── Iniciar servidor ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📁 Sirviendo Docsify desde: ${DOCS_DIR}`);
});