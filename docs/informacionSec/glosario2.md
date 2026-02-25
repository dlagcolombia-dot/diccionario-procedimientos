# 📚 Glosario de Términos Técnicos

> Tu diccionario visual de tecnología - Explicado en lenguaje simple

---

## 🎨 Frontend - La Cara del Sistema (diseño)

### 💻 Frontend
Es la **"cara" del sistema**. Todo lo que ves, tocas y donde haces clic: botones, colores, gráficos. Es como el tablero y el volante de un carro.

**Lo que hace:** Muestra la información de forma bonita y permite que interactúes con el sistema.

---

### ⚡ Vue.js / Svelte
Herramientas para construir la **cara del sistema** de forma rápida y que se vea moderna.

**Analogía:** Es como tener un kit de LEGO profesional en lugar de construir cada pieza desde cero.

**Se usa para:** Crear interfaces modernas, rápidas y atractivas visualmente.

---

### 📊 Dashboard
Un **tablero de control con gráficas** (como el de un avión) para ver de un vistazo cómo van las operaciones en tiempo real.

**Ejemplo práctico:** Muestra cuántas órdenes se procesaron hoy, cuáles están pendientes y si hay algún problema.

---

## 🧠 Backend - El Cerebro del Sistema (Código)

### ⚙️ Backend
Es el **"cerebro" y el motor** que no ves. Se encarga de procesar la información, validar que tu contraseña sea correcta y organizar los datos.

**Funciones principales:**
- Procesar información
- Conectarse a la base de datos
- Validar permisos de usuario
- Ejecutar la lógica del negocio

---

### 🐍 Python
Un lenguaje de programación muy popular, famoso por ser **fácil de leer y excelente para manejar datos**.

**Por qué se usa:** Es como hablar inglés en el mundo de la programación - todos lo entienden y hay millones de herramientas disponibles.

---

### 🚀 FastAPI / Flask
Herramientas para construir el **"cerebro" (Backend)** usando el lenguaje Python.

**Diferencia:**
- **FastAPI:** Más moderna, súper rápida, ideal para APIs
- **Flask:** Más tradicional, simple, perfecta para proyectos pequeños

---

### 🟢 Node.js
Una herramienta que permite usar el lenguaje de las páginas web (JavaScript) para **tareas de servidor o robots**.

**Ventaja:** El mismo código que funciona en el navegador puede funcionar en el servidor.

---

### 🔗 API (Application Programming Interface)
Es un **mensajero**. Si el Frontend necesita datos de la base de datos, le pide a la API: *"Oye, tráeme las órdenes de hoy"*, y la API se las trae.

**Analogía:** Es como el mesero en un restaurante que lleva tu pedido a la cocina y te trae la comida.

**Ejemplo real:**
```
Frontend dice: "Dame las órdenes del día"
API responde: [Orden 1, Orden 2, Orden 3...]
```

---

### 🔐 JWT (JSON Web Token)
Es como un **"pase VIP" digital**. Cuando inicias sesión, el sistema te da este token para que no tengas que poner tu contraseña en cada clic que hagas.

**Cómo funciona:**
1. Te autentificas una vez con usuario y contraseña
2. El sistema te da un JWT (tu pase VIP)
3. En cada petición, solo muestras tu pase
4. No necesitas volver a poner tu contraseña

---

### 🔑 OTP (One-Time Password)
Esa **clave de un solo uso** que te llega al celular para confirmar que sí eres tú quien intenta entrar.

**Seguridad:** Cada código solo sirve una vez y expira en pocos minutos.

**Ejemplo:** El código de 6 dígitos que te llega por SMS cuando intentas entrar.

---

## 🏗️ Arquitectura y Organización

### 🧩 Microservicios
En lugar de tener un solo programa gigante que hace todo, el sistema se divide en **"pequeños especialistas"**.

**Ventaja:** Si el especialista de "WhatsApp" se enferma, el de "Reportes" sigue trabajando sin problemas.

**Ejemplo práctico:**
- 📧 Microservicio de Correo
- 💬 Microservicio de WhatsApp
- 📊 Microservicio de Reportes
- 👤 Microservicio de Usuarios

Si uno falla, los demás siguen funcionando.

---

### 🚪 Nginx / Proxy Reverso
Es como un **recepcionista en la entrada de un edificio**. Recibe a todo el mundo y les dice: *"Tú vas para el departamento de Dashboard"* o *"Tú vas para la API"*.

**Funciones adicionales:**
- Balancea la carga entre servidores
- Mejora la seguridad
- Acelera las respuestas

---

### 📦 Docker
Es como un **"contenedor" de carga**. Permite que el programa funcione exactamente igual en mi computadora que en el servidor de Claro, **sin sorpresas** de *"en mi casa sí funcionaba"*.

**Soluciona el problema de:**
> "En mi computadora funciona perfectamente, pero en el servidor no"

**Cómo ayuda:** Empaqueta el programa con TODAS sus dependencias, así funciona igual en todas partes.

---

## 💾 Bases de Datos

### 🗄️ MySQL
Un **archivador digital gigante** donde se guarda toda la información de las órdenes de trabajo de forma ordenada.

**Características:**
- Organiza datos en tablas (como Excel pero súper potente)
- Permite buscar información súper rápido
- Mantiene los datos seguros y ordenados

**Ejemplo de uso:**
```sql
SELECT * FROM ordenes WHERE fecha = 'hoy'
```
*Traduce: "Dame todas las órdenes de hoy"*

---

## 🤖 Automatización

### 🤖 Bot ETL
Es un **robot trabajador**. Sus siglas significan **E**xtraer, **T**ransformar y **L**oad (Cargar).

**Lo que hace:**
1. 📧 **Extrae:** Lee correos electrónicos
2. 📊 **Transforma:** Saca los archivos Excel y organiza los datos
3. 💾 **Carga:** Guarda la información en la base de datos automáticamente

**Beneficio:** Lo que antes tomaba 2 horas manuales, ahora el bot lo hace en 5 minutos.

---

## 🗂️ Control de Versiones

### 📁 Repositorio (Repo)
La **carpeta en la nube** donde vive todo el código del proyecto (usualmente en GitHub o GitLab).

**Ventajas:**
- Todo el equipo trabaja sobre el mismo código
- Historial completo de cambios
- Respaldo automático

---

### ⏮️ Git
Un sistema que permite **viajar en el tiempo**. Si alguien borra algo por error, Git permite volver a la versión de ayer.

**Comandos comunes:**
- `git commit`: Guardar un punto en el tiempo
- `git push`: Subir cambios a la nube
- `git pull`: Descargar cambios de otros

**Poder especial:** Puedes ver quién cambió qué, cuándo y por qué.

---

### 🌿 Ramas (Branches)
**Copias del proyecto** donde cada desarrollador trabaja para no chocarse, y luego juntan todo en la rama de "Producción".

**Flujo típico:**
```
main (producción) ← La versión que usan los usuarios
  ├── rama-desarrollador1  
  └── rama-desarrollador2  
```

Cuando terminan, fusionan sus ramas en `main`.

---

## 📋 Gestión y Seguimiento

### 📝 Backlog
Una **lista de tareas** o trabajos que están pendientes por hacerse.

**Organización común:**
- 🔴 Alta prioridad (Urgente)
- 🟡 Media prioridad (Importante)
- 🟢 Baja prioridad (Cuando se pueda)

**Ejemplo:**
1. Arreglar bug del login
2. Agregar botón de exportar a PDF
3. Mejorar diseño del dashboard

---

### 📜 Logs
Un **diario donde el sistema anota todo** lo que pasa:
- "A las 10:00 AM se envió un mensaje"
- "A las 10:05 hubo un error"

**Para qué sirven:** Encontrar fallas y entender qué pasó cuando algo sale mal.

**Ejemplo de log:**
```
[2026-02-08 10:00:15] INFO: Usuario admin inició sesión
[2026-02-08 10:05:23] ERROR: No se pudo conectar a la base de datos
[2026-02-08 10:05:45] INFO: Conexión restablecida
```

---

### 🐧 Linux
Linux no es una empresa, es un **Kernel** (el corazón de un sistema operativo). 
Es lo que permite que el software (tus programas) le diga al hardware (el procesador, la memoria) qué hacer. 
Es famoso por ser Gratis, Seguro y estar en todas partes (desde tu celular Android hasta los servidores de la NASA).

**Conceptos Claves:** 

```
Ubuntu: La más amigable, como un carro automático fácil de manejar.

Debian: Muy estable, el camión que nunca se queda varado.

CentOS / Red Hat: Las que suelen usar las empresas grandes.

```

**La Terminal:** 

```
Es donde sucede la magia. En lugar de usar el mouse para buscar una carpeta, escribes una orden. Es mucho más rápido y te hace ver como un hacker de película.

Comando: Una palabra que le da una orden al sistema (ejemplo: ls para "listar" o ver qué hay en una carpeta).

```
---
### Servidor

Un servidor es una computadora que siempre está encendida, 
conectada a internet y cuya función es "atender" las peticiones de otras computadoras, enviándoles la información que solicitan.


### 🏗️ SSH (La Llave Maestra)

SSH (Secure Shell) es el túnel seguro por el cual te conectas desde tu computadora al servidor.

### 🚦 Puertos (Las Puertas del Edificio)

Un servidor hace muchas cosas a la vez. Para no confundirse, usa Puertos, que son como puntos de entrada específicos.

```
Si el puerto está "cerrado", nadie puede entrar, lo cual es excelente para la seguridad.

```
### 🛡️ Firewall (El Portero)

Es la primera capa de seguridad. El Firewall (o cortafuegos) decide quién entra y quién no según los puertos.

### 🌐 IP Estática vs. DNS (La Dirección)

IP Estática: Es la dirección exacta del servidor (ej: 10.105.31.30). No cambia nunca, como la dirección de tu casa.

DNS: Es la "guía telefónica". Convierte un nombre fácil como claro.com.co en la dirección IP numérica que las computadoras entienden.

---

## 📊 Tabla de Referencia Rápida

| Término | Emoji | En Pocas Palabras |
|---------|-------|-------------------|
| **Frontend** | 💻 | Lo que ves y tocas |
| **Backend** | 🧠 | El cerebro que procesa |
| **API** | 🔗 | El mensajero entre sistemas |
| **Base de Datos** | 🗄️ | Donde se guarda todo |
| **Docker** | 📦 | Empaqueta todo para que funcione igual en todos lados |
| **Git** | ⏮️ | Máquina del tiempo para el código |
| **Bot** | 🤖 | Robot que hace tareas automáticas |
| **Dashboard** | 📊 | Tablero de control visual |
| **Microservicio** | 🧩 | Pequeño especialista independiente |
| **JWT** | 🔐 | Pase VIP digital |
| **Logs** | 📜 | Diario del sistema |

---

## 🎯 Consejos para Aprender

💡 **Tip 1:** No intentes memorizar todo. Vuelve a este glosario cuando veas un término que no reconoces.

💡 **Tip 2:** Las analogías ayudan. Si no entiendes algo técnico, piensa: "¿A qué se parece esto en la vida real?"

💡 **Tip 3:** Aprende haciendo. La mejor forma de entender estos conceptos es viéndolos en acción.

---

## ➕ Agregar Nuevos Términos

Para mantener este glosario actualizado, usa este formato:

```markdown
### 🎨 Nombre del Término
Explicación simple y clara del concepto.

**Analogía:** Comparación con algo de la vida real.

**Para qué sirve:** Explicación práctica de su uso.

**Ejemplo:** Caso de uso concreto.
```

---

*Última actualización: Febrero 2026*  
*Glosario creado para hacer la tecnología más accesible* 🚀
