# Automatización de Respaldo de Base de Datos

> **Última actualización**: 8 de Febrero 2026
> 
> **Responsable**: Equipo de Sistemas
> 
> **Categoría**: Automatización / Backup

## 📋 Descripción

Este procedimiento automatiza el respaldo diario de la base de datos PostgreSQL del sistema principal, comprime los archivos y los envía a un almacenamiento en la nube.

## 🎯 Objetivo

Garantizar la integridad y disponibilidad de los datos mediante respaldos automáticos programados que permitan recuperación ante desastres.

## ✅ Requisitos Previos

- Servidor con PostgreSQL 12+
- Acceso SSH al servidor
- Credenciales de AWS S3 o almacenamiento similar
- Espacio en disco: mínimo 50GB libres
- Permisos de superusuario en PostgreSQL

## 🔧 Configuración Inicial

### Paso 1: Instalar herramientas necesarias

```bash
# Actualizar sistema
sudo apt update

# Instalar PostgreSQL client tools
sudo apt install postgresql-client

# Instalar AWS CLI
sudo apt install awscli

# Verificar instalación
pg_dump --version
aws --version
```

### Paso 2: Configurar credenciales AWS

```bash
# Configurar AWS
aws configure

# Ingresar:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region: us-east-1
# - Default output format: json
```

### Paso 3: Crear script de respaldo

Crea el archivo `/opt/scripts/backup_db.sh`:

```bash
#!/bin/bash

# Variables de configuración
DB_NAME="produccion_db"
DB_USER="postgres"
BACKUP_DIR="/var/backups/postgres"
S3_BUCKET="s3://mi-empresa-backups/postgres"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${DB_NAME}_${DATE}.sql"
LOG_FILE="/var/log/backup_postgres.log"

# Crear directorio de respaldo
mkdir -p $BACKUP_DIR

# Función de logging
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" >> $LOG_FILE
}

log "=== Iniciando respaldo de base de datos ==="

# Realizar respaldo
pg_dump -U $DB_USER -h localhost $DB_NAME > $BACKUP_DIR/$BACKUP_FILE

if [ $? -eq 0 ]; then
    log "✅ Respaldo creado exitosamente: $BACKUP_FILE"
    
    # Comprimir archivo
    gzip $BACKUP_DIR/$BACKUP_FILE
    log "✅ Archivo comprimido: ${BACKUP_FILE}.gz"
    
    # Subir a S3
    aws s3 cp $BACKUP_DIR/${BACKUP_FILE}.gz $S3_BUCKET/
    
    if [ $? -eq 0 ]; then
        log "✅ Archivo subido a S3 exitosamente"
        
        # Eliminar archivos locales mayores a 7 días
        find $BACKUP_DIR -name "*.gz" -mtime +7 -delete
        log "🧹 Limpieza de archivos antiguos completada"
    else
        log "❌ Error al subir archivo a S3"
    fi
else
    log "❌ Error al crear respaldo"
    exit 1
fi

log "=== Respaldo completado ==="
```

### Paso 4: Dar permisos de ejecución

```bash
sudo chmod +x /opt/scripts/backup_db.sh
sudo chown postgres:postgres /opt/scripts/backup_db.sh
```

## 🚀 Programación Automática

### Configurar Cron

```bash
# Editar crontab del usuario postgres
sudo -u postgres crontab -e

# Agregar línea para ejecutar a las 2 AM todos los días
0 2 * * * /opt/scripts/backup_db.sh
```

### Verificar programación

```bash
# Ver tareas programadas
sudo -u postgres crontab -l
```

## 📊 Resultados Esperados

Al ejecutar correctamente:

1. Archivo SQL generado en `/var/backups/postgres/`
2. Archivo comprimido `.gz` creado
3. Copia subida a S3
4. Entrada en log confirmando operación
5. Archivos locales > 7 días eliminados

Ejemplo de log exitoso:
```
[2026-02-08 02:00:01] === Iniciando respaldo de base de datos ===
[2026-02-08 02:03:45] ✅ Respaldo creado exitosamente: backup_produccion_db_20260208_020001.sql
[2026-02-08 02:04:12] ✅ Archivo comprimido: backup_produccion_db_20260208_020001.sql.gz
[2026-02-08 02:05:30] ✅ Archivo subido a S3 exitosamente
[2026-02-08 02:05:31] 🧹 Limpieza de archivos antiguos completada
[2026-02-08 02:05:31] === Respaldo completado ===
```

## ⚠️ Solución de Problemas

### Error: "pg_dump: command not found"

**Causa**: PostgreSQL client tools no instalado

**Solución**:
```bash
sudo apt install postgresql-client-12
```

### Error: "Permission denied al escribir archivo"

**Causa**: Permisos insuficientes en directorio de backup

**Solución**:
```bash
sudo mkdir -p /var/backups/postgres
sudo chown -R postgres:postgres /var/backups/postgres
sudo chmod 755 /var/backups/postgres
```

### Error: "Unable to locate credentials (AWS)"

**Causa**: Credenciales de AWS no configuradas

**Solución**:
```bash
sudo -u postgres aws configure
# Ingresar credenciales válidas
```

### El backup no se ejecuta automáticamente

**Verificar**:
```bash
# Ver logs del sistema
sudo grep CRON /var/log/syslog | tail -20

# Verificar servicio cron
sudo systemctl status cron

# Probar ejecución manual
sudo -u postgres /opt/scripts/backup_db.sh
```

## 🔍 Verificación y Monitoreo

### Verificar último backup

```bash
# Ver archivos recientes
ls -lht /var/backups/postgres/ | head -5

# Ver últimas entradas del log
tail -20 /var/log/backup_postgres.log
```

### Verificar archivos en S3

```bash
aws s3 ls s3://mi-empresa-backups/postgres/ --human-readable
```

### Probar restauración

```bash
# Descargar backup de prueba
aws s3 cp s3://mi-empresa-backups/postgres/backup_produccion_db_20260208_020001.sql.gz .

# Descomprimir
gunzip backup_produccion_db_20260208_020001.sql.gz

# Restaurar en base de datos de prueba
psql -U postgres -d pruebas_db < backup_produccion_db_20260208_020001.sql
```

## 📎 Recursos Adicionales

- [Manual completo de pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html)
- [Guía AWS CLI S3](https://docs.aws.amazon.com/cli/latest/reference/s3/)
- [PDF Original de este procedimiento](../pdfs/backup-automatico-db.pdf)

## 📝 Notas Adicionales

- **Retención**: Los backups en S3 tienen lifecycle policy de 90 días
- **Notificaciones**: Se envía email si el backup falla (configurar SNS)
- **Cifrado**: Los archivos en S3 están cifrados con AES-256
- **Pruebas**: Realizar prueba de restauración mensualmente

## 🔄 Historial de Cambios

| Fecha | Versión | Cambios |
|-------|---------|---------|
| 2026-02-08 | 1.2 | Agregado cifrado y notificaciones |
| 2025-11-15 | 1.1 | Optimización de compresión |
| 2025-08-20 | 1.0 | Versión inicial |

---

## 🔗 Ver también

- [Procedimiento de Restauración de Base de Datos](restauracion-db.md)
- [Configuración de PostgreSQL](config-postgresql.md)
- [Política de Retención de Backups](politica-backups.md)
