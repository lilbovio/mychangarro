from app.db import get_db

def get_all_businesses():
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM businesses")
    data = cursor.fetchall()
    conn.close()
    return data

def get_businesses_by_category(category):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM businesses WHERE category = %s", (category,))
    data = cursor.fetchall()
    conn.close()
    return data
