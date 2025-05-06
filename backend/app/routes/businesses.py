from flask import Blueprint, request, jsonify
from app.models.business import get_all_businesses, get_businesses_by_category

businesses = Blueprint('businesses', __name__)

@businesses.route('/businesses', methods=['GET'])
def list_businesses():
    category = request.args.get('category')
    if category:
        data = get_businesses_by_category(category)
    else:
        data = get_all_businesses()
    return jsonify(data)
