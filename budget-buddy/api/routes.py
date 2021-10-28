from api import app

@app.route('/api')
def hello_world() -> str:
    return {
        'status': 200,
        'message': 'Hello, world!'
    }