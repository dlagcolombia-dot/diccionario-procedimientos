# Diccionario de Procedimientos

## Instalación Rápida

### Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cd backend
cp .env.example .env.local
# Editar .env.local con tus valores si es necesario

# 3. Correr el servidor con auto-recarga
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

### Verificaciones

```bash
# Verificar conexión a Cloudinary
npm run check:cloudinary

# Verificar conexión a MongoDB
npm run check:db
```

---

## Producción

### Con PM2

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno en .env
cd backend
cp .env.example .env
# Editar .env con valores de producción

# 3. Iniciar con PM2
npm run prod

# Comandos útiles:
npm run prod:status      # Ver estado
npm run prod:logs        # Ver logs
npm run prod:restart     # Reiniciar
npm run prod:stop        # Detener
```

### Configuración de PM2

El archivo `backend/ecosystem.config.js` define:
- **Nombre**: diccionario-procedimientos
- **Puerto**: 3001
- **Instancias**: 1
- **Auto-restart**: Habilitado
- **Max memoria**: 1GB

---

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Iniciar servidor con nodemon (desarrollo) |
| `npm start` | Iniciar servidor (producción) |
| `npm run prod` | Iniciar con PM2 |
| `npm run prod:stop` | Detener PM2 |
| `npm run prod:restart` | Reiniciar PM2 |
| `npm run prod:logs` | Ver logs de PM2 |
| `npm run prod:status` | Ver estado de PM2 |
| `npm run install` | Instalar todas las dependencias |
| `npm run check:cloudinary` | Verificar conexión a Cloudinary |
| `npm run check:db` | Verificar conexión a MongoDB |

---

## Variables de Entorno

Copiar `.env.example` a `.env` y configurar:

```env
NODE_ENV=production           # development o production
PORT=3001                     # Puerto del servidor
MONGODB_URI=mongodb://...     # Conexión a MongoDB
JWT_SECRET=...                # Token secreto JWT
CLOUDINARY_*                  # Credenciales de Cloudinary
CORS_ORIGIN=...               # Origen CORS permitido
```

---

## Estructura del Proyecto

```
diccionario-procedimientos/
├── backend/               # API Express
│   ├── server.js         # Punto de entrada
│   ├── ecosystem.config.js # Configuración PM2
│   ├── package.json
│   └── src/
│       ├── config/       # Configuraciones
│       ├── controllers/  # Controladores
│       ├── middlewares/  # Middlewares
│       ├── models/       # Modelos MongoDB
│       ├── routes/       # Rutas API
│       └── utils/        # Utilidades
├── frontend/              # Documentación (Docsify)
├── package.json          # Scripts principales
└── render.yaml           # Configuración para Render
```

---

## Troubleshooting

### "Cannot find module 'nodemon'"
```bash
cd backend && npm install --save-dev nodemon
```

### "MONGODB_URI is not set"
```bash
# Crear .env en backend/
cd backend && cp .env.example .env.local
```

### PM2 no inicia
```bash
npm install -g pm2
npm run prod
```

---

## Despliegue

Ver `render.yaml` para configuración de Render.
