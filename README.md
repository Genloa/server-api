# API de Usuarios y Criptomonedas

## Descripción

Esta es una API RESTful construida con Node.js, Express y Sequelize que permite gestionar usuarios, operaciones con criptomonedas y autenticación mediante JWT. Incluye rutas protegidas, encriptación de contraseñas con bcrypt y estructura modular.

## Tecnologías utilizadas

- Node.js
- Express
- Sequelize
- PostgreSQL
- JWT (JSON Web Tokens)
- Bcrypt
- Postman (para pruebas)

## Instalación

1. Clonar el repositorio:
   git clone https://github.com/Genloa/server-api.git

2. Instalar dependencias:
   cd server-api
   npm install

## Configuración

Crear un archivo `.env` en la raíz con las siguientes variables:

JWT_SECRET=tu_clave_secreta  
DB_HOST=localhost  
DB_USER=postgres  
DB_PASSWORD=tu_password  
DB_NAME=nombre_base_datos  
DB_PORT=5432

## Scripts disponibles

- `npm run start` → Inicia el servidor
- `npm run dev` → Inicia con nodemon
- `npx sequelize db:migrate` → Ejecuta las migraciones

## Autenticación

- Registro: `POST /auth/register`
- Login: `POST /auth/login` → retorna un token JWT
- Las rutas protegidas requieren el siguiente header:

Authorization: Bearer <token>

## Endpoints

| Método | Ruta                            | Descripción                                    | Protegida |
| ------ | ------------------------------- | ---------------------------------------------- | --------- |
| POST   | /auth/register                  | Crear nuevo usuario                            | ❌        |
| POST   | /auth/login                     | Autenticación y generación de token            | ❌        |
| GET    | /getUsuarios                    | Listar todos los usuarios                      | ✅        |
| PUT    | /updateUsuario                  | Actualizar datos de usuario                    | ✅        |
| DELETE | /deleteUsuario                  | Eliminar usuario por cédula                    | ✅        |
| ------ | ------------------------------- | ---------------------------------------------- | --------- |
| POST   | /createCriptoMoneda             | Crear nueva cripto moneda                      | ✅        |
| GET    | /getCriptoMonedas               | Listar todos las cripto monedas                | ✅        |
| PUT    | /updateCriptoMoneda             | Actualizar datos de cripto moneda              | ✅        |
| DELETE | /deleteCriptoMoneda             | Eliminar cripto moneda por codigo              | ✅        |
| POST   | /getCriptoMonedasByCodigoMoneda | Buscar por codigo de moneda las cripto monedas | ✅        |
| ------ | ------------------------------- | ---------------------------------------------- | --------- |
| POST   | /createCriptoMoneda             | Crear nueva moneda                             | ✅        |
| GET    | /getMonedas                     | Listar todos las monedas                       | ✅        |
| PUT    | /updateMoneda                   | Actualizar datos de Moneda                     | ✅        |
| DELETE | /deleteMoneda                   | Eliminar Moneda por codigo                     | ✅        |
| ------ | ------------------------------- | ---------------------------------------------- | --------- |
| POST   | /createOperacionCripto          | Crear nueva Operacion cripto moneda            | ✅        |
| GET    | /getOperacionesCripto           | Listar todos las Operaciones de cripto monedas | ✅        |
| PUT    | /updateOperacionCripto          | Actualizar estado de Operacion cripto moneda   | ✅        |
| DELETE | /deleteOperacionCripto          | Eliminar Operacion de cripto moneda por id     | ✅        |

## Pruebas con Postman

1. Autenticarse en `/auth/login`
2. Copiar el token recibido
3. Usarlo en rutas protegidas como header:

Authorization: Bearer <token>

## Buenas prácticas implementadas

- Contraseñas encriptadas con bcrypt
- Tokens con expiración de 2 horas
- Middleware modular para validación de token
- Estructura clara y escalable
- Naming profesional en modelos y rutas
