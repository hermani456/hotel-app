# Proyecto Hotel Duerme Bien

## Instalación y Ejecución del Proyecto

### Requisitos Previos

Asegúrate de tener instalado:

- Node.js (recomendamos la última versión LTS)
- npm (viene con Node.js)
- PostgreSQL

### Instalación de Node.js y npm

#### Windows

1. Descarga el instalador de Node.js desde la [página oficial](https://nodejs.org/).
2. Ejecuta el instalador y sigue las instrucciones en pantalla.
3. Verifica la instalación abriendo una terminal y ejecutando:

    ```
    node -v
    npm -v
    ```

#### Linux

Para distribuciones basadas en Debian/Ubuntu:

    ```
    sudo apt update
    sudo apt install nodejs npm
    ```

Para distribuciones basadas en Red Hat/Fedora:

    ```
    sudo dnf install nodejs npm
    ```

Verifica la instalación ejecutando:

    ```
    node -v
    npm -v
    ```

### Instalación de PostgreSQL

#### Windows

1. Descarga el instalador de PostgreSQL desde la [página oficial](https://www.postgresql.org/download/windows/).
2. Ejecuta el instalador y sigue las instrucciones en pantalla.
3. Durante la instalación, toma nota del puerto, el nombre de usuario y la contraseña configurados.

#### Linux

Para distribuciones basadas en Debian/Ubuntu:

    ```
    sudo apt update
    sudo apt install postgresql postgresql-contrib
    ```

Para distribuciones basadas en Red Hat/Fedora:

    ```
    sudo dnf install postgresql-server postgresql-contrib
    ```

Inicia el servicio de PostgreSQL:

    ```
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    ```

### Configuración del Entorno

1. Clona el repositorio del proyecto desde GitHub:

    ```
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>
    ```

2. Instala las dependencias del proyecto ejecutando el siguiente comando en tu terminal:

    ```
    npm install
    ```

3. Configura las variables de entorno necesarias para tu aplicación. Esto incluye las credenciales de tu base de datos PostgreSQL y cualquier otra configuración específica del entorno. Crea un archivo `.env.local` en la raíz de tu proyecto y añade las siguientes variables (ajusta los valores según tu configuración de PostgreSQL):

#### Configuración de `.env.local`

A continuación se detallan las variables de entorno configuradas en el archivo `.env.local`:

    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_***************
    CLERK_SECRET_KEY=sk_test_***************
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    PGUSER=postgres
    PGHOST=localhost
    PGDATABASE=hotel
    PGPASSWORD=***************
    PGPORT=5432
    ```

### Ejecución del Proyecto

Una vez configurado el entorno y la base de datos, puedes iniciar el servidor de desarrollo con:

    ```
    npm run dev
    ```

Esto iniciará tu aplicación en `http://localhost:3000`, donde podrás acceder a ella desde tu navegador.

### Test de Aplicación Web

Prueba la aplicación ingresando a: [Hotel Duerme Bien](https://hotel-app-production-104f.up.railway.app/)

---

