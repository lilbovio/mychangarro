from app.db import get_db

def save_review(business_id, opinion, rating, review):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO resenas (business_id, opinion, rating, review) VALUES (%s, %s, %s, %s)",
        (business_id, opinion, rating, review)
    )
    conn.commit()
    conn.close()
