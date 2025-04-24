import requests
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, validator
from typing import List, Union
from app.schemas import HouseInput
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Housing Price Prediction Estimation API", version="1.0")

# Allow all origins, methods, and headers (for development only)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins. Use specific domains in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ML model service endpoint
# ML_MODEL_URL = "http://service_hpp_model:80/predict"
# ML_MODEL_URL = "http://localhost:8006/predict"
ML_MODEL_URL = os.getenv("ML_MODEL_URL", "http://localhost:8006")

@app.get("/health")
def health_check():
    print("[ service_hpp_estimation ] GET /health")
    return {"status": "ok"}

@app.post("/predict-property-price")
def predict_property(data: Union[HouseInput, List[HouseInput]]):
    print("[ service_hpp_estimation ] GET /predict-property-price")
    try:
        PREDICTION_URL = ML_MODEL_URL+"/predict"
        print("PREDICTION_URL : ",PREDICTION_URL)
        response = requests.post(PREDICTION_URL, json=[d.dict() for d in data] if isinstance(data, list) else [data.dict()])
        response.raise_for_status()
        result = response.json()
        result["predictions"] = [round(p) for p in result["predictions"]]
        return result
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))