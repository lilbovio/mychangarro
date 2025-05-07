from flask import Flask
from flask_cors import CORS
from app.routes.auth import auth
from app.routes.businesses import businesses
from app.routes.reviews import reviews

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(auth, url_prefix='/api')
    app.register_blueprint(businesses, url_prefix='/api')
    app.register_blueprint(reviews, url_prefix='/api')

    return app