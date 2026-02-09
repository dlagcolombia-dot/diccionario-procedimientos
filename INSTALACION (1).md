# 🚀 Guía de Instalación - Diccionario de Procedimientos

## Requisitos

- Node.js 14+ (https://nodejs.org/)
- Navegador web moderno
- Editor de texto (VS Code recomendado)

## Instalación Paso a Paso

### 1️⃣ Instalar Docsify

```bash
npm i docsify-cli -g
```

### 2️⃣ Crear estructura del proyecto

```bash
# Crear carpeta principal
mkdir diccionario-procedimientos
cd diccionario-procedimientos

# Crear carpeta docs
mkdir docs
cd docs

# Copiar los archivos proporcionados
# - index.html
# - README.md
# - _sidebar.md
```

### 3️⃣ Crear carpetas adicionales

```bash
# Dentro de la carpeta docs/
mkdir procedimientos
mkdir pdfs
mkdir imagenes
```

### 4️⃣ Organizar tus PDFs

```bash
# Copiar todos tus PDFs a la carpeta pdfs/
cp /ruta/a/tus/pdfs/*.pdf pdfs/
```

### 5️⃣ Convertir PDFs a Markdown (Opcional)

Si quieres tener versiones Markdown de tus PDFs:

```bash
# Instalar dependencias de Python
pip install pymupdf

# Ejecutar script de conversión
python convert_pdfs.py
```

### 6️⃣ Iniciar servidor local

```bash
# Desde la carpeta principal (diccionario-procedimientos/)
docsify serve docs
```

Abre tu navegador en: http://localhost:3000

## 📝 Cómo agregar un nuevo procedimiento

### Opción A: Desde PDF

1. Copia tu PDF a `docs/pdfs/`
2. Ejecuta el script: `python convert_pdfs.py docs/pdfs/tu-archivo.pdf`
3. Edita el archivo .md generado en `docs/procedimientos/`
4. Actualiza `_sidebar.md` para agregar el enlace

### Opción B: Crear desde cero

1. Crea un archivo .md en `docs/procedimientos/`
2. Usa la plantilla proporcionada como base
3. Agrega el enlace en `_sidebar.md`

Ejemplo en `_sidebar.md`:
```markdown
* 🤖 Automatizaciones
  * [Mi Nueva Automatización](procedimientos/mi-automatizacion.md)
```

## 🌐 Publicar en Internet (GRATIS)

### Opción 1: GitHub Pages

```bash
# Inicializar Git
git init
git add .
git commit -m "Initial commit"

# Crear repositorio en GitHub y subir
git remote add origin https://github.com/tu-usuario/diccionario-procedimientos.git
git branch -M main
git push -u origin main

# Activar GitHub Pages en la configuración del repositorio
# Selecciona la rama 'main' y carpeta '/docs'
```

Tu sitio estará en: `https://tu-usuario.github.io/diccionario-procedimientos/`

### Opción 2: Netlify

1. Sube tu carpeta al repositorio de GitHub
2. Conecta tu repositorio a Netlify (https://netlify.com)
3. Configura:
   - Build command: (dejar vacío)
   - Publish directory: `docs`

### Opción 3: Vercel

Similar a Netlify, conecta tu repositorio a Vercel (https://vercel.com)

## 🔧 Personalización

### Cambiar colores del tema

Edita en `index.html`:
```css
:root {
  --theme-color: #2c3e50;  /* Color principal */
}
```

### Agregar logo

```html
<!-- En window.$docsify -->
logo: '/imagenes/logo.png',
```

### Configurar nombre y descripción

```javascript
window.$docsify = {
  name: 'Tu Nombre Personalizado',
  // ... resto de configuración
}
```

## 📱 Estructura Final

```
diccionario-procedimientos/
├── docs/
│   ├── index.html              # Configuración principal
│   ├── README.md               # Página de inicio
│   ├── _sidebar.md             # Menú de navegación
│   ├── procedimientos/         # Tus procedimientos en .md
│   │   ├── automatizaciones.md
│   │   ├── auto-ejemplo1.md
│   │   └── ...
│   ├── pdfs/                   # PDFs originales
│   │   ├── procedimiento1.pdf
│   │   └── ...
│   └── imagenes/               # Imágenes y capturas
│       └── ...
├── convert_pdfs.py             # Script de conversión
└── README.md                   # Documentación del proyecto
```

## 💡 Consejos

1. **Organización**: Usa prefijos en nombres de archivo (auto-, config-, manual-)
2. **Enlaces**: Usa enlaces relativos entre documentos
3. **Imágenes**: Guarda capturas en `imagenes/` y referencialas con `![](../imagenes/nombre.png)`
4. **Búsqueda**: Mientras más detallado el contenido, mejor funciona la búsqueda
5. **Backup**: Mantén tus PDFs originales siempre

## 🆘 Solución de Problemas

### El servidor no inicia
```bash
# Reinstalar docsify
npm uninstall -g docsify-cli
npm i docsify-cli -g
```

### Las búsquedas no funcionan
Verifica que el plugin de búsqueda esté cargado en `index.html`

### Los PDFs no se ven
Asegúrate de que la ruta sea correcta: `pdfs/nombre-archivo.pdf`

## 📞 Soporte

Si tienes problemas, revisa:
- Documentación oficial: https://docsify.js.org
- Repositorio: https://github.com/docsifyjs/docsify
