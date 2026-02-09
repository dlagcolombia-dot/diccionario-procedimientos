#!/usr/bin/env python3
"""
Script para renombrar PDFs eliminando espacios y caracteres especiales
y actualizar automáticamente el sidebar
"""

import os
import re
import shutil

def normalizar_nombre(nombre):
    """
    Convierte nombre de archivo a formato web-friendly
    Ejemplo: 'Manual de Usuario (1).pdf' -> 'Manual-de-Usuario-1.pdf'
    """
    # Quitar extensión temporalmente
    nombre_sin_ext = nombre.replace('.pdf', '')
    
    # Reemplazar espacios por guiones
    nombre_normalizado = nombre_sin_ext.replace(' ', '-')
    
    # Eliminar caracteres especiales excepto guiones
    nombre_normalizado = re.sub(r'[^\w\-]', '', nombre_normalizado)
    
    # Eliminar guiones múltiples
    nombre_normalizado = re.sub(r'-+', '-', nombre_normalizado)
    
    # Eliminar guiones al inicio y final
    nombre_normalizado = nombre_normalizado.strip('-')
    
    # Agregar extensión
    return nombre_normalizado + '.pdf'

def crear_nombre_legible(nombre_archivo):
    """
    Crea un nombre legible para mostrar en el menú
    """
    nombre = nombre_archivo.replace('.pdf', '')
    nombre = nombre.replace('-', ' ')
    return nombre

def renombrar_pdfs(carpeta_pdfs='docs/pdfs', hacer_backup=True):
    """
    Renombra todos los PDFs en la carpeta
    """
    if not os.path.exists(carpeta_pdfs):
        print(f"❌ La carpeta {carpeta_pdfs} no existe")
        return []
    
    archivos_pdf = [f for f in os.listdir(carpeta_pdfs) if f.endswith('.pdf')]
    
    if not archivos_pdf:
        print(f"⚠️  No se encontraron archivos PDF en {carpeta_pdfs}")
        return []
    
    print("\n" + "="*70)
    print("🔧 RENOMBRANDO ARCHIVOS PDF")
    print("="*70 + "\n")
    
    cambios = []
    
    for pdf_original in archivos_pdf:
        pdf_normalizado = normalizar_nombre(pdf_original)
        
        if pdf_original != pdf_normalizado:
            ruta_original = os.path.join(carpeta_pdfs, pdf_original)
            ruta_nueva = os.path.join(carpeta_pdfs, pdf_normalizado)
            
            # Hacer backup si se solicita
            if hacer_backup:
                backup_dir = os.path.join(carpeta_pdfs, 'backup_originales')
                os.makedirs(backup_dir, exist_ok=True)
                shutil.copy2(ruta_original, os.path.join(backup_dir, pdf_original))
            
            # Renombrar archivo
            os.rename(ruta_original, ruta_nueva)
            
            print(f"✅ Renombrado:")
            print(f"   Antes: {pdf_original}")
            print(f"   Ahora: {pdf_normalizado}\n")
            
            cambios.append((pdf_original, pdf_normalizado))
        else:
            print(f"⏭️  Sin cambios: {pdf_original}")
            cambios.append((pdf_original, pdf_original))
    
    return cambios

def generar_sidebar_actualizado(cambios, archivo_sidebar='docs/_sidebar.md'):
    """
    Genera la sección actualizada del sidebar con los nombres correctos
    """
    print("\n" + "="*70)
    print("📝 GENERANDO ENLACES PARA SIDEBAR")
    print("="*70 + "\n")
    
    enlaces = []
    for original, nuevo in sorted(cambios, key=lambda x: x[1]):
        nombre_legible = crear_nombre_legible(nuevo)
        enlace = f"  * [{nombre_legible}](pdfs/{nuevo} ':ignore')"
        enlaces.append(enlace)
        print(enlace)
    
    # Leer sidebar actual
    if os.path.exists(archivo_sidebar):
        with open(archivo_sidebar, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        # Crear nueva sección
        nueva_seccion = "* 📄 PDFs Originales\n" + '\n'.join(enlaces)
        
        # Reemplazar sección existente
        if '* 📄 PDFs Originales' in contenido:
            contenido_actualizado = re.sub(
                r'\* 📄 PDFs Originales.*?(?=\n\n\*|---|$)',
                nueva_seccion,
                contenido,
                flags=re.DOTALL
            )
        else:
            if '---' in contenido:
                contenido_actualizado = contenido.replace('---', f'\n{nueva_seccion}\n\n---')
            else:
                contenido_actualizado = contenido + f'\n\n{nueva_seccion}\n'
        
        # Guardar
        with open(archivo_sidebar, 'w', encoding='utf-8') as f:
            f.write(contenido_actualizado)
        
        print(f"\n✅ Archivo {archivo_sidebar} actualizado")
    
    print("\n" + "="*70)
    print("✨ PROCESO COMPLETADO")
    print("="*70)
    print("\n💡 Recarga tu navegador para ver los cambios")
    print("💡 Los archivos originales están respaldados en docs/pdfs/backup_originales/\n")

if __name__ == "__main__":
    import sys
    
    print("\n🔧 Normalizador de Nombres de PDFs\n")
    
    # Preguntar confirmación
    respuesta = input("¿Deseas renombrar los archivos PDF? (S/N): ").strip().upper()
    
    if respuesta == 'S':
        cambios = renombrar_pdfs()
        
        if cambios:
            generar_sidebar_actualizado(cambios)
    else:
        print("\n❌ Operación cancelada")