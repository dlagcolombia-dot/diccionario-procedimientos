#!/usr/bin/env python3
"""
Script para generar automáticamente enlaces a PDFs en el sidebar
Escanea la carpeta docs/pdfs/ y actualiza _sidebar.md
"""

import os
import re

def limpiar_nombre(nombre_archivo):
    """
    Convierte el nombre del archivo PDF en un título legible
    Ejemplo: 'manual-cierre-bot.pdf' -> 'Manual Cierre Bot'
    """
    # Quitar extensión
    nombre = nombre_archivo.replace('.pdf', '')
    
    # Reemplazar guiones y guiones bajos por espacios
    nombre = nombre.replace('-', ' ').replace('_', ' ')
    
    # Capitalizar cada palabra
    nombre = ' '.join(word.capitalize() for word in nombre.split())
    
    return nombre

def generar_enlaces_pdfs(carpeta_pdfs='docs/pdfs'):
    """
    Genera la lista de enlaces a PDFs para el sidebar
    """
    if not os.path.exists(carpeta_pdfs):
        print(f"❌ La carpeta {carpeta_pdfs} no existe")
        return []
    
    # Buscar todos los PDFs
    archivos_pdf = sorted([f for f in os.listdir(carpeta_pdfs) if f.endswith('.pdf')])
    
    if not archivos_pdf:
        print(f"⚠️  No se encontraron archivos PDF en {carpeta_pdfs}")
        return []
    
    print(f"📚 Encontrados {len(archivos_pdf)} archivos PDF:\n")
    
    enlaces = []
    for pdf in archivos_pdf:
        titulo = limpiar_nombre(pdf)
        enlace = f"  * [{titulo}](pdfs/{pdf} ':ignore')"
        enlaces.append(enlace)
        print(f"  ✓ {titulo}")
    
    return enlaces

def actualizar_sidebar(enlaces_pdfs, archivo_sidebar='docs/_sidebar.md'):
    """
    Actualiza el archivo _sidebar.md con los enlaces a PDFs
    """
    if not os.path.exists(archivo_sidebar):
        print(f"❌ El archivo {archivo_sidebar} no existe")
        return False
    
    # Leer contenido actual
    with open(archivo_sidebar, 'r', encoding='utf-8') as f:
        contenido = f.read()
    
    # Buscar la sección de PDFs
    patron_inicio = r'\* 📄 PDFs Originales\s*\n'
    patron_fin = r'\n\n\*|---|\Z'
    
    # Crear nueva sección de PDFs
    nueva_seccion = "* 📄 PDFs Originales\n" + '\n'.join(enlaces_pdfs)
    
    # Verificar si ya existe la sección
    if '* 📄 PDFs Originales' in contenido:
        # Reemplazar sección existente
        contenido_modificado = re.sub(
            r'\* 📄 PDFs Originales.*?(?=\n\n\*|---|$)',
            nueva_seccion,
            contenido,
            flags=re.DOTALL
        )
    else:
        # Agregar al final antes del separador final
        if '---' in contenido:
            contenido_modificado = contenido.replace('---', f'\n{nueva_seccion}\n\n---')
        else:
            contenido_modificado = contenido + f'\n\n{nueva_seccion}\n'
    
    # Guardar archivo actualizado
    with open(archivo_sidebar, 'w', encoding='utf-8') as f:
        f.write(contenido_modificado)
    
    print(f"\n✅ Archivo {archivo_sidebar} actualizado correctamente")
    return True

def generar_lista_completa():
    """
    Genera una lista completa de PDFs con categorías sugeridas
    """
    carpeta_pdfs = 'docs/pdfs'
    
    if not os.path.exists(carpeta_pdfs):
        print(f"❌ La carpeta {carpeta_pdfs} no existe")
        return
    
    archivos_pdf = sorted([f for f in os.listdir(carpeta_pdfs) if f.endswith('.pdf')])
    
    if not archivos_pdf:
        print(f"⚠️  No se encontraron archivos PDF")
        return
    
    print("\n" + "="*60)
    print("📋 LISTA COMPLETA DE PDFs ENCONTRADOS")
    print("="*60 + "\n")
    
    # Categorizar por palabras clave en el nombre
    categorias = {
        'Automatizaciones': ['bot', 'auto', 'script', 'proceso'],
        'Configuraciones': ['config', 'setup', 'install', 'settings'],
        'Manuales': ['manual', 'guia', 'tutorial', 'instruc'],
        'Otros': []
    }
    
    pdfs_categorizados = {cat: [] for cat in categorias.keys()}
    
    for pdf in archivos_pdf:
        categorizado = False
        nombre_lower = pdf.lower()
        
        for categoria, keywords in categorias.items():
            if categoria == 'Otros':
                continue
            if any(keyword in nombre_lower for keyword in keywords):
                pdfs_categorizados[categoria].append(pdf)
                categorizado = True
                break
        
        if not categorizado:
            pdfs_categorizados['Otros'].append(pdf)
    
    # Mostrar categorización
    for categoria, pdfs in pdfs_categorizados.items():
        if pdfs:
            print(f"\n🔹 {categoria}:")
            for pdf in pdfs:
                titulo = limpiar_nombre(pdf)
                print(f"  * [{titulo}](pdfs/{pdf} ':ignore')")
    
    print("\n" + "="*60)
    print("\n💡 Copia y pega las secciones en tu _sidebar.md")
    print("="*60 + "\n")

if __name__ == "__main__":
    import sys
    
    print("\n🔧 Generador de Enlaces para PDFs\n")
    
    if len(sys.argv) > 1 and sys.argv[1] == '--categorizar':
        # Modo categorización
        generar_lista_completa()
    else:
        # Modo actualización automática
        enlaces = generar_enlaces_pdfs()
        
        if enlaces:
            print("\n" + "="*60)
            actualizar_sidebar(enlaces)
            print("="*60)
            print("\n💡 Recarga tu navegador para ver los cambios")
            print("💡 Usa: python generar_enlaces_pdfs.py --categorizar")
            print("   para ver una categorización sugerida\n")