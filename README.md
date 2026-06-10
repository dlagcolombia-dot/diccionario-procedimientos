# Diccionario de Procedimientos

Sistema unificado de documentación de procedimientos y automatizaciones con arquitectura separada Frontend/Backend.

## 📁 Estructura del Proyecto

```
diccionario-procedimientos/
├── backend/                    # API Express y lógica del servidor
│   ├── src/
│   │   ├── config/            # Configuraciones (BD, JWT, Cloudinary)
│   │   ├── controllers/       # Controladores (Auth, Documentos)
│   │   ├── middlewares/       # Middlewares (Auth, CORS, Upload)
│   │   ├── models/            # Modelos Mongoose
│   │   ├── routes/            # Rutas API
│   │   └── utils/             # Utilidades
│   ├── server.js              # Punto de entrada del servidor
│   ├── package.json           # Dependencias del backend
│   ├── ecosystem.config.js    # Configuración PM2
│   ├── migrate.js             # Script de migración de datos
│   ├── check-db.js            # Verificar datos en MongoDB
│   ├── check-cloudinary.js    # Verificar configuración Cloudinary
│   └── upload-pdfs-to-cloudinary.js  # Subir PDFs a Cloudinary
│
├── frontend/                   # Documentación Docsify (SPA)
│   └── docs/
│       ├── index.html         # Página principal
│       ├── login.html         # Página de login
│       ├── _sidebar.md        # Navegación
│       ├── pdfs/              # PDFs para descargar
│       └── informacionSec/    # Documentación
│
├── node_modules/              # Dependencias (Backend)
├── .git/                       # Control de versiones
├── render.yaml                 # Configuración para deployment
└── package.json               # Scripts principales

```

## 🚀 Instalación y Uso

### Backend

```bash
# Instalar dependencias
cd backend
npm install

# Ejecutar servidor en desarrollo
npm start

# Ejecutar con PM2 (producción)
npm run pm2:start

# Migrar datos a MongoDB
node migrate.js

# Verificar datos
node check-db.js
node check-cloudinary.js
```

### Frontend

```bash
# Servir documentación Docsify
cd frontend
npm install -g docsify-cli
docsify serve docs

# O desde la raíz
npm run dev
```

## 📝 Scripts Disponibles

Desde la **raíz del proyecto**:

- `npm start` - Inicia el servidor backend
- `npm run dev` - Sirve la documentación frontend (Docsify)
- `npm run pm2:start` - Inicia el servidor con PM2
- `npm run pm2:stop` - Detiene el servidor PM2
- `npm run pm2:restart` - Reinicia el servidor PM2
- `npm run pm2:status` - Ver estado de PM2
- `npm run pm2:logs` - Ver logs de PM2

## 🔧 Variables de Entorno

Crear un archivo `.env` en la carpeta `backend/`:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/diccionario

# JWT
JWT_SECRET=tu_secret_key_aqui

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Server
PORT=3001
NODE_ENV=development
```

## 📚 Tecnologías

- **Backend**: Express, MongoDB, JWT, Cloudinary
- **Frontend**: Docsify, HTML5, CSS3
- **DevOps**: PM2, Render

## 🤝 Contribución

Por favor, mantén la estructura de carpetas y actualiza este README si añades nuevas funcionalidades.
