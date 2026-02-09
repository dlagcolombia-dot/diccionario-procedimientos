# Script para agregar PDFs al diccionario
# Uso: .\agregar-pdf.ps1 "ruta\al\archivo.pdf"

param(
    [Parameter(Mandatory=$true)]
    [string]$PdfPath
)

# Función para normalizar nombres de archivo
function Normalize-FileName {
    param([string]$name)
    
    # Remover extensión
    $nameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($name)
    
    # Reemplazar caracteres especiales
    $normalized = $nameWithoutExt `
        -replace 'á','a' `
        -replace 'é','e' `
        -replace 'í','i' `
        -replace 'ó','o' `
        -replace 'ú','u' `
        -replace 'Á','A' `
        -replace 'É','E' `
        -replace 'Í','I' `
        -replace 'Ó','O' `
        -replace 'Ú','U' `
        -replace 'ñ','n' `
        -replace 'Ñ','N' `
        -replace '\s+','-' `
        -replace '[^\w\-]',''
    
    return "$normalized.pdf"
}

# Función para crear título legible
function Get-ReadableTitle {
    param([string]$fileName)
    
    $title = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
    $title = $title -replace '-',' '
    return $title
}

try {
    # Verificar que el archivo existe
    if (-not (Test-Path $PdfPath)) {
        Write-Host "❌ Error: El archivo no existe: $PdfPath" -ForegroundColor Red
        exit 1
    }
    
    # Verificar que es un PDF
    if ([System.IO.Path]::GetExtension($PdfPath) -ne '.pdf') {
        Write-Host "❌ Error: El archivo debe ser un PDF" -ForegroundColor Red
        exit 1
    }
    
    $originalName = [System.IO.Path]::GetFileName($PdfPath)
    $normalizedName = Normalize-FileName $originalName
    $destinationPath = "docs\pdfs\$normalizedName"
    
    Write-Host "📄 Procesando PDF..." -ForegroundColor Cyan
    Write-Host "   Original: $originalName"
    Write-Host "   Normalizado: $normalizedName"
    
    # Copiar archivo a la carpeta de PDFs
    Copy-Item -Path $PdfPath -Destination $destinationPath -Force
    Write-Host "✅ PDF copiado a: $destinationPath" -ForegroundColor Green
    
    # Leer el sidebar actual
    $sidebarPath = "docs\_sidebar.md"
    $sidebarContent = Get-Content $sidebarPath -Raw
    
    # Crear la nueva línea para el sidebar
    $title = Get-ReadableTitle $normalizedName
    $newLine = "  * [$title](pdfs/$normalizedName ':ignore')"
    
    # Verificar si ya existe
    if ($sidebarContent -match [regex]::Escape($normalizedName)) {
        Write-Host "⚠️  El PDF ya está en el sidebar" -ForegroundColor Yellow
    } else {
        # Buscar la sección de PDFs y agregar el nuevo enlace
        $pattern = '(\* 📄 PDFs Originales\r?\n(?:  \* \[.*?\]\(pdfs\/.*?\)\r?\n)*)'
        if ($sidebarContent -match $pattern) {
            $replacement = $Matches[1] + $newLine + "`r`n"
            $sidebarContent = $sidebarContent -replace $pattern, $replacement
            
            # Guardar el sidebar actualizado
            $sidebarContent | Set-Content $sidebarPath -NoNewline
            Write-Host "✅ Sidebar actualizado" -ForegroundColor Green
        } else {
            Write-Host "⚠️  No se encontró la sección de PDFs en el sidebar" -ForegroundColor Yellow
            Write-Host "   Agrega manualmente esta línea al _sidebar.md:" -ForegroundColor Yellow
            Write-Host "   $newLine" -ForegroundColor White
        }
    }
    
    Write-Host "`n🎉 ¡Listo! Recarga el navegador para ver el nuevo PDF" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    exit 1
}
