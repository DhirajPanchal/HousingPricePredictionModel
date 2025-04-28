package io.hpp.analysis.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HouseAttributes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Double squareFootage;

    @NotNull
    private Integer bedrooms;

    @NotNull
    private Double bathrooms;

    @NotNull
    private Integer yearBuilt;

    @NotNull
    private Double lotSize;

    @NotNull
    private Double distanceToCityCenter;

    @NotNull
    private Double schoolRating;

    @NotNull
    private Double price;
}


