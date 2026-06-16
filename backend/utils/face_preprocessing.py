import cv2
import numpy as np


def preprocess_face(image_path):
    print("FACE_PREPROCESS_VERSION_2")

    image = cv2.imread(image_path)

    if image is None:

        raise ValueError(
            "Could not read image"
        )

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    face_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades +
        "haarcascade_frontalface_default.xml"
    )

    if face_cascade.empty():

        raise ValueError(
            "Cascade file not loaded"
        )

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30)
    )

    # Fallback if no face is detected
    if len(faces) == 0:
        print("FACE_PREPROCESS_VERSION_2")
        print(
            "No face detected. Using entire image."
        )

        face_resized = cv2.resize(
            gray,
            (48, 48)
        )

        face_normalized = (
            face_resized.astype("float32")
            / 255.0
        )

        face_input = np.expand_dims(
            face_normalized,
            axis=(0, -1)
        )

        return face_input

    largest_face = max(
        faces,
        key=lambda face: face[2] * face[3]
    )

    x, y, w, h = largest_face

    face = image[
        y:y+h,
        x:x+w
    ]

    face_gray = cv2.cvtColor(
        face,
        cv2.COLOR_BGR2GRAY
    )

    face_resized = cv2.resize(
        face_gray,
        (48, 48)
    )

    face_normalized = (
        face_resized.astype("float32")
        / 255.0
    )

    face_input = np.expand_dims(
        face_normalized,
        axis=(0, -1)
    )

    return face_input