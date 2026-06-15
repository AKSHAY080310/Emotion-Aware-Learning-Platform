import librosa
import numpy as np
import os

from pydub import AudioSegment


def extract_features(filepath):

    extension = os.path.splitext(
        filepath
    )[1].lower()

    if extension != ".wav":

        wav_path = filepath + ".wav"

        AudioSegment.from_file(
            filepath
        ).export(
            wav_path,
            format="wav"
        )

        filepath = wav_path

    audio, sr = librosa.load(
        filepath,
        sr=22050
    )

    mfcc = librosa.feature.mfcc(
        y=audio,
        sr=sr,
        n_mfcc=40
    )

    mfcc_scaled = np.mean(
        mfcc.T,
        axis=0
    )

    return mfcc_scaled