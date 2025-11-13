# 🏪 MyChangarro

<div align="center">

![MyChangarro Logo](https://img.shields.io/badge/MyChangarro-🏪-orange?style=for-the-badge)

**Plataforma web para conectar negocios locales con su comunidad**

[![Built with Love](https://img.shields.io/badge/Built%20with-❤️-red?style=flat-square)](https://github.com/tu-usuario/mychangarro)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Open Source](https://img.shields.io/badge/Open-Source-success?style=flat-square)](https://github.com/tu-usuario/mychangarro)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[Demo en Vivo](#) • [Reportar Bug](https://github.com/tu-usuario/mychangarro/issues) • [Solicitar Feature](https://github.com/tu-usuario/mychangarro/issues)

</div>

---

## 📖 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Contribuir](#-contribuir)
- [Roadmap](#-roadmap)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🎯 Acerca del Proyecto

**MyChangarro** es una plataforma web diseñada para impulsar los negocios locales mexicanos, permitiéndoles crear perfiles digitales, mostrar sus productos/servicios y conectar con clientes de su comunidad.

### 💡 ¿Por qué MyChangarro?

- 🌮 **Apoyo al comercio local**: Ayudamos a pequeños negocios a tener presencia digital
- 🚀 **Fácil de usar**: Interfaz intuitiva tanto para dueños como para clientes
- 🔍 **Descubrimiento**: Los usuarios pueden encontrar negocios por categorías
- ⭐ **Sistema de reseñas**: Fomenta la confianza y mejora la calidad del servicio
- 📱 **Responsive**: Funciona perfectamente en móviles, tablets y escritorio

---

## ✨ Características

### Para Usuarios

- 🔐 **Autenticación segura** - Sistema de registro e inicio de sesión
- 👤 **Perfil personalizable** - Foto de perfil, nombre y descripción
- 🏪 **Explorar negocios** - Búsqueda por categorías (Comida, Servicios, etc.)
- 📝 **Reseñas y calificaciones** - Comparte tu experiencia con la comunidad
- ⭐ **Sistema de favoritos** - Guarda tus negocios preferidos

### Para Dueños de Negocios

- 🏢 **Perfil de negocio** - Muestra información, horarios y contacto
- 📸 **Galería de imágenes** - Sube fotos de tus productos/servicios
- 📊 **Dashboard básico** - Visualiza reseñas y estadísticas
- 🔔 **Notificaciones** - Recibe alertas de nuevas reseñas

### Técnicas

- 🎨 **Diseño moderno** - UI limpia y atractiva
- ⚡ **Carga rápida** - Optimización de imágenes y lazy loading
- 🔒 **Seguridad** - Protección contra XSS, CSRF y SQL injection
- 📱 **PWA Ready** - Instalable como app nativa
- 🌐 **Multilenguaje** - Preparado para español e inglés

---

## 🛠 Tecnologías

### Frontend

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Modules-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend

![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### Infraestructura & DevOps

![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-Backend-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Images-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Git](https://img.shields.io/badge/Git-Version_Control-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## 📸 Capturas de Pantalla

<details>
<summary>🏠 <b>Página Principal</b></summary>
<br>

```
┌─────────────────────────────────────────┐
│           🏪 MyChangarro                │
│  ┌───────────────────────────────────┐  │
│  │  👤 Bienvenido, Usuario           │  │
│  │  📝 Descripción del usuario       │  │
│  └───────────────────────────────────┘  │
│                                          │
│  [ 🍔 Comida ]  [ 🔧 Servicios ]        │
│                                          │
│  ┌──────────┐  ┌──────────┐            │
│  │ Negocio  │  │ Negocio  │            │
│  │  ⭐⭐⭐⭐    │  │  ⭐⭐⭐⭐⭐   │            │
│  └──────────┘  └──────────┘            │
└─────────────────────────────────────────┘
```

</details>

<details>
<summary>👤 <b>Perfil de Usuario</b></summary>
<br>

```
┌─────────────────────────────────────────┐
│        ✏️ Editar Perfil                 │
│                                          │
│         ┌─────────────┐                 │
│         │   📸 Foto   │                 │
│         │             │                 │
│         └─────────────┘                 │
│      [ Cambiar imagen ]                 │
│                                          │
│  Nombre: ___________________________    │
│                                          │
│  Descripción:                           │
│  ┌──────────────────────────────────┐   │
│  │                                  │   │
│  │                                  │   │
│  └──────────────────────────────────┘   │
│                                          │
│       [ GUARDAR CAMBIOS ]               │
└─────────────────────────────────────────┘
```

</details>

<details>
<summary>🏪 <b>Detalle de Negocio</b></summary>
<br>

```
┌─────────────────────────────────────────┐
│  🍕 Pizzería Don Giuseppe               │
│  ⭐⭐⭐⭐⭐ (4.8) • 127 reseñas           │
│                                          │
│  📍 Av. Principal 123                   │
│  🕐 Lun-Dom: 12:00 - 22:00             │
│  📞 +52 333 123 4567                    │
│                                          │
│  ┌────────────────────────────────┐     │
│  │  📸 Galería de imágenes        │     │
│  └────────────────────────────────┘     │
│                                          │
│  💬 Reseñas Recientes:                  │
│  ┌────────────────────────────────┐     │
│  │ ⭐⭐⭐⭐⭐ Juan P.                 │     │
│  │ "¡Excelente servicio!"         │     │
│  └────────────────────────────────┘     │
└─────────────────────────────────────────┘
```

</details>

---

## 🚀 Instalación

### Prerequisitos

- Node.js 16+ y npm
- Python 3.9+
- MySQL 8.0+
- Git

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/lilbovio/mychangarro.git
cd mychangarro
```

### 2️⃣ Configurar Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En Mac/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Crear archivo .env
cp .env.example .env
# Edita .env con tus credenciales
```

### 3️⃣ Configurar Base de Datos

```sql
-- Crear base de datos
CREATE DATABASE mychangarro;

-- Importar schema
mysql -u root -p mychangarro < schema.sql
```

### 4️⃣ Configurar Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env
# Edita .env con la URL de tu backend
```

### 5️⃣ Iniciar Aplicación

```bash
# Terminal 1 - Backend
cd backend
python run.py

# Terminal 2 - Frontend
cd frontend
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador 🎉

---

## ⚙️ Configuración

### Variables de Entorno - Backend

```env
# .env en /backend
FLASK_ENV=development
SECRET_KEY=tu-clave-secreta

# Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=mychangarro
DB_PORT=3306

# CORS
CORS_ORIGINS=http://localhost:3000

# Storage (local, cloudinary, s3)
STORAGE_PROVIDER=local

# Cloudinary (opcional)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### Variables de Entorno - Frontend

```env
# .env en /frontend
REACT_APP_API_URL=http://localhost:5000
```

---

## 💻 Uso

### Registro de Usuario

1. Haz clic en "Registrarse"
2. Completa el formulario con tus datos
3. Confirma tu email (si está configurado)
4. ¡Listo! Ya puedes explorar negocios

### Crear un Negocio

1. Inicia sesión
2. Ve a "Mi Negocio"
3. Completa la información del negocio
4. Sube imágenes de tus productos
5. Tu negocio aparecerá en las búsquedas

### Dejar una Reseña

1. Busca el negocio que visitaste
2. Haz clic en "Escribir reseña"
3. Califica con estrellas (1-5)
4. Escribe tu experiencia
5. ¡Ayuda a otros usuarios!

---

## 📡 API Endpoints

### Autenticación

```http
POST /api/register      # Registrar usuario
POST /api/login         # Iniciar sesión
POST /api/logout        # Cerrar sesión
```

### Usuarios

```http
GET    /api/profile     # Obtener perfil
PUT    /api/profile     # Actualizar perfil
```

### Negocios

```http
GET    /api/businesses              # Listar negocios
GET    /api/businesses/:id          # Detalle de negocio
POST   /api/businesses              # Crear negocio
PUT    /api/businesses/:id          # Actualizar negocio
DELETE /api/businesses/:id          # Eliminar negocio
```

### Reseñas

```http
GET    /api/businesses/:id/reviews  # Reseñas de negocio
POST   /api/businesses/:id/reviews  # Crear reseña
PUT    /api/reviews/:id             # Actualizar reseña
DELETE /api/reviews/:id             # Eliminar reseña
```

---

## 🚢 Deployment

### Frontend (Vercel)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### Backend (Railway)

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login y deploy
railway login
railway init
railway up
```

### Base de Datos (PlanetScale)

1. Crea cuenta en [PlanetScale](https://planetscale.com)
2. Crea una nueva base de datos
3. Conecta usando las credenciales proporcionadas
4. Importa tu schema

### Configurar Cloudinary (Imágenes)

1. Crea cuenta en [Cloudinary](https://cloudinary.com)
2. Copia tus credenciales
3. Agrégalas a las variables de entorno
4. Cambia `STORAGE_PROVIDER=cloudinary`

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. 🍴 Fork el proyecto
2. 🌿 Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. 📤 Push a la rama (`git push origin feature/AmazingFeature`)
5. 🎉 Abre un Pull Request

### Guía de Commits

- `Add:` Nueva funcionalidad
- `Fix:` Corrección de bug
- `Update:` Actualización de código existente
- `Remove:` Eliminación de código
- `Docs:` Cambios en documentación

---

## 🗺 Roadmap

- [x] Sistema de autenticación
- [x] Perfiles de usuario
- [x] Listado de negocios
- [x] Sistema de reseñas
- [ ] Chat en tiempo real
- [ ] Sistema de reservaciones
- [ ] Programa de lealtad
- [ ] App móvil (React Native)
- [ ] Panel de administración
- [ ] Analytics para negocios
- [ ] Pagos integrados
- [ ] API pública

Ver [issues abiertos](https://github.com/lilbovio/mychangarro/issues) para una lista completa de features propuestos y bugs conocidos.

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

---

## 📞 Contacto

**Equipo MyChangarro**

- 📧 Email: jboviovallejo@gmail.com
- 🐦 Instagram: [@lilpuzziv3rt](https://www.instagram.com/lilpuzziv3rt/)
- 🌐 Website: [www.mychangarro.com](https://juanbovioportfolio.vercel.app/)

**Link del Proyecto:** [https://github.com/tu-usuario/mychangarro](https://github.com/tu-usuario/mychangarro)

---

## 🙏 Agradecimientos

- [React](https://reactjs.org/) - La librería UI que usamos
- [Flask](https://flask.palletsprojects.com/) - Framework backend
- [MySQL](https://www.mysql.com/) - Base de datos
- [Vercel](https://vercel.com/) - Hosting del frontend
- [Railway](https://railway.app/) - Hosting del backend
- [Cloudinary](https://cloudinary.com/) - Almacenamiento de imágenes
- [Font Awesome](https://fontawesome.com/) - Iconos
- A todos nuestros contribuidores ❤️

---

<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella ⭐**

Hecho con ❤️ por el equipo de MyChangarro

[⬆ Volver arriba](#-mychangarro)

</div>