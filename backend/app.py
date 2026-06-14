from flask import Flask, request, jsonify
from flask_cors import CORS

import os
import joblib
import numpy as np

from tensorflow.keras.models import load_model

from utils.audio_features import extract_features
from utils.face_preprocessing import preprocess_face

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

audio_model = joblib.load(
    "../models/audio_svm_model.pkl"
)

scaler = joblib.load(
    "../models/audio_standardscaler.pkl"
)

label_encoder = joblib.load(
    "../models/audio_labelencoder.pkl"
)

face_model = load_model(
    "../models/fer_emotion_model.keras"
)

emotion_labels = [
    "Angry",
    "Disgust",
    "Fear",
    "Happy",
    "Sad",
    "Surprise",
    "Neutral"
]


@app.route("/")
def home():

    return jsonify({
        "message": "Emotion Recognition Backend Running"
    })


@app.route("/test")
def test():

    return jsonify({
        "status": "working"
    })


@app.route("/routes")
def routes():

    return jsonify({
        "available_routes": [
            "/",
            "/test",
            "/routes",
            "/predict_audio",
            "/predict_face"
        ]
    })


@app.route("/predict_audio", methods=["POST"])
def predict_audio():

    try:

        if "audio" not in request.files:

            return jsonify({
                "error": "No audio file uploaded"
            }), 400

        file = request.files["audio"]

        filepath = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        file.save(filepath)

        features = extract_features(
            filepath
        )

        features_scaled = scaler.transform(
            [features]
        )

        prediction = audio_model.predict(
            features_scaled
        )

        emotion = label_encoder.inverse_transform(
            prediction
        )[0]

        return jsonify({
            "emotion": emotion
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


@app.route("/predict_face", methods=["POST"])
def predict_face():

    try:

        if "image" not in request.files:

            return jsonify({
                "error": "No image uploaded"
            }), 400

        file = request.files["image"]

        filepath = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        file.save(filepath)

        img = preprocess_face(
            filepath
        )

        prediction = face_model.predict(
            img,
            verbose=0
        )

        emotion_index = np.argmax(
            prediction
        )

        emotion = emotion_labels[
            emotion_index
        ]

        confidence = float(
            np.max(prediction) * 100
        )

        return jsonify({
            "emotion": emotion,
            "confidence": round(
                confidence,
                2
            )
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )