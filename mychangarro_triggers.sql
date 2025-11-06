-- ============================================
-- SISTEMA DE AUDITORÍA PARA MYCHANGARRO
-- ============================================

-- 1. CREAR TABLA DE AUDITORÍA
CREATE TABLE IF NOT EXISTS auditoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tabla VARCHAR(50) NOT NULL,
    operacion ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    registro_id INT NOT NULL,
    usuario_id INT,
    datos_anteriores TEXT,
    datos_nuevos TEXT,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    descripcion VARCHAR(255),
    INDEX idx_tabla_operacion (tabla, operacion),
    INDEX idx_fecha (fecha_hora),
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 2. TRIGGERS PARA TABLA NEGOCIOS
-- ============================================

-- Trigger AFTER INSERT en negocios
DELIMITER //
CREATE TRIGGER trg_negocios_after_insert
AFTER INSERT ON negocios
FOR EACH ROW
BEGIN
    INSERT INTO auditoria (
        tabla, 
        operacion, 
        registro_id, 
        datos_nuevos,
        descripcion
    ) VALUES (
        'negocios',
        'INSERT',
        NEW.id,
        JSON_OBJECT(
            'nombre', NEW.nombre,
            'descripcion', NEW.descripcion,
            'direccion', NEW.direccion,
            'categoria', NEW.categoria,
            'imagen', NEW.imagen
        ),
        CONCAT('Nuevo negocio creado: ', NEW.nombre)
    );
END//
DELIMITER ;

-- Trigger AFTER UPDATE en negocios
DELIMITER //
CREATE TRIGGER trg_negocios_after_update
AFTER UPDATE ON negocios
FOR EACH ROW
BEGIN
    INSERT INTO auditoria (
        tabla, 
        operacion, 
        registro_id, 
        datos_anteriores,
        datos_nuevos,
        descripcion
    ) VALUES (
        'negocios',
        'UPDATE',
        NEW.id,
        JSON_OBJECT(
            'nombre', OLD.nombre,
            'descripcion', OLD.descripcion,
            'direccion', OLD.direccion,
            'categoria', OLD.categoria,
            'imagen', OLD.imagen
        ),
        JSON_OBJECT(
            'nombre', NEW.nombre,
            'descripcion', NEW.descripcion,
            'direccion', NEW.direccion,
            'categoria', NEW.categoria,
            'imagen', NEW.imagen
        ),
        CONCAT('Negocio actualizado: ', NEW.nombre)
    );
END//
DELIMITER ;

-- Trigger AFTER DELETE en negocios
DELIMITER //
CREATE TRIGGER trg_negocios_after_delete
AFTER DELETE ON negocios
FOR EACH ROW
BEGIN
    INSERT INTO auditoria (
        tabla, 
        operacion, 
        registro_id, 
        datos_anteriores,
        descripcion
    ) VALUES (
        'negocios',
        'DELETE',
        OLD.id,
        JSON_OBJECT(
            'nombre', OLD.nombre,
            'descripcion', OLD.descripcion,
            'direccion', OLD.direccion,
            'categoria', OLD.categoria,
            'imagen', OLD.imagen
        ),
        CONCAT('Negocio eliminado: ', OLD.nombre)
    );
END//
DELIMITER ;

-- ============================================
-- 3. TRIGGERS PARA TABLA RESENAS
-- ============================================

-- Trigger AFTER INSERT en resenas
DELIMITER //
CREATE TRIGGER trg_resenas_after_insert
AFTER INSERT ON resenas
FOR EACH ROW
BEGIN
    INSERT INTO auditoria (
        tabla, 
        operacion, 
        registro_id,
        usuario_id,
        datos_nuevos,
        descripcion
    ) VALUES (
        'resenas',
        'INSERT',
        NEW.id,
        (SELECT id FROM usuarios WHERE usuario = (SELECT usuario FROM usuarios LIMIT 1)),
        JSON_OBJECT(
            'negocio_id', NEW.negocio_id,
            'opinion', NEW.opinion,
            'calificacion', NEW.calificacion,
            'resena', NEW.resena
        ),
        CONCAT('Nueva reseña creada para negocio ID: ', NEW.negocio_id)
    );
END//
DELIMITER ;

-- Trigger AFTER UPDATE en resenas
DELIMITER //
CREATE TRIGGER trg_resenas_after_update
AFTER UPDATE ON resenas
FOR EACH ROW
BEGIN
    INSERT INTO auditoria (
        tabla, 
        operacion, 
        registro_id,
        datos_anteriores,
        datos_nuevos,
        descripcion
    ) VALUES (
        'resenas',
        'UPDATE',
        NEW.id,
        JSON_OBJECT(
            'negocio_id', OLD.negocio_id,
            'opinion', OLD.opinion,
            'calificacion', OLD.calificacion,
            'resena', OLD.resena
        ),
        JSON_OBJECT(
            'negocio_id', NEW.negocio_id,
            'opinion', NEW.opinion,
            'calificacion', NEW.calificacion,
            'resena', NEW.resena
        ),
        CONCAT('Reseña actualizada ID: ', NEW.id)
    );
END//
DELIMITER ;

-- Trigger AFTER DELETE en resenas
DELIMITER //
CREATE TRIGGER trg_resenas_after_delete
AFTER DELETE ON resenas
FOR EACH ROW
BEGIN
    INSERT INTO auditoria (
        tabla, 
        operacion, 
        registro_id,
        datos_anteriores,
        descripcion
    ) VALUES (
        'resenas',
        'DELETE',
        OLD.id,
        JSON_OBJECT(
            'negocio_id', OLD.negocio_id,
            'opinion', OLD.opinion,
            'calificacion', OLD.calificacion,
            'resena', OLD.resena
        ),
        CONCAT('Reseña eliminada ID: ', OLD.id)
    );
END//
DELIMITER ;

-- ============================================
-- 4. TRIGGERS PARA TABLA USUARIOS
-- ============================================

-- Trigger AFTER INSERT en usuarios
DELIMITER //
CREATE TRIGGER trg_usuarios_after_insert
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO auditoria (
        tabla, 
        operacion, 
        registro_id,
        usuario_id,
        datos_nuevos,
        descripcion
    ) VALUES (
        'usuarios',
        'INSERT',
        NEW.id,
        NEW.id,
        JSON_OBJECT(
            'usuario', NEW.usuario,
            'nombre', NEW.nombre,
            'descripcion', NEW.descripcion
        ),
        CONCAT('Nuevo usuario registrado: ', NEW.usuario)
    );
END//
DELIMITER ;

-- Trigger AFTER UPDATE en usuarios
DELIMITER //
CREATE TRIGGER trg_usuarios_after_update
AFTER UPDATE ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO auditoria (
        tabla, 
        operacion, 
        registro_id,
        usuario_id,
        datos_anteriores,
        datos_nuevos,
        descripcion
    ) VALUES (
        'usuarios',
        'UPDATE',
        NEW.id,
        NEW.id,
        JSON_OBJECT(
            'usuario', OLD.usuario,
            'nombre', OLD.nombre,
            'descripcion', OLD.descripcion
        ),
        JSON_OBJECT(
            'usuario', NEW.usuario,
            'nombre', NEW.nombre,
            'descripcion', NEW.descripcion
        ),
        CONCAT('Usuario actualizado: ', NEW.usuario)
    );
END//
DELIMITER ;

-- ============================================
-- 5. CONSULTAS ÚTILES PARA VERIFICAR AUDITORÍA
-- ============================================

-- Ver todos los registros de auditoría
-- SELECT * FROM auditoria ORDER BY fecha_hora DESC LIMIT 50;

-- Ver auditoría de un negocio específico
-- SELECT * FROM auditoria WHERE tabla = 'negocios' AND registro_id = 1;

-- Ver todas las operaciones de un día específico
-- SELECT * FROM auditoria WHERE DATE(fecha_hora) = CURDATE();

-- Ver estadísticas de operaciones
-- SELECT tabla, operacion, COUNT(*) as total 
-- FROM auditoria 
-- GROUP BY tabla, operacion;

-- ============================================
-- 6. COMANDOS PARA VERIFICAR TRIGGERS
-- ============================================

-- Ver todos los triggers creados
-- SHOW TRIGGERS FROM negocios_db;

-- Ver detalles de un trigger específico
-- SHOW CREATE TRIGGER trg_negocios_after_insert;

-- Eliminar un trigger (si necesitas modificarlo)
-- DROP TRIGGER IF EXISTS trg_negocios_after_insert;