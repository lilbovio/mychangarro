from flask import Blueprint, request, jsonify
from .db import mysql

main_routes = Blueprint('main', __name__)

@main_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, nombre, descripcion FROM usuarios WHERE usuario=%s AND contrasena=%s", (data['usuario'], data['contrasena']))
    user = cur.fetchone()
    if user:
        return jsonify({"id": user[0], "nombre": user[1], "descripcion": user[2]}), 200
    return jsonify({"error": "Credenciales incorrectas"}), 401

@main_routes.route('/negocios', methods=['GET'])
def obtener_negocios():
    categoria = request.args.get('categoria')
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, nombre, descripcion, direccion, imagen FROM negocios WHERE categoria=%s", (categoria,))
    negocios = cur.fetchall()
    result = [{"id": n[0], "nombre": n[1], "descripcion": n[2], "direccion": n[3], "imagen": n[4]} for n in negocios]
    return jsonify(result)

@main_routes.route('/resenas', methods=['POST'])
def agregar_resena():
    data = request.json
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO resenas (negocio_id, opinion, calificacion, resena) VALUES (%s, %s, %s, %s)",
                (data['negocio_id'], data['opinion'], data['calificacion'], data['resena']))
    mysql.connection.commit()
    return jsonify({"mensaje": "Reseña guardada correctamente"}), 201

@main_routes.route('/resenas/<int:negocio_id>', methods=['GET'])
def obtener_resenas(negocio_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT opinion, calificacion, resena FROM resenas WHERE negocio_id=%s", (negocio_id,))
    resenas = cur.fetchall()
    result = [{"opinion": r[0], "calificacion": r[1], "resena": r[2]} for r in resenas]
    return jsonify(result)
