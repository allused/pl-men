from flask import Flask, render_template, url_for, request, session, redirect, make_response, jsonify
from util import json_response
import util

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        register_details = {
            'username': request.form['username'],
            'password': util.hash_pass(request.form['password']),
            'verification': util.hash_pass(request.form['verification']),
            'email': request.form['email']
        }
        if util.verify_password(register_details['password'], register_details['verification']):
            data_handler.save_user_data(register_details)
            return redirect('/login')
    return render_template('register.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        login_details = {
            'username': request.form['username'],
            'password': util.hash_pass(request.form['password'])
        }
        if util.check_login(login_details['username'], login_details['password']):
            user_data = data_handler.get_user_by_name(login_details['username'])
            for key in user_data:
                session[key] = user_data[key]
            return redirect('/')
    return render_template('login.html')


@app.route('/logout')
def logout():
    for key in session:
        session.pop(key, None)
    return redirect('/')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)\

@app.route("/get-statuses")
@json_response
def get_statuses():
    """
    Get statuses title
    """
    return data_handler.get_statuses()



@app.route('/save-board', methods=['GET', 'POST'])
def save_board():

    req = request.get_json()
    data_handler.add_new_board(req)

    res = make_response(jsonify(req), 200)

    return res

@app.route('/save-card', methods=['POST', 'GET'])
def save_card():

    req = request.get_json()
    

    response = 'everything ok'
    res = make_response(jsonify(response), 200)

    return res



def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
