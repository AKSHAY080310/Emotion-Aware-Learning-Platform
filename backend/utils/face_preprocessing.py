import cv2
import numpy as np


def preprocess_face(image_path):

    print("=" * 50)
    print("PREPROCESS FACE STARTED")
    print("=" * 50)

    print("Image path:", image_path)

    image = cv2.imread(image_path)

    if image is None:

        raise ValueError(
            "Could not read image"
        )

    print("Image loaded successfully")
    print("Image shape:", image.shape)

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    print("Converted to grayscale")

    face_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades +
        "haarcascade_frontalface_default.xml"
    )

    print(
        "Cascade loaded:",
        not face_cascade.empty()
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

    print(
        "Faces detected:",
        len(faces)
    )

    if len(faces) == 0:

        raise ValueError(
            "No face detected"
        )

    largest_face = max(
        faces,
        key=lambda face: face[2] * face[3]
    )

    x, y, w, h = largest_face

    print(
        "Largest face:",
        x, y, w, h
    )

    face = image[
        y:y+h,
        x:x+w
    ]

    face_gray = cv2.cvtColor(
        face,
        cv2.COLOR_BGR2GRAY
    )

    print("Face cropped")

    face_resized = cv2.resize(
        face_gray,
        (48, 48)
    )

    print("Face resized")

    face_normalized = (
        face_resized.astype("float32")
        / 255.0
    )

    face_input = np.expand_dims(
        face_normalized,
        axis=(0, -1)
    )

    print(
        "Final shape:",
        face_input.shape
    )

    print("=" * 50)
    print("PREPROCESS FACE COMPLETED")
    print("=" * 50)

    return face_input