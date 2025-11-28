from app.db import get_db

def save_review(business_id, opinion, rating, review_text):
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # Inserta la reseña sin fecha_creacion
        query = """
            INSERT INTO resenas (negocio_id, opinion, calificacion, resena)
            VALUES (%s, %s, %s, %s)
        """
        
        cursor.execute(query, (
            business_id,
            opinion,
            int(rating),
            review_text
        ))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return True
    except Exception as e:
        print(f"Error guardando reseña: {e}")
        raise e

def get_reviews_by_business(business_id):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT id, negocio_id, opinion, calificacion, resena FROM resenas WHERE negocio_id = %s ORDER BY id DESC",
        (business_id,)
    )
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows