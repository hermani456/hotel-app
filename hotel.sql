CREATE DATABASE hotel;

USE hotel;

CREATE TABLE hotel (
    id_hotel INT PRIMARY KEY,
    nombre VARCHAR(255),
    direccion VARCHAR(255),
    telefono VARCHAR(15),
    email VARCHAR(255),
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
    estado VARCHAR(20)
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
    precio_total DECIMAL(10, 2)
);

CREATE TABLE pago (
    id_pago INT PRIMARY KEY,
    id_reserva INT NOT NULL REFERENCES reserva(id_reserva),
    valor DECIMAL(10, 2),
    dia_pago DATE,
    metodo_pago VARCHAR(50)
);

CREATE OR REPLACE FUNCTION update_room_status() RETURNS TRIGGER AS $$
BEGIN
   UPDATE habitacion SET estado = 'Ocupada' WHERE numero_habitacion = NEW.numero_habitacion;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER room_status_update AFTER INSERT ON reserva
FOR EACH ROW EXECUTE PROCEDURE update_room_status();

INSERT INTO hotel VALUES (1, 'Hotel California', 'Calle 1 # 2-3', '1234567', 'hotel@hotel.com', '15:00:00', '12:00:00');

INSERT INTO tipo_habitacion VALUES (1, 'Sencilla', 'Habitación sencilla', 100000, 1);
INSERT INTO tipo_habitacion VALUES (2, 'Doble', 'Habitación doble', 150000, 2);

INSERT INTO habitacion VALUES (1, 1, 1, 'Disponible');
INSERT INTO habitacion VALUES (2, 1, 1, 'Disponible');
INSERT INTO habitacion VALUES (3, 1, 2, 'Disponible');

INSERT INTO huesped VALUES (1, 'Juan', 'Perez', '1990-01-01', 'Calle 456', '1234567', 'juan@juan.cl');

INSERT INTO reserva VALUES (1, 1, 1, '2021-01-01', '2021-01-03', 200000);
INSERT INTO reserva VALUES (2, 1, 2, '2021-01-01', '2021-01-03', 300000);

INSERT INTO pago VALUES (1, 1, 200000, '2021-01-01', 'Efectivo');

-- check habitaciones disponible
-- SELECT * FROM habitacion WHERE estado = 'Disponible';