from flask import Blueprint, request, jsonify
from app.models.review import save_review

reviews = Blueprint('reviews', __name__)

@reviews.route('/reviews', methods=['POST'])
def create_review():
    data = request.json
    save_review(data['business_id'], data['opinion'], data['rating'], data['review'])
    return jsonify({'success': True})