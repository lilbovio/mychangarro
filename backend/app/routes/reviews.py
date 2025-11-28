from flask import Blueprint, request, jsonify
from app.models.review import save_review, get_reviews_by_business

reviews = Blueprint('reviews', __name__)

@reviews.route('/reviews', methods=['POST'])
def create_review():
    try:
        data = request.json
        
        # Aceptar ambos nombres de claves (negocio_id o business_id)
        business_id = data.get('negocio_id') or data.get('business_id')
        opinion = data.get('opinion')
        rating = data.get('calificacion') or data.get('rating')
        review_text = data.get('resena') or data.get('review')
        
        if not all([business_id, opinion, rating, review_text]):
            return jsonify({'error': 'Faltan campos requeridos'}), 400
        
        save_review(business_id, opinion, rating, review_text)
        return jsonify({'success': True, 'message': 'Reseña guardada correctamente'}), 201
        
    except Exception as e:
        print(f"Error en create_review: {e}")
        return jsonify({'error': f'Error al guardar reseña: {str(e)}'}), 500

@reviews.route('/reviews/<int:business_id>', methods=['GET'])
def list_reviews(business_id):
    try:
        rows = get_reviews_by_business(business_id)
        return jsonify(rows), 200
    except Exception as e:
        print(f"Error en list_reviews: {e}")
        return jsonify({'error': str(e)}), 500