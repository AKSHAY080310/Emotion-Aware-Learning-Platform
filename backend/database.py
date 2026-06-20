import sqlite3

import os

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

DB_NAME = os.path.join(
    BASE_DIR,
    "emotion_recognition.db"
)


def create_database():

    conn = sqlite3.connect(DB_NAME)

    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        email TEXT UNIQUE NOT NULL,

        age INTEGER,

        password TEXT NOT NULL,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS predictions(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        user_id INTEGER,

        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,

        file_type TEXT,

        filename TEXT,

        emotion TEXT,

        confidence REAL

    )
    """)

  
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS activities(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        user_id INTEGER,

        emotion TEXT,

        activity_name TEXT,

        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP

    )
    """)

    conn.commit()

    conn.close()
    

def save_prediction(
    file_type,
    filename,
    emotion,
    confidence
):

    conn = sqlite3.connect(DB_NAME)

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO predictions
        (
            file_type,
            filename,
            emotion,
            confidence
        )
        VALUES
        (?, ?, ?, ?)
        """,
        (
            file_type,
            filename,
            emotion,
            confidence
        )
    )

    conn.commit()

    conn.close()
    
    
def save_prediction_user(
    user_id,
    file_type,
    filename,
    emotion,
    confidence
):

    conn = sqlite3.connect(DB_NAME)

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO predictions
        (
            user_id,
            file_type,
            filename,
            emotion,
            confidence
        )
        VALUES
        (?, ?, ?, ?, ?)
        """,
        (
            user_id,
            file_type,
            filename,
            emotion,
            confidence
        )
    )

    conn.commit()

    conn.close()    


def get_predictions():

    conn = sqlite3.connect(DB_NAME)

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM predictions
        ORDER BY id DESC
        """
    )

    rows = cursor.fetchall()

    conn.close()

    return rows


def get_user_predictions(user_id):

    conn = sqlite3.connect(DB_NAME)

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM predictions
        WHERE user_id = ?
        ORDER BY id DESC
        """,
        (user_id,)
    )

    rows = cursor.fetchall()

    conn.close()

    return rows         



def create_user(
    name,
    email,
    age,
    password
):

    conn = sqlite3.connect(DB_NAME)

    cursor = conn.cursor()

    try:

        cursor.execute(
            """
            INSERT INTO users
            (
                name,
                email,
                age,
                password
            )
            VALUES
            (?, ?, ?, ?)
            """,
            (
                name,
                email,
                age,
                password
            )
        )

        conn.commit()

        return True

    except sqlite3.IntegrityError:

        return False

    finally:

        conn.close()
        
        
        
        
def login_user(
    email,
    password
):

    conn = sqlite3.connect(DB_NAME)

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, name
        FROM users
        WHERE email = ?
        AND password = ?
        """,
        (
            email,
            password
        )
    )

    user = cursor.fetchone()

    conn.close()

    return user


def save_activity(
    user_id,
    emotion,
    activity_name
):

    conn = sqlite3.connect(DB_NAME)

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO activities
        (
            user_id,
            emotion,
            activity_name
        )
        VALUES
        (?, ?, ?)
        """,
        (
            user_id,
            emotion,
            activity_name
        )
    )

    conn.commit()

    conn.close()   
    
    
def get_latest_prediction(user_id):

    conn = sqlite3.connect(DB_NAME)

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT emotion, timestamp
        FROM predictions
        WHERE user_id = ?
        ORDER BY id DESC
        LIMIT 1
        """,
        (user_id,)
    )

    row = cursor.fetchone()

    conn.close()

    return row