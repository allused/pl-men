from psycopg2.extras import RealDictCursor
import database_common


@database_common.connection_handler
def get_table_data(cursor: RealDictCursor, table):
    query = f"""
        SELECT * 
        FROM {table};"""
    cursor.execute(query)
    table_data = cursor.fetchall()
    return table_data