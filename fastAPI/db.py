import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
from config import DATABASE_CONFIG

@contextmanager
def get_db_connection():
    connection = psycopg2.connect(**DATABASE_CONFIG)
    try:
        yield connection
    finally:
        connection.close()

def execute_query(query: str, params: tuple = ()):
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, params)
            if query.strip().upper().startswith("SELECT"):
                return cursor.fetchall()
            conn.commit()
            if cursor.description:  # Check if query returns a result
                result = cursor.fetchall()
                if not result:  # Handle empty result
                    raise Exception("Query executed but returned no data.")
                return result
            return []
            