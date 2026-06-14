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
    CREATE TABLE IF NOT EXISTS predictions(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,

        file_type TEXT,

        filename TEXT,

        emotion TEXT,

        confidence REAL

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