// HPP Estimation

// Train model
python hpp_train_model.py

// Run APIs on http://localhost:8005/
uvicorn app.main:app --host 127.0.0.1 --port 8005 --reload

/predict-property-price

{
  "square_footage": 1430,
  "bedrooms": 3,
  "bathrooms": 1.5,
  "year_built": 1990,
  "lot_size": 6200,
  "distance_to_city_center": 3.3,
  "school_rating": 7.2
}

/predict (Batch)

[
  {
    "square_footage": 1430,
    "bedrooms": 3,
    "bathrooms": 1.5,
    "year_built": 1990,
    "lot_size": 6200,
    "distance_to_city_center": 3.3,
    "school_rating": 7.2
  },
  {
    "square_footage": 1430,
    "bedrooms": 3,
    "bathrooms": 1.5,
    "year_built": 2000,
    "lot_size": 6200,
    "distance_to_city_center": 3.3,
    "school_rating": 7.2
  },
  {
    "square_footage": 1430,
    "bedrooms": 3,
    "bathrooms": 1.5,
    "year_built": 2010,
    "lot_size": 6200,
    "distance_to_city_center": 3.3,
    "school_rating": 7.2
  }
]