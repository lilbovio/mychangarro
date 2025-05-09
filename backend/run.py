from flask import Flask
from flask_cors import CORS
import os
from app import create_app

app = create_app()
CORS(app)

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))  # Usa el puerto de Render si está disponible
    app.run(host="0.0.0.0", port=port, debug=False)
