FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Add curl (for health checks)
RUN apt-get update && apt-get install -y curl

# Copy only requirements first (for better Docker caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Run FastAPI using uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8005"]
