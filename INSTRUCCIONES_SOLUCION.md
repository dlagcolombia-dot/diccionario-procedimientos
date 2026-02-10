# 🔧 Solución para visualización de PDFs en móvil - Netlify

## 🎯 Problema Resuelto
Los PDFs no se visualizaban correctamente en dispositivos móviles, pero sí funcionaban en PC.

## ✅ Soluciones Implementadas

### 1. **Configuración de Netlify**
Se han creado dos archivos de configuración para asegurar que los PDFs se sirvan correctamente:

- `netlify.toml` - Configuración principal
- `_headers` - Headers HTTP para archivos PDF

Estos archivos configuran:
- Content-Type correcto para PDFs
- CORS habilitado
- Cache optimizado
- Redirects para SPA

### 2. **Mejoras en index.html**
El archivo `index.html` ahora incluye:

- **Detección de dispositivo móvil**: Automáticamente abre PDFs en nueva pestaña en móviles
- **Visor mejorado para desktop**: Usa PDFObject con fallback
- **Estilos responsive**: Mejor visualización en todos los dispositivos
- **Manejo de errores**: Opciones de descarga cuando no se puede visualizar

### 3. **Estructura de archivos correcta**
```
tu-proyecto/
├── index.html           ← Actualizado
├── _sidebar.md          ← Actualizado
├── README.md            ← Página de inicio
├── netlify.toml         ← NUEVO - Configuración Netlify
├── _headers             ← NUEVO - Headers HTTP
├── .gitattributes       ← Ya existente (correcto)
└── pdfs/               
    ├── Cambiar-Numero-Celular-envio-Whatsap.pdf
    ├── Configuracion-de-Microservicios-y-Servidores.pdf
    ├── Ecosistema-y-Automatizacion-de-reportes.pdf
    ├── Manual-Cierre-Bot.pdf
    └── Manual-de-Usuario-Modulo-Back-UMM-1pptx.pdf
```

## 📱 Cómo funciona ahora

### En Móvil:
1. Usuario hace clic en un PDF
2. Se abre automáticamente en nueva pestaña
3. El navegador móvil usa su visor nativo de PDF

### En Desktop:
1. Usuario hace clic en un PDF
2. Se intenta mostrar el PDF embebido en la página
3. Si falla, se muestran botones de "Descargar" y "Ver en nueva pestaña"

## 🚀 Pasos para Desplegar

### Opción A: Reemplazar archivos existentes
1. Descarga los archivos actualizados:
   - `index.html`
   - `_sidebar.md`
   - `netlify.toml` (NUEVO)
   - `_headers` (NUEVO)

2. Reemplázalos en tu repositorio Git

3. Commit y push:
```bash
git add .
git commit -m "Fix: Configuración para PDFs en móvil"
git push
```

4. Netlify se actualizará automáticamente

### Opción B: Deploy manual en Netlify
1. Ve a tu sitio en Netlify
2. Arrastra la carpeta completa del proyecto
3. Netlify detectará los nuevos archivos de configuración

## 🔍 Verificación

Después de desplegar, verifica:

✅ En PC:
- Los PDFs se muestran embebidos en la página
- Si no funcionan, aparecen botones de descarga

✅ En Móvil:
- Los PDFs se abren en nueva pestaña automáticamente
- El visor nativo del navegador los muestra

✅ En ambos:
- El sidebar muestra todos los procedimientos
- La búsqueda funciona correctamente
- No hay errores 404

## 🐛 Troubleshooting

### Si los PDFs aún no funcionan:

1. **Verifica que los archivos PDF estén en la carpeta `pdfs/`**
```bash
ls -la pdfs/
```

2. **Verifica los nombres de archivo en el sidebar**
Los nombres deben coincidir exactamente (case-sensitive):
- ✅ `pdfs/Manual-Cierre-Bot.pdf`
- ❌ `pdfs/manual-cierre-bot.pdf`

3. **Limpia la caché de Netlify**
- Ve a Netlify Dashboard
- Site settings → Build & deploy → Post processing
- Clear cache and deploy site

4. **Verifica los headers HTTP**
Abre las DevTools del navegador:
- Network tab
- Clic en un PDF
- Verifica que Content-Type sea `application/pdf`

### Si los enlaces no funcionan en móvil:

1. Abre DevTools en móvil (Chrome Remote Debugging)
2. Verifica errores en consola
3. Confirma que `window.innerWidth` detecta correctamente el tamaño

## 📝 Notas Importantes

1. **Git LFS no es necesario** para PDFs pequeños (<100MB)
2. **Los archivos binarios** se manejan correctamente con `.gitattributes`
3. **CORS está habilitado** para permitir visualización desde cualquier origen
4. **Cache configurado** para mejor rendimiento

## 🎨 Personalización Adicional

Si quieres cambiar el comportamiento:

**Cambiar tamaño del visor en móvil:**
```css
@media screen and (max-width: 768px) {
  .pdf-viewer {
    height: 500px; /* Cambia este valor */
  }
}
```

**Forzar descarga en vez de visualización:**
```javascript
// En index.html, cambiar:
window.open(href, '_blank');
// Por:
window.location.href = href;
```

## 📞 Soporte

Si sigues teniendo problemas:
1. Verifica la consola del navegador (F12)
2. Revisa los logs de Netlify
3. Comprueba que los archivos PDF no estén corruptos

---

**¡Listo!** Tu sitio ahora debería funcionar correctamente en móvil y PC 🎉
