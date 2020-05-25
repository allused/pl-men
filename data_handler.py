import persistence


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    # statuses = persistence.get_statuses()
    statuses = persistence.get_table_data(table="statuses")
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


def get_statuses():
    return persistence.get_status()


def get_boards():
    """
    Gather all boards
    :return:
    """
    # return persistence.get_boards(force=True)
    return persistence.get_table_data(table="boards")


def get_board_id_by_title(title):
    """
    Return the board id by the board title
    """
    return persistence.get_board_id_by_title(title)


def get_cards_for_board(board_id):
    # persistence.clear_cache()
    # all_cards = persistence.get_cards()
    all_cards = persistence.get_table_data(table="cards")
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards


def update_card_status(card_id, new_status):

    return persistence.save_card_status_by_id(card_id,new_status)


def get_cards():
    return persistence.get_cards()


def create_card(board_id, title):
    return persistence.create_card(board_id, title)


def get_user_by_name(username):
    return persistence.get_user_data_by_name(username)


def save_user_data(user_data):
    persistence.save_user_data(user_data)


def add_new_board(title):
    return persistence.save_new_board(title)


def insert_new_card(board_id, title, status_id):
    return persistence.insert_new_card(title, status_id, board_id)


def get_id(table, title):
    return persistence.get_board_id_by_title(table, title)


def get_last_id(table):
    return persistence.get_last_table_id(table)


def rename(table, old_title, new_title):
    _id = persistence.get_board_id_by_title(old_title)
    persistence.rename(table, _id['id'], new_title)


def rename_card(id, new_name):
    persistence.rename_card(new_name, id)