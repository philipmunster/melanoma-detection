import joblib
import numpy as np
import pandas as pd

artifact = joblib.load('backend/models/model_v2.joblib')
PIPELINE = artifact["pipeline"]
FEATURES = artifact["feature_names"]
THRESHOLD = artifact.get("threshold", 0.5)
VERSION = artifact.get("version", "v?")

def predict_proba_from_features(x) -> float:
    """
    features_dict must contain ALL keys in FEATURES with numeric values.
    """
    x = pd.DataFrame([x], columns=FEATURES)
    proba = float(PIPELINE.predict_proba(x)[0, 1])
    return proba
