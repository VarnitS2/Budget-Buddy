import hashlib
from flask import request
from flask.json import jsonify
from flask.wrappers import Response
import os.path

from api import app
from api import db_worker

# Uncomment to run test
# _api_db = db_worker.Worker(':memory:')

if not os.path.isfile('api/data.db'):
    _api_db = db_worker.Worker('api/data.db')
    _api_db.create_tables()
else:
    _api_db = db_worker.Worker('api/data.db')

# Endpoint for new user registration
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

# Endpoint for user login
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

# Endpoint to get the user with the provided email
@app.route('/api/user/get-info', methods=['POST'])
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

# Endpoint to get user transactions
@app.route('/api/user/get-transactions', methods=['POST'])
def user_get_transactions() -> Response:
    user_email = request.get_json()['email']

    users = _api_db.select_from_users(user_email)
    if len(users) != 1:
        return jsonify(status=400, message='Invalid email')

    transactions = _api_db.select_from_transactions(user_email)

    return jsonify(status=200, data=[{
        'transaction_id': tuple(transaction)[0],
        'user_email': tuple(transaction)[1],
        'date': tuple(transaction)[2],
        'description': tuple(transaction)[3],
        'type': tuple(transaction)[4],
        'amount': tuple(transaction)[5],
    } for transaction in transactions])

# Data analysis endpoint to get balance, income, and expenditure numbers
@app.route('/api/user/get-balance-breakdown', methods=['POST'])
def user_get_balance_breakdown() -> Response:
    user_email = request.get_json()['email']

    users = _api_db.select_from_users(user_email)
    if len(users) != 1:
        return jsonify(status=400, message='Invalid email')

    transactions = _api_db.select_from_transactions(user_email)

    balance = 0.0
    income = 0.0
    expenditure = 0.0

    for transaction in transactions:
        if tuple(transaction)[4] == '-':
            balance -= tuple(transaction)[5]
            expenditure += tuple(transaction)[5]
        else:
            balance += tuple(transaction)[5]
            income += tuple(transaction)[5]

    return jsonify(status=200, data={
        'balance': balance,
        'income': income,
        'expenditure': expenditure
    })

# Endpoint to get user's top spending categories
@app.route('/api/user/top-spending-categories', methods=['POST'])
def user_get_top_spending_categories() -> Response:
    user_email = request.get_json()['email']

    users = _api_db.select_from_users(user_email)
    if len(users) != 1:
        return jsonify(status=400, message='Invalid email')
        
    transactions = _api_db.select_from_transactions(user_email)

    categories = [tuple(transaction)[3] for transaction in transactions]
    uniqueCategories = list(set(categories))

    return jsonify(status=200, data=uniqueCategories)

# Endpoint to add a transaction for a user
@app.route('/api/user/add-transaction', methods=['POST'])
def user_add_transaction() -> Response:
    user_email = request.get_json()['email']
    description = request.get_json()['description']
    type = request.get_json()['type']
    amount = request.get_json()['amount']

    users = _api_db.select_from_users(user_email)
    if len(users) != 1:
        return jsonify(status=400, message='Invalid email')

    try:
        _api_db.add_to_transactions({
            'user_email': user_email,
            'description': description,
            'type': type,
            'amount': amount
        })
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        return jsonify(status=200, message='Transaction added successfully')

# Endpoint to update provided user's balance
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

# Endpoint to delete user account
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