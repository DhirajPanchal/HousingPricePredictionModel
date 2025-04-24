package io.hpp.analysis.util;

import io.hpp.analysis.entity.HouseInput;

import java.util.HashMap;
import java.util.Map;

public class MappingUtil {

    public static Map<String, Object> convertToSnakeCaseMap(HouseInput request) {
        Map<String, Object> map = new HashMap<>();
        map.put("square_footage", request.getSquareFootage());
        map.put("bedrooms", request.getBedrooms());
        map.put("bathrooms", request.getBathrooms());
        map.put("year_built", request.getYearBuilt());
        map.put("lot_size", request.getLotSize());
        map.put("distance_to_city_center", request.getDistanceToCityCenter());
        map.put("school_rating", request.getSchoolRating());
        return map;
    }
}