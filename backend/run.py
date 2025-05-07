from flask import Flask
from flask_cors import CORS
from app.routes.auth import auth_bp
from app import create_app

app = create_app()
CORS(app)  # Permitir peticiones desde el frontend (React)

# Registrar las rutas de autenticación
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run(debug=True)
