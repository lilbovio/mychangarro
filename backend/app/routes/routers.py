from flask import Blueprint, request, jsonify
from .db import mysql

main_routes = Blueprint('main', __name__)

@main_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT id, nombre, descripcion FROM usuarios WHERE usuario = %s AND contrasena = %s",
        (data['usuario'], data['contrasena'])
    )
    user = cur.fetchone()
    cur.close()
    if user:
        return jsonify({
            "id": user[0],
            "nombre": user[1],
            "descripcion": user[2]
        }), 200
    return jsonify({"error": "Credenciales incorrectas"}), 401

@main_routes.route('/negocios/<int:negocio_id>', methods=['GET'])
def obtener_negocio_por_id(negocio_id):
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT id, nombre, descripcion, direccion, imagen FROM negocios WHERE id = %s",
        (negocio_id,)
    )
    negocio = cur.fetchone()
    cur.close()
    
    if negocio:
        result = {
            "id": negocio[0],
            "nombre": negocio[1],
            "descripcion": negocio[2],
            "direccion": negocio[3],
            "imagen": negocio[4]
        }
        return jsonify(result), 200
    else:
        return jsonify({"error": "Negocio no encontrado"}), 404

# ========== NUEVA RUTA: Obtener un negocio por ID ==========
@main_routes.route('/negocios/<int:negocio_id>', methods=['GET'])
def obtener_negocio_por_id(negocio_id):
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT id, nombre, descripcion, direccion, imagen FROM negocios WHERE id = %s",
        (negocio_id,)
    )
    negocio = cur.fetchone()
    cur.close()
    
    if negocio:
        result = {
            "id": negocio[0],
            "nombre": negocio[1],
            "descripcion": negocio[2],
            "direccion": negocio[3],
            "imagen": negocio[4]
        }
        return jsonify(result), 200
    else:
        return jsonify({"error": "Negocio no encontrado"}), 404

@main_routes.route('/resenas', methods=['POST'])
def agregar_resena():
    data = request.json
    
    # Validar datos requeridos
    if not all(k in data for k in ['negocio_id', 'opinion', 'calificacion', 'resena']):
        return jsonify({"error": "Faltan campos requeridos"}), 400
    
    # Validar calificación
    if not (1 <= int(data['calificacion']) <= 5):
        return jsonify({"error": "La calificación debe estar entre 1 y 5"}), 400
    
    cur = mysql.connection.cursor()
    
    # Verificar que el negocio existe
    cur.execute("SELECT id FROM negocios WHERE id = %s", (data['negocio_id'],))
    if not cur.fetchone():
        cur.close()
        return jsonify({"error": "Negocio no encontrado"}), 404
    
    # Insertar la reseña
    cur.execute(
        "INSERT INTO resenas (negocio_id, opinion, calificacion, resena) VALUES (%s, %s, %s, %s)",
        (data['negocio_id'], data['opinion'], data['calificacion'], data['resena'])
    )
    mysql.connection.commit()
    resena_id = cur.lastrowid
    cur.close()
    
    return jsonify({
        "mensaje": "Reseña guardada correctamente",
        "id": resena_id
    }), 201

@main_routes.route('/resenas/<int:negocio_id>', methods=['GET'])
def obtener_resenas(negocio_id):
    cur = mysql.connection.cursor()
    cur.execute(
        """SELECT id, negocio_id, opinion, calificacion, resena 
           FROM resenas 
           WHERE negocio_id = %s 
           ORDER BY id DESC""",
        (negocio_id,)
    )
    resenas = cur.fetchall()
    cur.close()
    
    result = [
        {
            "id": r[0],
            "negocio_id": r[1],
            "opinion": r[2],
            "calificacion": r[3],
            "resena": r[4]
        } for r in resenas
    ]
    return jsonify(result)