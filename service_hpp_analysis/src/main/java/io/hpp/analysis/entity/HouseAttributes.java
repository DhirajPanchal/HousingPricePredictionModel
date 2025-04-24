package io.hpp.analysis.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

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

    @NotNull
    private Double price;
}