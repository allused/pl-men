from flask import Flask, render_template, url_for,request, jsonify, make_response
from util import json_response
import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-statuses")
@json_response
def get_statuses():
    """
    All the boards
    """
    return data_handler.get_statuses()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route('/save-board', methods=['GET', 'POST'])
def save_board():

    req = request.get_json()
    data_handler.add_new_board(req)

@app.route("/api/<table_name>/insert", methods=["POST"])
def save_record(table_name):
    record_to_save = request.form.to_dict()





def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
