from flask import Blueprint, request, jsonify
from app.models.business import get_all_businesses, get_businesses_by_category, get_business_by_id

businesses = Blueprint('businesses', __name__)

@businesses.route('/businesses', methods=['GET'])
def list_businesses():
    category = request.args.get('categoria')
    if category:
        data = get_businesses_by_category(category)
    else:
        data = get_all_businesses()
    return jsonify(data)

@businesses.route('/businesses/<int:business_id>', methods=['GET'])
def get_business(business_id):
    business = get_business_by_id(business_id)
    if business:
        return jsonify(business), 200
    return jsonify({'error': 'Negocio no encontrado'}), 404
