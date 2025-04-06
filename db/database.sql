CREATE DATABASE IF NOT EXISTS carpinteria;
USE carpinteria;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    es_admin BOOLEAN NOT NULL DEFAULT 0
);

-- Tabla de muebles
CREATE TABLE muebles (
    id_mueble INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(255)
);
