from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from app.routes.auth import auth_bp
from app.routes.businesses import businesses
from app.routes.reviews import reviews
from app.routes.user import user_bp     

def create_app():
    app = Flask(__name__)
    CORS(app)

    STATIC_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'static')
    
    @app.route('/static/<path:filename>')
    def serve_static(filename):
        """Sirve archivos estáticos como imágenes de perfil"""
        return send_from_directory(STATIC_FOLDER, filename)
    
    @app.route('/static/uploads/profile_images/<filename>')
    def serve_profile_image(filename):
        """Sirve imágenes de perfil"""
        profile_images_path = os.path.join(STATIC_FOLDER, 'uploads', 'profile_images')
        return send_from_directory(profile_images_path, filename)

    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(businesses, url_prefix='/api')
    app.register_blueprint(reviews, url_prefix='/api')
    app.register_blueprint(user_bp, url_prefix='/api') 

    return app