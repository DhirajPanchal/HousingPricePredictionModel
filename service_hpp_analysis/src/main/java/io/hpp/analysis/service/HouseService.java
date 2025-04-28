package io.hpp.analysis.service;


import io.hpp.analysis.client.HppModelClient;
import io.hpp.analysis.entity.HouseAttributes;
import io.hpp.analysis.entity.HouseInput;
import io.hpp.analysis.repository.HouseAttributesRepository;
import io.hpp.analysis.util.MappingUtil;
import jakarta.annotation.PostConstruct;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.List;
import java.util.Map;

@Service
public class HouseService {

    private final HouseAttributesRepository repository;

    private final HppModelClient modelClient;

    public HouseService(HouseAttributesRepository repository, HppModelClient modelClient) {
        this.repository = repository;
        this.modelClient = modelClient;
    }

    @PostConstruct
    public void init() throws Exception {
        var file = new ClassPathResource("hpp_training.csv");
        try (var reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            reader.lines().skip(1).map(line -> {
                String[] parts = line.split(",");
                return new HouseAttributes(null,
                        Double.valueOf(parts[1]),
                        Integer.valueOf(parts[2]),
                        Double.valueOf(parts[3]),
                        Integer.valueOf(parts[4]),
                        Double.valueOf(parts[5]),
                        Double.valueOf(parts[6]),
                        Double.valueOf(parts[7]),
                        Double.valueOf(parts[8]));
            }).forEach(repository::save);
        }
    }


    /**
     * Summary API sub methods
     */

    public Double getAveragePrice() {
        return repository.averagePrice();
    }

    @Cacheable("summary")
    public Double getMedianSquareFootage() {
        return repository.findMedianSquareFootage();
    }


    public Double getMinPrice() {
        return repository.minPrice();
    }

    public Double getMaxPrice() {
        return repository.maxPrice();
    }

    public Double getAverageSchoolRating() {
        return repository.findAverageSchoolRating();
    }

    /**
     * Graph 1
     */

    public List<Map<String, Object>> getPriceByBedroomsGraph() {
        List<Object[]> result = repository.findAveragePriceByBedrooms();
        return result.stream()
                .map(obj -> Map.of(
                        "bedrooms", obj[0],
                        "avgPrice", obj[1]
                ))
                .toList();
    }

    /**
     * Graph 2
     */

    public List<Map<String, Object>> getYearBuiltPriceGraph() {
        List<Object[]> result = repository.findAveragePriceByYearBuilt();
        return result.stream()
                .map(obj -> Map.of(
                        "yearBuilt", obj[0],
                        "avgPrice", obj[1]
                ))
                .toList();
    }


    /**
     * Datagrid.
     */
    public List<HouseAttributes> getAllProperties() {
        return repository.findAll();
    }


    @Cacheable("allProperties")
    public Page<HouseAttributes> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Cacheable("filteredProperties")
    public Page<HouseAttributes> getByBedrooms(Integer bedrooms, Pageable pageable) {
        return repository.findAllByBedrooms(bedrooms, pageable);
    }


    public void exportToCSV(Writer writer, Integer bedrooms) {
        List<HouseAttributes> properties = (bedrooms != null)
                ? repository.findAllByBedrooms(bedrooms, Pageable.unpaged()).getContent()
                : repository.findAll();

        try (PrintWriter pw = new PrintWriter(writer)) {
            pw.println("id,squareFootage,bedrooms,bathrooms,yearBuilt,lotSize,distanceToCityCenter,schoolRating,price");
            for (HouseAttributes h : properties) {
                pw.printf(
                        "%d,%.1f,%d,%.1f,%d,%.1f,%.1f,%.1f,%.0f%n",
                        h.getId(),
                        h.getSquareFootage(),
                        h.getBedrooms(),
                        h.getBathrooms(),
                        h.getYearBuilt(),
                        h.getLotSize(),
                        h.getDistanceToCityCenter(),
                        h.getSchoolRating(),
                        h.getPrice()
                );
            }
        }
    }


    public List<Double> predictPrice(HouseInput request) {
        Map<String, Object> snakeCaseMap = MappingUtil.convertToSnakeCaseMap(request);
        return modelClient.predictPrice(snakeCaseMap);
    }



}