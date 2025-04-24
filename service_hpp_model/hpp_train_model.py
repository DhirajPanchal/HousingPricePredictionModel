import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib
import os

df = pd.read_csv("hpp_training.csv")
X = df.drop(columns=["id", "price"])
y = df["price"]

model = Ridge()
model.fit(X, y)

os.makedirs("app/model_artifacts", exist_ok=True)
joblib.dump(model, "app/model_artifacts/model.pkl")

print("HPP model trained and saved successfully.")