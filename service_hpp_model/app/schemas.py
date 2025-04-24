from pydantic import BaseModel, validator
from typing import List

class HouseInput(BaseModel):
    square_footage: float
    bedrooms: int
    bathrooms: float  # Must be >= 1 and a multiple of 0.5
    year_built: int
    lot_size: float
    distance_to_city_center: float
    school_rating: float

    @validator('bathrooms')
    def validate_bathrooms(cls, v):
        if v < 1 or v * 2 % 1 != 0:
            raise ValueError('bathrooms must be >= 1 and a multiple of 0.5')
        return v