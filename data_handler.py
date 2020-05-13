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

def get_boards():
    """
    Gather all boards
    :return:
    """
    # return persistence.get_boards(force=True)
    return persistence.get_table_data(table="boards")


def get_statuses():
    """
    Gather all statuses
    :return:
    """
    return persistence.get_table_data(table="statuses")


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


def create_card(board_id, title):
    return persistence.create_card(board_id, title)


def rename(table, _id, title):
    return persistence.rename(table, _id, title)

def add_new_board(title):
    return persistence.save_new_board(title)