# Proyecto Hotel California

## Instalación y Ejecución del Proyecto

### Requisitos Previos

Asegúrate de tener instalado:

- Node.js (recomendamos la última versión LTS)
- npm (viene con Node.js)
- PostgreSQL

### Configuración del Entorno

1. Clona el repositorio del proyecto:

```markdown
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>
```


2. Instala las dependencias del proyecto ejecutando el siguiente comando en tu terminal:

```bash
npm install
```

3. Configura las variables de entorno necesarias para tu aplicación. Esto incluye las credenciales de tu base de datos PostgreSQL y cualquier otra configuración específica del entorno. Crea un archivo `.env` en la raíz de tu proyecto y añade las siguientes variables (ajusta los valores según tu configuración de PostgreSQL):

## Configuración de `.env.local`

A continuación se detallan las variables de entorno configuradas en el archivo `.env.local`:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clave pública de Clerk, utilizada para la autenticación y configuración del frontend. Ejemplo: `pk_test_***************`.
- `CLERK_SECRET_KEY`: Clave secreta de Clerk, utilizada en el backend para autenticación y operaciones seguras. Ejemplo: `sk_test_***************`.
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: URL para la página de inicio de sesión. Ejemplo: `/sign-in`.
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: URL para la página de registro. Ejemplo: `/sign-up`.
- `PGUSER`: Usuario de PostgreSQL. Ejemplo: `postgres`.
- `PGHOST`: Host de la base de datos PostgreSQL. Ejemplo: `***************`.
- `PGDATABASE`: Nombre de la base de datos PostgreSQL. Ejemplo: `hotel`.
- `PGPASSWORD`: Contraseña para el usuario de la base de datos PostgreSQL. Ejemplo: `***************`.
- `PGPORT`: Puerto para la conexión a la base de datos PostgreSQL. Ejemplo: `*****`.


### Ejecución del Proyecto

Una vez configurado el entorno y la base de datos, puedes iniciar el servidor de desarrollo con:

```bash
npm run dev
```

Esto iniciará tu aplicación en `http://localhost:3000`, donde podrás acceder a ella desde tu navegador.

### Test de Aplicacion Web

- Prueba la aplicacion Ingresando a:
```markdown
https://hotel-app-production-104f.up.railway.app/
```