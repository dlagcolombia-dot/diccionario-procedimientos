# 🔧 Solución: Doble Menú y PDFs en Localhost

## ❌ Problemas Identificados

1. **Doble menú lateral** - Aparecen 2 menús (uno es el _sidebar.md, otro es auto-generado)
2. **PDFs no funcionan en localhost** - Solo funcionan en Netlify y celular
3. **Segundo menú tiene los PDFs** - Pero no deberían estar ahí

---

## ✅ Solución Completa

### 📝 Archivos a REEMPLAZAR en tu carpeta `docs/`:

#### 1. **index.html** 
Reemplaza tu `docs/index.html` actual con `index-fixed.html`

**Cambios principales:**
- ✅ Desactiva el TOC automático que genera el segundo menú
- ✅ Mejora la detección de rutas de PDF en localhost
- ✅ Añade fallback para navegadores que no soportan PDFs embebidos
- ✅ Logs en consola para debugging

#### 2. **README.md**
Reemplaza tu `docs/README.md` actual con `README-fixed.md`

**Cambios principales:**
- ✅ Elimina secciones que Docsify convierte en menú automático
- ✅ Simplifica la estructura
- ✅ Mantiene la información útil sin generar navegación duplicada

---

## 🚀 Pasos para Aplicar

### En tu proyecto local:

```bash
# 1. Navega a tu carpeta docs
cd diccionario-procedimientos/docs

# 2. Haz backup de tus archivos actuales (por si acaso)
cp index.html index.html.backup
cp README.md README.md.backup

# 3. Reemplaza con los nuevos archivos
# (descarga index-fixed.html y renómbralo a index.html)
# (descarga README-fixed.md y renómbralo a README.md)

# 4. Verifica que tienes estos archivos en docs/:
ls -la
# Deberías ver:
# - index.html (nuevo)
# - README.md (nuevo)
# - _sidebar.md (sin cambios)
# - netlify.toml (agregado antes)
# - _headers (agregado antes)

# 5. Prueba en localhost
npm run dev
# o
docsify serve docs
```

### Verificación en localhost:

1. **Abre** http://localhost:3000
2. **Verifica** que solo aparece UN menú lateral (el del _sidebar.md)
3. **Haz clic** en cualquier PDF del menú
4. **Deberías ver** el PDF cargándose (o botones de descarga si tu navegador no soporta PDFs)

### Sube a Git:

```bash
git add docs/index.html docs/README.md
git commit -m "Fix: Eliminar doble menú y mejorar carga de PDFs"
git push
```

---

## 🔍 Debugging

### Si los PDFs no cargan en localhost:

1. **Abre las DevTools** (F12)
2. Ve a la pestaña **Console**
3. Busca mensajes que digan "Intentando abrir PDF:"
4. Verifica la ruta que aparece

**Rutas correctas en localhost:**
```
✅ pdfs/Manual-Cierre-Bot.pdf
✅ ./pdfs/Ecosistema-y-Automatizacion-de-reportes.pdf
❌ /pdfs/Manual-Cierre-Bot.pdf (puede no funcionar)
```

### Si el doble menú persiste:

1. **Limpia la caché del navegador** (Ctrl + Shift + Delete)
2. **Recarga duro** (Ctrl + Shift + R)
3. Verifica que el README.md nuevo no tiene secciones como:
   - `## 📂 Contenido Disponible`
   - `### 📋 Procedimientos`
   - Listas anidadas de procedimientos

### Verifica tu estructura de archivos:

```
docs/
├── imagenes/
├── pdfs/
│   ├── Cambiar-Numero-Celular-envio-Whatsap.pdf
│   ├── Configuracion-de-Microservicios-y-Servidores.pdf
│   ├── Ecosistema-y-Automatizacion-de-reportes.pdf
│   ├── Manual-Cierre-Bot.pdf
│   └── Manual-de-Usuario-Modulo-Back-UMM-1pptx.pdf
├── procedimientos/
│   └── glosario.md
├── .nojekyll
├── _sidebar.md          ← Este es el ÚNICO menú
├── index.html           ← REEMPLAZAR con index-fixed.html
├── README.md            ← REEMPLAZAR con README-fixed.md
├── netlify.toml         ← Ya lo agregaste
└── _headers             ← Ya lo agregaste
```

---

## 🎯 Resultado Esperado

### ✅ En localhost:
- Solo UN menú lateral (el del _sidebar.md)
- PDFs cargan con iframe o se ofrecen botones de descarga
- Sin errores en consola

### ✅ En Netlify:
- Funciona igual que localhost
- PDFs cargan correctamente

### ✅ En móvil:
- PDFs se abren en nueva pestaña (visor nativo)
- Navegación fluida

---

## 📋 Checklist Final

- [ ] Reemplazaste `index.html` con el nuevo
- [ ] Reemplazaste `README.md` con el nuevo  
- [ ] Verificaste que solo hay UN menú lateral
- [ ] Los PDFs cargan en localhost (o muestran botones)
- [ ] Hiciste commit y push
- [ ] Netlify se actualizó correctamente
- [ ] Funciona en móvil

---

## 🆘 Si nada funciona

1. **Borra la carpeta `node_modules`** y reinstala:
   ```bash
   rm -rf node_modules
   npm install
   ```

2. **Verifica que Docsify está actualizado:**
   ```bash
   npm install docsify-cli@latest
   ```

3. **Comparte un screenshot** de:
   - La consola del navegador (F12 → Console)
   - El menú lateral completo
   - La estructura de tu carpeta docs/

---

**¡Con estos cambios debería funcionar perfectamente!** 🎉
