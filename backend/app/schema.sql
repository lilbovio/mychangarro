-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    nombre VARCHAR(100),
    descripcion TEXT
);

-- Tabla de negocios
CREATE TABLE negocios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    direccion VARCHAR(255),
    categoria ENUM('comida', 'servicios') NOT NULL,
    imagen TEXT
);

-- Tabla de reseñas
CREATE TABLE resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    negocio_id INT NOT NULL,
    opinion TEXT,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    resena TEXT,
    FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE
);