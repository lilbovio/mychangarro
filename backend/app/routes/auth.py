from flask import Blueprint, request, jsonify
from app.models.user import verify_user

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    user = verify_user(data['username'], data['password'])
    if user:
        return jsonify({'success': True, 'user': user})
    else:
        return jsonify({'success': False, 'message': 'Usuario o contraseña incorrectos'}), 401

