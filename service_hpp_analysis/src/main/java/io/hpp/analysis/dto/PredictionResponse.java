package io.hpp.analysis.dto;

import java.util.List;

public class PredictionResponse {
    private List<Double> predictions;

    public List<Double> getPredictions() {
        return predictions;
    }

    public void setPredictions(List<Double> predictions) {
        this.predictions = predictions;
    }
}