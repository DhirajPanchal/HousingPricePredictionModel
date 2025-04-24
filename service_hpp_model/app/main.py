from fastapi import FastAPI, HTTPException
from typing import List, Union
from app.schemas import HouseInput
from typing import List, Union
import joblib
import pandas as pd
import os

app = FastAPI(title="Housing Price Prediction API", version="1.0")


model_path = os.path.join(os.path.dirname(__file__), "model_artifacts", "model.pkl")
model = joblib.load(model_path)
features = ['square_footage', 'bedrooms', 'bathrooms', 'year_built', 'lot_size', 'distance_to_city_center', 'school_rating']

@app.get("/health")
def health_check():
    print("[ service_hpp_model ] GET /health")
    return {"status": "ok"}


@app.post("/predict")
def predict(data: Union[HouseInput, List[HouseInput]]):
    print("*** [ service_hpp_model ] POST /predict 2")
    print(data)
    if isinstance(data, list):
        df = pd.DataFrame([d.dict() for d in data])
    else:
        df = pd.DataFrame([data.dict()])

    prediction = model.predict(df)
    return {"predictions": [round(p) for p in prediction]}

# @app.post("/predict")
# def predict(data: Union[HouseInput, List[HouseInput]]):
#     if isinstance(data, list):
#         df = pd.DataFrame([d.dict() for d in data])
#     else:
#         df = pd.DataFrame([data.dict()])
#
#     prediction = model.predict(df)
#     return {"predictions": prediction.tolist()}

@app.get("/model-info")
def model_info():
    print("[ service_hpp_model ] GET /model-info")
    labeled_coefficients = dict(zip(features, model.coef_))
    return {
        "coefficients": labeled_coefficients,
        "intercept": model.intercept_
    }