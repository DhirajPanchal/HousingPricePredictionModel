package io.hpp.analysis.client;

import io.hpp.analysis.dto.PredictionResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Component
public class HppModelClient {

    private final RestTemplate restTemplate;
    private final String mlModelUrl;

    public HppModelClient(RestTemplate restTemplate, @Value("${ml.model.url}") String mlModelUrl) {
        this.restTemplate = restTemplate;
        this.mlModelUrl = mlModelUrl;
    }

    public List<Double>  predictPrice(Map<String, Object> houseFeatures) {
        List<Map<String, Object>> requestBody = Collections.singletonList(houseFeatures);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<List<Map<String, Object>>> entity = new HttpEntity<>(requestBody, headers);

        String predictUrl = mlModelUrl + "/predict";

        System.out.println("predictUrl : "+predictUrl);

        try {
            ResponseEntity<PredictionResponse> response = restTemplate.exchange(
                    predictUrl,
                    HttpMethod.POST,
                    entity,
                    PredictionResponse.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return response.getBody().getPredictions();  // return first prediction
            } else {
                throw new RuntimeException("Prediction failed with status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to call ML model API", e);
        }
    }

}