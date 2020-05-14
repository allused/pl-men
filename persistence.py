# import csv
# import sql_data_handler as sql
#
# STATUSES_FILE = './data/statuses.csv'
# BOARDS_FILE = './data/boards.csv'
# CARDS_FILE = './data/cards.csv'
#
# _cache = {}  # We store cached data in this dict to avoid multiple file readings
#
#
# def _read_csv(file_name):
#     """
#     Reads content of a .csv file
#     :param file_name: relative path to data file
#     :return: OrderedDict
#     """
#     with open(file_name) as boards:
#         rows = csv.DictReader(boards, delimiter=',', quotechar='"')
#         formatted_data = []
#         for row in rows:
#             formatted_data.append(dict(row))
#         return formatted_data
#
#
# def _get_data(data_type, file, force):
#     """
#     Reads defined type of data from file or cache
#     :param data_type: key where the data is stored in cache
#     :param file: relative path to data file
#     :param force: if set to True, cache will be ignored
#     :return: OrderedDict
#     """
#     if force or data_type not in _cache:
#         _cache[data_type] = _read_csv(file)
#     return _cache[data_type]
#
#
# def clear_cache():
#     for k in list(_cache.keys()):
#         _cache.pop(k)
#
#
# def get_statuses(force=False):
#     return _get_data('statuses', STATUSES_FILE, force)
#
#
# def get_boards(force=False):
#     return _get_data('boards', BOARDS_FILE, force)
#
#
# def get_cards(force=False):
#     return _get_data('cards', CARDS_FILE, force)

from psycopg2.extras import RealDictCursor
import database_common
from psycopg2 import sql


@database_common.connection_handler
def get_table_data(cursor: RealDictCursor, table):
    query = f"""
        SELECT * 
        FROM {table};"""
    cursor.execute(query)
    table_data = cursor.fetchall()
    return table_data


@database_common.connection_handler
def get_status(cursor):
    query = """
        SELECT title
        FROM statuses;"""
    cursor.execute(query)
    return cursor.fetchall()


@database_common.connection_handler
def create_card(cursor, board_id, title):
    query = """
        INSERT INTO cards (board_id, title)
        VALUES (%(board_id)s, %(title)s);
        """
    cursor.execute(query, {'board_id': board_id, 'title': title})


@database_common.connection_handler
def rename(cursor, table, _id, new_title):
    cursor.execute(f"""
    UPDATE {table}
    SET title = %(new_title)s
    WHERE id = %(_id)s;
    """, {'_id': _id, 'new_title': new_title})


@database_common.connection_handler
def get_user_data_by_name(cursor, username):
    cursor.execute("""
    SELECT *
    FROM users
    WHERE username=%(username)s;     
    """, {'username': username})
    return cursor.fetchone()


@database_common.connection_handler
def save_user_data(cursor, user_data):
    cursor.execute("""
    INSERT INTO users (username, password, email)
    VALUES (%(username)s, %(password)s, %(email)s);
    """, user_data)


@database_common.connection_handler
def save_new_board(cursor, title):
    query = """
        INSERT INTO boards (title)
        VALUES (%(title)s);
        """
    cursor.execute(query, {'title': title})


@database_common.connection_handler
def delete_board(cursor, id):
    query = """
        DELETE  
        FROM boards
        WHERE id = %(id)s;
        """
    cursor.execute(query, {'id': id})


@database_common.connection_handler
def get_board_id_by_title(cursor, title):
    query = """
        SELECT id
        FROM boards
        WHERE title = %(title)s;
        """
    cursor.execute(query, {'title': title})
    return cursor.fetchone()


@database_common.connection_handler
def get_cards(cursor):
    query = """
        SELECT * 
        FROM cards
        """
    cursor.execute(query)
    return cursor.fetchall()


@database_common.connection_handler
def insert_new_card(cursor, title, status_id, board_id):
    query = """
        INSERT INTO cards (board_id,title,status_id)
        VALUES (%(board_id)s, %(title)s, %(status_id)s);
        """
    cursor.execute(query, {'board_id': board_id, 'title': title, 'status_id': status_id})
