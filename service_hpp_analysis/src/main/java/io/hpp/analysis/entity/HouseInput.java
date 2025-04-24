package io.hpp.analysis.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class HouseInput {

    @NotNull
    private Double squareFootage;

    @NotNull
    private Integer bedrooms;

    @NotNull
//    @DecimalMin("1.0")
//    @Digits(integer = 2, fraction = 1)
    private Double bathrooms;

    @NotNull
    private Integer yearBuilt;

    @NotNull
    private Double lotSize;

    @NotNull
    private Double distanceToCityCenter;

    @NotNull
    private Double schoolRating;

}