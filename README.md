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

### Configuración del Entorno

1. Clona el repositorio del proyecto desde GitHub:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>
```

2. Instala las dependencias del proyecto ejecutando el siguiente comando en tu terminal:

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
