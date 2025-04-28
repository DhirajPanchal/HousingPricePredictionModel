package io.hpp.analysis.controller;


import io.hpp.analysis.entity.HouseAttributes;
import io.hpp.analysis.entity.HouseInput;
import io.hpp.analysis.service.HouseService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HouseController {

    private final HouseService service;

    public HouseController(HouseService service) {
        this.service = service;
    }

    @Operation(summary = "Run what-if analysis by predicting property price")
    @PostMapping("/predict-property-price")
    public List<Double> runWhatIf(@Valid @RequestBody HouseInput input) {
        return service.predictPrice(input);
    }


    // "total_properties": 50,
    @Operation(summary = "Get average,  min, max property prices, median_sqft, avg_school_rating")
    @GetMapping("/market-summary")
    public Map<String, String> getSummary() {
        return Map.of(

                "avg_price", "" + service.getAveragePrice(),
                "median_sqft", "" + service.getMedianSquareFootage(),
                "price_range_min", "" + service.getMinPrice(),
                "price_range_max", "" + service.getMinPrice(),
                "avg_school_rating", "" + service.getAverageSchoolRating()
        );
    }

    @Operation(summary = "Price and Bedrooms Graph")
    @GetMapping("/graph-price-bedrooms")
    public List<Map<String, Object>> getGraphPriceByBedrooms() {
        return service.getPriceByBedroomsGraph();
    }

    @Operation(summary = "Year Build vs Price Graph")
    @GetMapping("/graph-year-build-price")
    public List<Map<String, Object>> getGraphYearBuiltPrice() {
        return service.getYearBuiltPriceGraph();
    }

    @Operation(summary = "Get All Dataset")
    @GetMapping("/properties")
    public List<HouseAttributes> getAllProperties() {
        return service.getAllProperties();
    }


//    @Operation(summary = "Get paginated list of properties")
//    @GetMapping("/properties")
//    public Page<HouseAttributes> getAll(Pageable pageable) {
//        return service.getAll(pageable);
//    }
//
//    @Operation(summary = "Filter properties by bedroom count")
//    @GetMapping("/properties/filter")
//    public Page<HouseAttributes> getFiltered(@RequestParam Integer bedrooms, Pageable pageable) {
//        return service.getByBedrooms(bedrooms, pageable);
//    }


    @Operation(summary = "Export property data as CSV")
    @GetMapping(value = "/export", produces = "text/csv")
    public void exportCSV(
            @RequestParam(required = false) Integer bedrooms,
            HttpServletResponse response
    ) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=properties.csv");
        service.exportToCSV(response.getWriter(), bedrooms);
    }


    @GetMapping("/health")
    public String healthCheck() {
        return "OK";
    }


}