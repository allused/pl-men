from psycopg2.extras import RealDictCursor
import database_common
from psycopg2 import sql


@database_common.connection_handler
def get_table_data(cursor: RealDictCursor, table):
    query = f"""
        SELECT * 
        FROM {table}
        ORDER BY id;"""
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
    query = f"""
    UPDATE {table}
    SET title = %(new_title)s
    WHERE id = %(_id)s;
    """
    cursor.execute(query, {'_id': _id, 'new_title': new_title})


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
def save_new_board(cursor, board_data):
    query = """
        INSERT INTO boards (title, user_id, privat)
        VALUES (%(title)s, %(user_id)s, %(privat)s);
        """
    cursor.execute(query, board_data)


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


@database_common.connection_handler
def get_id_by_title(cursor, table, title):
    cursor.execute(f"""
        SELECT id
        FROM {table}
        WHERE title=%(title)s
    """, {'title': title})
    return cursor.fetchone()


@database_common.connection_handler
def save_card_status_by_id(cursor, card_id, new_status):
    query = """
        UPDATE cards
        SET status_id = %(new_status)s
        WHERE id = %(card_id)s;
        """
    cursor.execute(query, {'card_id': card_id, 'new_status': new_status})


@database_common.connection_handler
def get_last_table_id(cursor, table):
    cursor.execute(sql.SQL("""
        SELECT id
        FROM {table}
        ORDER BY id DESC 
        LIMIT 1
        """).format(table=sql.SQL(table)))
    return cursor.fetchone()


@database_common.connection_handler
def rename_card(cursor, new_name, id):
    cursor.execute("""
        UPDATE cards
        SET title = %(new_name)s
        WHERE id = %(id)s
        """, {'new_name': new_name, 'id': id})


@database_common.connection_handler
def delete_card(cursor, element_id):
    cursor.execute("""
        DELETE
        FROM cards
        WHERE id = %(element_id)s;
        """, {'element_id':element_id})


@database_common.connection_handler
def delete_table(cursor, table_id):
    cursor.execute("""      
        DELETE 
        FROM boards
        WHERE boards.id = %(table_id)s;
        
        """, {'table_id':table_id})


@database_common.connection_handler
def archive(cursor: RealDictCursor, card_id: int):
    query = """
        UPDATE cards
        SET archive = (
        CASE 
            WHEN cards.archive = false THEN true
            ELSE false
        END)
        WHERE id = %(card_id)s;"""
    cursor.execute(query, {'card_id': card_id})
