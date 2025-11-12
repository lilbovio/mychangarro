from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from datetime import datetime
from app.db import get_db
import logging

user_bp = Blueprint('user', __name__)

# Configuración para imágenes
UPLOAD_FOLDER = 'static/uploads/profile_images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE_MB = 2
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

logging.basicConfig(level=logging.DEBUG)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@user_bp.route('/profile', methods=['PUT'])
def update_profile():
    logging.debug("Entrando a la función update_profile")
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    try:
        data = request.form
        user_id = request.headers.get('X-User-ID')
        logging.debug(f"user_id recibido: {user_id}")

        if not user_id:
            logging.warning("ID de usuario no proporcionado")
            return jsonify({'error': 'ID de usuario requerido'}), 400

        # Verificar si el usuario existe
        cursor.execute("SELECT * FROM usuarios WHERE id = %s", (user_id,))
        user = cursor.fetchone()

        if not user:
            logging.warning(f"Usuario con ID {user_id} no encontrado")
            return jsonify({'error': 'Usuario no encontrado'}), 404

        # Preparar datos para actualizar
        update_fields = []
        update_values = []

        if 'nombre' in data:
            update_fields.append("nombre = %s")
            update_values.append(data['nombre'])

        if 'descripcion' in data:
            update_fields.append("descripcion = %s")
            update_values.append(data['descripcion'])

        # Procesar imagen si existe
        if 'imagen' in request.files:
            file = request.files['imagen']
            if file and file.filename:  # Verifica que el archivo tenga nombre
                logging.debug(f"Nombre del archivo recibido: {file.filename}")
                
                # Verificar tamaño
                file.seek(0, os.SEEK_END)
                file_size = file.tell()
                file.seek(0)  # Regresar al inicio
                
                if file_size > MAX_FILE_SIZE_BYTES:
                    logging.error(f"Tamaño del archivo excede el límite de {MAX_FILE_SIZE_MB}MB")
                    return jsonify({'error': f'El tamaño del archivo excede los {MAX_FILE_SIZE_MB}MB'}), 400

                if allowed_file(file.filename):
                    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
                    filename = secure_filename(f"{user_id}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{file.filename.rsplit('.', 1)[1].lower()}")
                    filepath = os.path.join(UPLOAD_FOLDER, filename)
                    file.save(filepath)

                    update_fields.append("imagen_url = %s")
                    update_values.append(f"/static/uploads/profile_images/{filename}")
                else:
                    logging.error("Tipo de archivo no permitido")
                    return jsonify({'error': 'Tipo de archivo no permitido'}), 400

        # Construir y ejecutar query
        if update_fields:
            update_query = "UPDATE usuarios SET " + ", ".join(update_fields) + " WHERE id = %s"
            update_values.append(user_id)

            cursor.execute(update_query, tuple(update_values))
            conn.commit()

        # SIEMPRE obtener usuario actualizado (incluso si no hubo cambios)
        cursor.execute("SELECT * FROM usuarios WHERE id = %s", (user_id,))
        updated_user = cursor.fetchone()
        logging.debug(f"Usuario actualizado: {updated_user}")
        
        # ⭐ IMPORTANTE: Devolver los nombres de campos que el frontend espera
        response_data = {
            'message': 'Perfil actualizado exitosamente',
            'user': {
                'id': updated_user['id'],
                'nombre': updated_user['nombre'],  # ← Cambiado de 'name' a 'nombre'
                'descripcion': updated_user['descripcion'],  # ← Cambiado de 'description'
                'imagen': updated_user['imagen_url']  # ← Cambiado de 'image_url' a 'imagen'
            }
        }
        logging.debug(f"Respuesta JSON: {response_data}")
        return jsonify(response_data), 200

    except Exception as e:
        conn.rollback()
        error_message = str(e)
        logging.error(f"Error al actualizar el perfil: {error_message}")
        return jsonify({'error': error_message}), 500
    finally:
        cursor.close()
        conn.close()


# ⭐ NUEVA RUTA: Obtener perfil del usuario
@user_bp.route('/profile', methods=['GET'])
def get_profile():
    """Obtiene el perfil del usuario actual"""
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    try:
        user_id = request.headers.get('X-User-ID')
        logging.debug(f"GET profile - user_id: {user_id}")

        if not user_id:
            return jsonify({'error': 'ID de usuario requerido'}), 400

        cursor.execute("SELECT * FROM usuarios WHERE id = %s", (user_id,))
        user = cursor.fetchone()

        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        # Devolver datos con nombres consistentes
        response_data = {
            'id': user['id'],
            'nombre': user['nombre'],
            'descripcion': user['descripcion'],
            'imagen': user['imagen_url']
        }
        
        return jsonify(response_data), 200

    except Exception as e:
        logging.error(f"Error al obtener el perfil: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()