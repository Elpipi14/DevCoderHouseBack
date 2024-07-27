# Proyecto E-commerce de Zapatillas

## Descripción del Proyecto

Este proyecto es una tienda en línea para la venta de zapatillas. La aplicación utiliza diversas tecnologías y librerías para proporcionar una experiencia de usuario fluida y segura, incluyendo autenticación, compresión de datos, manejo de cookies, conexiones en tiempo real y más.

## Tecnologías y Librerías Utilizadas

### Backend

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para aplicaciones web en Node.js.
- **Mongoose**: Librería de modelado de datos de MongoDB para Node.js.
- **Passport.js**: Middleware para autenticación.
- **Socket.io**: Biblioteca para la comunicación en tiempo real.
- **Handlebars**: Motor de plantillas para generar vistas HTML.
- **Compression**: Middleware para la compresión de respuestas HTTP.
- **Method-Override**: Middleware para soportar métodos HTTP adicionales.
- **Cookie-Parser**: Middleware para el manejo de cookies.
- **Winston**: Librería para el registro de logs.
- **Swagger**: Herramienta para la documentación de APIs.
- **Cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **Bcrypt**: Librería para el hash de contraseñas.
- **Nodemailer**: Librería para el envío de correos electrónicos.
- **Multer**: Middleware para la gestión de archivos.
- **MercadoPago**: SDK para integrar pagos.

### Frontend

- **Bootstrap**: Framework CSS para diseño responsivo.
- **SweetAlert2**: Biblioteca para mostrar alertas bonitas.

## Instalación

1. Clonar el repositorio:

   ```bash
    git clone https://github.com/tu-usuario/nombre-del-repo.git
    cd nombre-del-repo

   ```

2. Instalar las dependencias:

````bash
  npm install

   ```

3. Configurar las variables de entorno en un archivo .env:

```env
  Copiar código
  PORT=3000
  DB_URI=your_mongodb_uri
  SESSION_SECRET=your_session_secret
  JWT_SECRET=your_jwt_secret
```


3.  Ejecución
```Para iniciar la aplicación en modo desarrollo:

```bash
  npm run dev

```Para iniciar la aplicación en modo producción:
  npm start
```

Estructura del Proyecto
plaintext
Copiar código
src/
│
├── config/
│   ├── passport.config.js
│   └── config.js
├── helpers/
│   ├── multiply.js
│   ├── swagger/
│   │   └── swagger.js
├── middleware/
│   └── errors.js
├── mongoDb/
│   └── connection/
│       └── mongooseConnection.js
├── public/
│   └── (archivos estáticos)
├── routes/
│   └── routes.js
├── socket/
│   └── socket.io.js
├── utils/
│   └── logger.js
└── views/
  └── (plantillas Handlebars)

Descripción de los Archivos Principales
  app.js: Archivo principal que configura y arranca el servidor.
  mongooseConnection.js: Configuración y conexión a la base de datos MongoDB.
  passport.config.js: Configuración de estrategias de autenticación.
  routes.js: Definición de rutas de la aplicación.
  socket.io.js: Configuración de Socket.io para comunicación en tiempo real.
  swagger.js: Configuración y setup de Swagger para la documentación de la API.
  logger.js: Configuración de Winston para el registro de logs.
  errors.js: Middleware para el manejo de errores.
  Funcionalidades Clave
  Autenticación: Utiliza Passport.js con estrategias locales y de terceros (GitHub).
  Compresión: Middleware para comprimir las respuestas HTTP.
  Manejo de Errores: Middleware centralizado para el manejo de errores.
  Documentación de API: Swagger para documentar y probar la API.
  Subida de Archivos: Utiliza Multer para gestionar la subida de archivos.
  Pagos: Integración con MercadoPago para procesar pagos.
  Vistas Dinámicas: Utiliza Handlebars para generar vistas dinámicas.
  Logs: Utiliza Winston para el registro de eventos y errores.
  Notificaciones: Utiliza SweetAlert2 para mostrar notificaciones al usuario.

4. Contribuir
  Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.
````
