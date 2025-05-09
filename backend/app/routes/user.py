from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from datetime import datetime
from app.db import get_db
import logging  # Importa el módulo logging

user_bp = Blueprint('user', __name__)

# Configuración para imágenes
UPLOAD_FOLDER = 'static/uploads/profile_images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE_MB = 2
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

# Configura el logging
logging.basicConfig(level=logging.DEBUG)  # Establece el nivel de logging a DEBUG para ver más detalles


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@user_bp.route('/profile', methods=['PUT'])
def update_profile():
    logging.debug("Entrando a la función update_profile")  # Agrega logging al inicio de la función
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    try:
        # Obtener datos del request
        data = request.form
        user_id = request.headers.get('X-User-ID')
        logging.debug(f"user_id recibido: {user_id}") # Imprime el ID de usuario

        # Validar datos mínimos
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
            if file:
                logging.debug(f"Nombre del archivo recibido: {file.filename}")
                logging.debug(f"Tamaño del archivo recibido: {file.content_length}")
                if file.content_length > MAX_FILE_SIZE_BYTES:
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

            # Obtener usuario actualizado
            cursor.execute("SELECT * FROM usuarios WHERE id = %s", (user_id,))
            updated_user = cursor.fetchone()
            logging.debug(f"Usuario actualizado: {updated_user}")
            
            response_data = {
                'message': 'Perfil actualizado exitosamente',
                'user': {
                    'id': updated_user['id'],
                    'name': updated_user['nombre'],
                    'description': updated_user['descripcion'],
                    'image_url': updated_user['imagen_url']
                }
            }
            logging.debug(f"Respuesta JSON: {response_data}")
            return jsonify(response_data), 200
        else:
            logging.warning("No hay datos para actualizar")
            response_data = {'message': 'No hay datos para actualizar', 'user': user} # Añadido 'user'
            logging.debug(f"Respuesta JSON: {response_data}")
            return jsonify(response_data), 200  # Devuelve 200 OK, pero sin cambios

    except Exception as e:
        conn.rollback()
        error_message = str(e)
        logging.error(f"Error al actualizar el perfil: {error_message}")  # Loguea el error
        return jsonify({'error': error_message}), 500
    finally:
        cursor.close()
        conn.close()
