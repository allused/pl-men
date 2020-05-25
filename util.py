from functools import wraps
from flask import jsonify
import bcrypt
import data_handler


def json_response(func):
    """
    Converts the returned dictionary into a JSON response
    :param func:
    :return:
    """
    @wraps(func)
    def decorated_function(*args, **kwargs):
        return jsonify(func(*args, **kwargs))

    return decorated_function


def hash_pass(password):
    hashed_pass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_pass.decode('utf-8')


def verify_password(password, hashed_pass):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_pass.encode('utf-8'))


def check_login(username, password):
    user = data_handler.get_user_details(username)
    if user == {}:
        return False
    else:
        if verify_password(password, user['password']):
            return True
        else:
            return False





