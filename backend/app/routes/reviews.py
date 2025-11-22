from flask import Blueprint, request, jsonify
from app.models.review import save_review
from app.db import get_db

reviews = Blueprint('reviews', __name__)

@reviews.route('/reviews', methods=['POST'])
def create_review():
    data = request.json
    save_review(data['business_id'], data['opinion'], data['rating'], data['review'])
    return jsonify({'success': True})

@reviews.route('/reviews/<int:business_id>', methods=['GET'])
def list_reviews(business_id):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT id, negocio_id, opinion, calificacion, resena FROM resenas WHERE negocio_id = %s ORDER BY id DESC",
        (business_id,)
    )
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(rows), 200