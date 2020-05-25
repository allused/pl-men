from flask import Flask, render_template, url_for, request, session, redirect, make_response, jsonify
from util import json_response
import util

import data_handler

app = Flask(__name__)

app.secret_key = b'__420blzitfgt__/'


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
            'email': request.form['email']
        }
        if request.form['password'] == request.form['verification']:
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
        if util.check_login(login_details['username'], request.form['password']):
            user_data = data_handler.get_user_by_name(login_details['username'])
            for key in user_data:
                session[key] = user_data[key]
            return redirect('/')
    return render_template('login.html')


@app.route('/logout')
def logout():
    for key in [key for key in session]:
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
    return data_handler.get_cards_for_board(board_id)


@app.route("/get-statuses")
@json_response
def get_statuses():
    """
    Get statuses title
    """
    return data_handler.get_statuses()


@app.route("/get-cards")
@json_response
def get_cards():
    """
    Return cards with all the card details
    """
    return data_handler.get_cards()


@app.route("/get_last_card_id")
@json_response
def get_last_card_id():

    pass


@app.route('/save-board', methods=['GET', 'POST'])
def save_board():
    req = request.get_json()
    data_handler.add_new_board(req)

    res = make_response(jsonify(req), 200)

    return res


@app.route('/rename-board', methods=['GET', 'POST'])
def rename_board():
    req = request.get_json()
    data_handler.rename('boards', req['old_title'], req['new_title'])
    res = make_response(jsonify(req), 200)
    return res


@app.route('/save-card', methods=['POST', 'GET'])
def save_card():
    req = request.get_json()
    """
    req catch the fetch POST from data_handler js with the card details
    in this case req is a dict
    """

    board_title = req['boardtitle']
    card_title = req['cardtitle']
    card_status_id = req['statusid']
    board_id = data_handler.get_board_id_by_title(board_title)['id']

    data_handler.insert_new_card(board_id, card_title, card_status_id)

    response = 'everything ok'
    res = make_response(jsonify(response), 200)
    """
    return a response to the server, that everything was ok, so we dont get 
    internal server error / 500
    """

    return res


@app.route('/save-card-status', methods=['POST', 'GET'])
def save_card_status():
    req = request.get_json()
    card_id = req['id']
    new_status = req['status']
    data_handler.update_card_status(card_id, new_status)

    res = make_response(jsonify(req), 200)

    return res


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
