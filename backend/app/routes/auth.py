from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.db import get_db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print("DATA RECIBIDA:", data)
    if not data:
        return jsonify({'message': 'No se recibieron datos'}), 400
    username = data.get('usuario')
    password = data.get('contrasena')

    if not username or not password:
        return jsonify({'message': 'Faltan campos'}), 400

    db = get_db()
    cursor = db.cursor()

    # Verifica si el usuario ya existe
    cursor.execute("SELECT * FROM usuarios WHERE usuario = %s", (username,))
    if cursor.fetchone():
        return jsonify({'message': 'Usuario ya existe'}), 409

    # Cifrar la contraseña
    hashed_password = generate_password_hash(password)

    # Crea nuevo usuario con contraseña segura
    cursor.execute('INSERT INTO usuarios (usuario, contrasena) VALUES (%s, %s)', (username, hashed_password))
    db.commit()
    return jsonify({'message': 'Usuario creado exitosamente'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('usuario')
    password = data.get('contrasena')

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM usuarios WHERE usuario = %s", (username,))
    user = cursor.fetchone()

    if not user or not check_password_hash(user['contrasena'], password):
        return jsonify({'message': 'Credenciales incorrectas'}), 401

    return jsonify({
    'message': 'Login exitoso',
    'user': {'id': user['id'], 'username': user['usuario']}
    }), 200
