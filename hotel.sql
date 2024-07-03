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
    precio INT,
    capacidad INT
);

CREATE SEQUENCE id_tipo_habitacion_seq START WITH 3;
ALTER TABLE tipo_habitacion ALTER COLUMN id_tipo_habitacion SET DEFAULT nextval('id_tipo_habitacion_seq');
ALTER SEQUENCE id_tipo_habitacion_seq OWNED BY tipo_habitacion.id_tipo_habitacion;

CREATE SEQUENCE reserva_id_reserva_seq START WITH 1;
ALTER TABLE reserva ALTER COLUMN id_reserva SET DEFAULT nextval('reserva_id_reserva_seq');
ALTER SEQUENCE reserva_id_reserva_seq OWNED BY reserva.id_reserva;

ALTER TABLE tipo_habitacion
ALTER COLUMN precio TYPE INT USING precio::INT;

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

CREATE TABLE reserva_huesped (
    id_reserva INT NOT NULL,
    id_huesped INT NOT NULL,
    PRIMARY KEY (id_reserva, id_huesped),
    FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva),
    FOREIGN KEY (id_huesped) REFERENCES huesped(id_huesped)
);

INSERT INTO reserva_huesped (id_reserva, id_huesped) VALUES (1, 1); -- Asocia el huésped 1 con la reserva 1
INSERT INTO reserva_huesped (id_reserva, id_huesped) VALUES (1, 2); -- Asocia el huésped 2 con la reserva 1

SELECT r.id_reserva, h.id_huesped, h.nombre 
FROM reserva_huesped rh
JOIN reserva r ON rh.id_reserva = r.id_reserva
JOIN huesped h ON rh.id_huesped = h.id_huesped
WHERE r.id_reserva = 1; -- Cambia el 1 por el ID de la reserva que te interese

CREATE SEQUENCE id_huesped_seq START WITH 3;
ALTER TABLE huesped ALTER COLUMN id_huesped SET DEFAULT nextval('id_huesped_seq');
ALTER SEQUENCE id_huesped_seq OWNED BY huesped.id_huesped;

CREATE TABLE reserva (
    id_reserva SERIAL PRIMARY KEY,
    -- id_huesped INT NOT NULL REFERENCES huesped(id_huesped),
    numero_habitacion INT NOT NULL REFERENCES habitacion(numero_habitacion),
    fecha_checkin DATE,
    fecha_checkout DATE,
    precio_total INT
);

CREATE SEQUENCE reserva_id_reserva_seq;
ALTER TABLE reserva ALTER COLUMN id_reserva SET DEFAULT nextval('reserva_id_reserva_seq');
SELECT setval('reserva_id_reserva_seq', COALESCE((SELECT MAX(id_reserva)+1 FROM reserva), 1), false);

ALTER TABLE reserva
ALTER COLUMN precio_total TYPE INT USING precio_total::INT;

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
INSERT INTO tipo_habitacion (nombre, descripcion, precio, capacidad) VALUES ('Triple', 'Habitación triple', 200000, 3);

INSERT INTO habitacion VALUES (1, 1, 1, 'Disponible');
INSERT INTO habitacion VALUES (2, 1, 1, 'Disponible');
INSERT INTO habitacion VALUES (3, 1, 2, 'Disponible');

-- select from reserva nombre tipo_habitacion

-- INSERT INTO Habitacion (numero_habitacion, id_hotel, id_tipo_habitacion, estado) VALUES (4, 1, 2, 'Disponible');

INSERT INTO huesped VALUES (1, 'Juan', 'Perez', '1990-01-01', 'Calle 456', '1234567', 'juan@juan.cl');

INSERT INTO huesped (nombre, apellido, direccion, telefono, email) VALUES ('Maria', 'Lopez', 'Calle 789', '7654321', 'mail@mail.cl');

INSERT INTO reserva VALUES (1, 1, 1, '2021-01-01', '2021-01-03', 200000);
INSERT INTO reserva VALUES (2, 1, 2, '2021-01-01', '2021-01-03', 300000);

INSERT INTO reserva (numero_habitacion, fecha_checkin, fecha_checkout, precio_total) VALUES (3, '2021-01-01', '2021-01-03', 400000);

INSERT INTO pago VALUES (1, 1, 200000, '2021-01-01', 'Efectivo');

-- check habitaciones disponible
-- SELECT * FROM habitacion WHERE estado = 'Disponible';

-- select from tipo_habitacion and habitacion;
SELECT numero_habitacion, nombre, descripcion, precio, capacidad, estado FROM habitacion h INNER JOIN tipo_habitacion th ON h.id_tipo_habitacion = th.id_tipo_habitacion;

delete from huesped where id_huesped = 2;

SELECT
    h.nombre AS nombre_huesped,
    h.apellido,
    hab.numero_habitacion,
    th.capacidad,
    r.fecha_checkin,
    r.fecha_checkout
FROM reserva r
JOIN reserva_huesped rh ON r.id_reserva = rh.id_reserva
JOIN huesped h ON rh.id_huesped = h.id_huesped
JOIN habitacion hab ON r.numero_habitacion = hab.numero_habitacion
JOIN tipo_habitacion th ON hab.id_tipo_habitacion = th.id_tipo_habitacion;