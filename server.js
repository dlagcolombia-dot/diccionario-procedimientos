const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const { connectDB } = require('./src/config/database');
const { JWT_SECRET } = require('./src/config/jwt');
const { corsMiddleware } = require('./src/middlewares/cors');
const authRoutes = require('./src/routes/auth');
const documentRoutes = require('./src/routes/documents');

const app = express();
const PORT = process.env.PORT || 3001;

// Rutas base
const DOCS_DIR = path.join(__dirname, 'docs');
const PDFS_DIR = path.join(DOCS_DIR, 'pdfs');
const DATA_DIR = path.join(__dirname, 'data');

// Crear carpetas si no existen
[PDFS_DIR, DATA_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Middlewares
app.use(corsMiddleware);
app.use(cors());
app.use(express.json());
app.use(session({
  secret: JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Ruta principal - redirige a login
app.get('/', (req, res) => {
  res.sendFile(path.join(DOCS_DIR, 'login.html'));
});

// Rutas API
app.use('/api', authRoutes);
app.use('/api', documentRoutes);

// Archivos estáticos (después de las rutas específicas)
app.use(express.static(DOCS_DIR));

// Iniciar servidor
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📁 Sirviendo Docsify desde: ${DOCS_DIR}`);
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
}

startServer();
