CREATE TABLE hotel (
    id_hotel INT PRIMARY KEY,
    nombre VARCHAR(255),
    direccion VARCHAR(255),
    telefono VARCHAR(15),
    email VARCHAR(255),
    valoracion INT,
    hora_checkin TIME,
    hora_checkout TIME
);

CREATE TABLE tipo_habitacion (
    id_tipo_habitacion INT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(255),
    precio DECIMAL(10, 2),
    capacidad INT
);

CREATE TABLE habitacion (
    numero_habitacion INT PRIMARY KEY,
    id_hotel INT NOT NULL REFERENCES hotel(id_hotel),
    id_tipo_habitacion INT NOT NULL REFERENCES tipo_habitacion(id_tipo_habitacion),
    estado VARCHAR(20),
);

CREATE TABLE huesped (
    id_huesped INT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fecha_nacimiento DATE,
    direccion VARCHAR(255),
    telefono VARCHAR(15),
    email VARCHAR(255)
);

CREATE TABLE reserva (
    id_reserva INT PRIMARY KEY,
    id_huesped INT NOT NULL REFERENCES huesped(id_huesped),
    numero_habitacion INT NOT NULL REFERENCES habitacion(numero_habitacion),
    fecha_checkin DATE,
    fecha_checkout DATE,
    precio_total DECIMAL(10, 2),
);

CREATE TABLE pago (
    id_pago INT PRIMARY KEY,
    id_reserva INT NOT NULL REFERENCES reserva(id_reserva),
    valor DECIMAL(10, 2),
    dia_pago DATE,
    metodo_pago VARCHAR(50),
);