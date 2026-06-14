import cv2
import numpy as np

def preprocess_face(image_path):

    img = cv2.imread(
        image_path,
        cv2.IMREAD_GRAYSCALE
    )

    img = cv2.resize(
        img,
        (48,48)
    )

    img = img / 255.0

    img = img.reshape(
        1,
        48,
        48,
        1
    )

    return img