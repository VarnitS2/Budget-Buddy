import hashlib
from flask import request
from flask.json import jsonify
from flask.wrappers import Response

from api import app
from api import db_worker

_api_db = db_worker.Worker(':memory:')
# _api_db = db_worker.Worker('api/data.db')

@app.route('/api/init-db', methods=['GET'])
def init_api_db() -> Response:
    try:
        global _api_db
        _api_db = db_worker.Worker('api/data.db')
        _api_db.create_tables()
    except Exception as e:
        return jsonify(status=500, message=e)
    else:
        return jsonify(status=200, message='Database initialized successfully!')

@app.route('/api/register', methods=['POST'])
def user_register() -> Response:
    user_email = request.get_json()['email']
    user_password = request.get_json()['password']
    user_password_hashed = hashlib.sha224(user_password.encode('ascii')).hexdigest()
    user_name = request.get_json()['username']

    users = _api_db.select_from_users(user_email)
    if len(users) > 0:
        return jsonify(status=400, message='A user with this email already exists')

    try:
        _api_db.add_to_users({
            'email': user_email,
            'password': user_password_hashed,
            'username': user_name,
            'balance': 0.0
        })
    except Exception as e:
        return jsonify(status=500, message=e)
    else:
        return jsonify(status=200, message='User created successfully!')

@app.route('/api/login', methods=['POST'])
def user_login() -> Response:
    user_email = request.get_json()['email']
    user_password = request.get_json()['password']
    user_password_hashed = hashlib.sha224(user_password.encode('ascii')).hexdigest()

    users = _api_db.select_from_users(user_email)
    if len(users) != 1:
        return jsonify(status=400, message='Invalid email')

    if user_password_hashed == tuple(users[0])[2]:
        return jsonify(status=200, message='Login successful')
    else:
        return jsonify(status=400, message='Invalid password')

@app.route('/api/user/get', methods=['POST'])
def user_get_info() -> Response:
    user_email = request.get_json()['email']

    users = _api_db.select_from_users(user_email)
    if len(users) != 1:
        return jsonify(status=400, message='Invalid email')

    return jsonify(status=200, data={
        'user_id': tuple(users[0])[0],
        'email': tuple(users[0])[1],
        'username': tuple(users[0])[3],
        'balance': tuple(users[0])[4]
    })

@app.route('/api/user/update-balance', methods=['POST'])
def user_update_balance() -> Response:
    user_email = request.get_json()['email']
    new_balance = request.get_json()['balance']

    users = _api_db.select_from_users(user_email)
    if len(users) != 1:
        return jsonify(status=400, message='Invalid email')

    try:
        _api_db.update_user_balance(user_email, new_balance)
    except Exception as e:
        return jsonify(status=500, message=e)
    else:
        return jsonify(status=200, message='Balance updated successfully')

@app.route('/api/user/delete', methods=['POST'])
def user_delete() -> Response:
    user_email = request.get_json()['email']
    user_password = request.get_json()['password']
    user_password_hashed = hashlib.sha224(user_password.encode('ascii')).hexdigest()

    users = _api_db.select_from_users(user_email)
    if len(users) != 1:
        return jsonify(status=400, message='Invalid email')

    if user_password_hashed == tuple(users[0])[2]:
        _api_db.delete_from_users(user_email)
        return jsonify(status=200, message='User deleted successfully')
    else:
        return jsonify(status=400, message='Invalid password')