FROM python:3.13-slim

WORKDIR /app

# Add curl (for health checks)
RUN apt-get update && apt-get install -y curl

# Copy only requirements first for layer caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy rest of the application
COPY . .

# Optional: fail early if model.pkl doesn't exist
RUN test -f app/model_artifacts/model.pkl || (echo "❌ model.pkl not found. Run train_model.py first." && exit 1)

# Start the FastAPI app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8006"]
