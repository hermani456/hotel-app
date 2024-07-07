# Proyecto Hotel Duerme Bien

## Instalación y Ejecución del Proyecto

### Requisitos Previos

Asegúrate de tener:

- Node.js (recomendamos la última versión LTS)
- npm (viene con Node.js)
- PostgreSQL
- Git
- Una cuenta en [Clerk](https://clerk.com)

### Instalación de Node.js y npm

#### Windows

1. Descarga el instalador de Node.js desde la [página oficial](https://nodejs.org/).
2. Ejecuta el instalador y sigue las instrucciones en pantalla.
3. Verifica la instalación abriendo una terminal y ejecutando:

```bash
node -v
npm -v
```

#### Linux

Para distribuciones basadas en Debian/Ubuntu:

```bash
sudo apt update
sudo apt install nodejs npm
```

Para distribuciones basadas en Red Hat/Fedora:

```bash
sudo dnf install nodejs npm
```

Verifica la instalación ejecutando:

```bash
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

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

Para distribuciones basadas en Red Hat/Fedora:

```bash
sudo dnf install postgresql-server postgresql-contrib
```

Inicia el servicio de PostgreSQL:

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Instalación de Git

#### Windows

1. Descarga el instalador de Git desde la [página oficial](https://git-scm.com/download/win).
2. Ejecuta el instalador y sigue las instrucciones en pantalla.
3. Verifica la instalación abriendo una terminal y ejecutando:

```bash
git --version
```

#### Linux

Para distribuciones basadas en Debian/Ubuntu:

```bash
sudo apt update
sudo apt install git
```

Para distribuciones basadas en Red Hat/Fedora:

```bash
sudo dnf install git
```

Verifica la instalación ejecutando:

```bash
git --version
```

### Configuración de la Base de Datos

1. Conéctate a PostgreSQL:

```bash
psql -U postgres
```

2. Crea la base de datos `hotel`:

```sql
CREATE DATABASE hotel;
```

3. Conéctate a la base de datos `hotel`:

```sql
\c hotel;
```

4. Crea las tablas necesarias:

```sql
    CREATE TABLE hotel (
       id_hotel INT PRIMARY KEY,
       nombre VARCHAR(255),
       direccion VARCHAR(255),
       telefono VARCHAR(15),
       email VARCHAR(255)
   );

   CREATE TABLE tipo_habitacion (
       id_tipo_habitacion SERIAL PRIMARY KEY,
       nombre VARCHAR(50),
       descripcion VARCHAR(255),
       capacidad INT
   );

   CREATE TABLE habitacion (
       numero_habitacion INT PRIMARY KEY,
       id_hotel INT NOT NULL REFERENCES hotel(id_hotel),
       id_tipo_habitacion INT NOT NULL REFERENCES tipo_habitacion(id_tipo_habitacion),
       estado VARCHAR(20)
   );

   CREATE TABLE huesped (
       id_huesped SERIAL PRIMARY KEY,
       nombre VARCHAR(50),
       apellido VARCHAR(50),
       rut VARCHAR(15)
   );

   CREATE TABLE reserva (
       id_reserva SERIAL PRIMARY KEY,
       numero_habitacion INT NOT NULL REFERENCES habitacion(numero_habitacion),
       fecha_checkin DATE,
       fecha_checkout DATE,
       precio_total INT
   );

   CREATE TABLE reserva_huesped (
       id_reserva INT NOT NULL,
       id_huesped INT NOT NULL,
       PRIMARY KEY (id_reserva, id_huesped),
       FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva),
       FOREIGN KEY (id_huesped) REFERENCES huesped(id_huesped)
   );
```

5. Inserta un registro en la tabla `hotel`:

```sql
INSERT INTO hotel VALUES (1, 'Hotel Duerme Bien', 'Calle 1 # 2-3', '1234567', 'hotel@hotel.cl');
```

### Configuración de Clerk

1. **Crear una cuenta en Clerk**
   - Visita [Clerk](https://clerk.com) y crea una cuenta si aún no tienes una.
   - Una vez creada la cuenta, configura tu primer proyecto siguiendo las instrucciones de la plataforma.

2. **Configurar Organización y Roles**
   - En el panel de administración de Clerk, navega a la sección de "Organizaciones".
   - Crea una nueva organización.
   - Dentro de la organización, crea dos roles: `admin` y `empleado`.

3. **Obtener las Claves del Proyecto**
   - Desde el panel de configuración de tu proyecto en Clerk, extrae `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY`.

4. **Agregar Claves al Archivo `.env.local`**
   - Abre el archivo `.env.local` en el directorio de tu proyecto.
   - Añade las claves obtenidas de Clerk como se muestra a continuación:
     ```env
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clave_publicable
     CLERK_SECRET_KEY=tu_clave_secreta
     ```

5. **Configurar Método de Inicio de Sesión**
   - En el panel de administración de Clerk, selecciona la configuración de tu proyecto.
   - Elige el método de inicio de sesión mediante "Email y Contraseña".

6. **Crear Usuarios y Asignar Roles**
   - Ve a la sección de "Usuarios" en el panel de administración de Clerk.
   - Crea las siguientes cuentas de usuario:
     - **admin@duermebien.cl** con el rol `admin`
     - **empleado@duermebien.cl** con el rol `empleado`
   - Asigna cada usuario a su respectivo rol dentro de la organización.
   - Para cada usuario, añade la metadata insegura (unsafe metadata) con los siguientes valores:
     - Para `admin@duermebien.cl`:
```json
{
  "role": "admin"
}
```
     - Para `empleado@duermebien.cl`:
```json
{
  "role": "empleado"
}
```


### Configuración del Entorno

1. Clona el repositorio del proyecto desde GitHub:

```bash
git clone --branch now --single-branch https://github.com/hermani456/hotel-app.git
```

2. Ingresa a la carpeta del proyecto

```bash
cd hotel-app
```

3. Instala las dependencias del proyecto ejecutando el siguiente comando en tu terminal:

```bash
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

```bash
npm run dev
```

Esto iniciará tu aplicación en `http://localhost:3000`, donde podrás acceder a ella desde tu navegador.

### Test de Aplicación Web

Prueba la aplicación ingresando a: [Hotel Duerme Bien](https://hotel-app-production-104f.up.railway.app/)

---
