import os
import mysql.connector
from app.config import DB_CONFIG

def get_db():
    host = os.getenv("DB_HOST", DB_CONFIG["host"])
    user = os.getenv("DB_USER", DB_CONFIG["user"])
    password = os.getenv("DB_PASSWORD", DB_CONFIG["password"])
    database = os.getenv("DB_NAME", DB_CONFIG["database"])
    port = int(os.getenv("DB_PORT", DB_CONFIG.get("port", 3306)))

    return mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database,
        port=port
    )
