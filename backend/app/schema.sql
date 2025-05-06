CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    nombre VARCHAR(100),
    descripcion TEXT
);

CREATE TABLE negocios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    direccion VARCHAR(255),
    categoria ENUM('comida', 'servicios') NOT NULL,
    imagen TEXT
);

CREATE TABLE resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    negocio_id INT,
    opinion TEXT,
    calificacion INT,
    resena TEXT,
    FOREIGN KEY (negocio_id) REFERENCES negocios(id)
);
