import traceback
import tempfile
import os

from flask import Flask, request, jsonify
from flask_cors import CORS

import joblib
import numpy as np

from tensorflow.keras.models import load_model

from utils.audio_features import extract_features
from utils.face_preprocessing import preprocess_face

from database import (
    create_database,
    save_prediction,
    save_prediction_user,
    get_predictions,
    get_user_predictions,
    create_user,
    save_activity,
    get_latest_prediction,
    login_user
)

app = Flask(__name__)
CORS(app)

# Keep this unless database.py is actually recreating emotion.db
create_database()


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODELS_DIR = os.path.join(BASE_DIR,"..","models")

audio_model = joblib.load(os.path.join(MODELS_DIR,"audio_mlp_model.pkl"))

scaler = joblib.load(os.path.join(MODELS_DIR,"audio_standardscaler.pkl"))

label_encoder = joblib.load(os.path.join(MODELS_DIR,"audio_labelencoder.pkl"))

face_model = load_model(os.path.join(MODELS_DIR,"fer_emotion_model.keras"))

emotion_labels = [
    "angry",
    "disgust",
    "fear",
    "happy",
    "sad",
    "surprise",
    "neutral"
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
          "/signup",
          "/login",
          "/history",
          "/predict_audio",
          "/predict_face"
]
    })


@app.route("/predict_audio", methods=["POST"])
def predict_audio():

    temp_path = None

    try:

        if "audio" not in request.files:
            return jsonify({
                "error": "No audio file uploaded"
            }), 400

        file = request.files["audio"]
        user_id = request.form.get("user_id")

        extension = os.path.splitext(
            file.filename
        )[1] or ".tmp"

        with tempfile.NamedTemporaryFile(
            suffix=extension,
            delete=False
        ) as temp_file:

            file.save(temp_file.name)
            temp_path = temp_file.name

        features = extract_features(
            temp_path
        )

        features_scaled = scaler.transform(
            [features]
        )

        prediction = audio_model.predict(
            features_scaled
        )

        probabilities = audio_model.predict_proba(
            features_scaled
        )

        emotion = label_encoder.inverse_transform(
            prediction
        )[0]


        confidence = float(
            np.max(probabilities) * 100
        )

        save_prediction_user(
            user_id,
            "audio",
            file.filename,
            emotion,
            confidence
        )

        return jsonify({
            "emotion": emotion,
            "confidence": round(
                confidence,
                2
            )
        })

    except Exception as e:

        traceback.print_exc()

        return jsonify({
            "error": str(e)
        }), 500

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


@app.route("/predict_face", methods=["POST"])
def predict_face():

    temp_path = None

    try:

        if "image" not in request.files:

            return jsonify({
                "error": "No image uploaded"
            }), 400

        file = request.files["image"]
        user_id = request.form.get("user_id")
        

        extension = os.path.splitext(
            file.filename
        )[1] or ".jpg"

        with tempfile.NamedTemporaryFile(
            suffix=extension,
            delete=False
        ) as temp_file:

            file.save(temp_file.name)
            temp_path = temp_file.name

        print("Image received:", file.filename)

        img = preprocess_face(
            temp_path
        )

        print("Preprocessing complete")

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

        save_prediction_user(
            user_id,
            "face",
            file.filename,
            emotion,
            confidence
        )

        return jsonify({
            "emotion": emotion,
            "confidence": round(
                confidence,
                2
            )
        })

    except Exception as e:

        traceback.print_exc()

        return jsonify({
            "error": str(e)
        }), 500

    finally:

        if (
            temp_path and
            os.path.exists(temp_path)
        ):

            try:

                os.remove(temp_path)

            except Exception:
                pass
            
            
@app.route("/signup", methods=["POST"])
def signup():

    try:

        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        age = data.get("age")
        password = data.get("password")

        success = create_user(
            name,
            email,
            age,
            password
        )

        if success:

            return jsonify({
                "message": "Account created successfully"
            })

        return jsonify({
            "error": "Email already exists"
        }), 400

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
        
        
@app.route("/login", methods=["POST"])
def login():

    try:

        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        user = login_user(
            email,
            password
        )

        if user:

            return jsonify({
                "user_id": user[0],
                "name": user[1]
            })

        return jsonify({
            "error": "Invalid credentials"
        }), 401

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500  
        
@app.route("/activity", methods=["POST"])
def activity():

    try:

        data = request.get_json()

        user_id = data.get("user_id")

        emotion = data.get("emotion")

        activity_name = data.get("activity_name")

        save_activity(
            user_id,
            emotion,
            activity_name
        )

        return jsonify({
            "message":"Activity saved"
        })

    except Exception as e:

        return jsonify({
            "error":str(e)
        }),500    
        
@app.route("/latest_prediction/<int:user_id>")
def latest_prediction(user_id):

    prediction = get_latest_prediction(
        user_id
    )

    if prediction:

        return jsonify({
            "emotion": prediction[0],
            "timestamp": prediction[1]
        })

    return jsonify({
        "emotion": None,
        "timestamp": None
    }) 
                                 

@app.route("/history")
def history():

    data = get_predictions()

    return jsonify(data)

@app.route("/history/<int:user_id>")
def user_history(user_id):

    data = get_user_predictions(
        user_id
    )

    return jsonify(data)

@app.route("/ping")
def ping():
    return "PING WORKS"


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )