package io.hpp.analysis.repository;

import io.hpp.analysis.entity.HouseAttributes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HouseAttributesRepository extends JpaRepository<HouseAttributes, Long> {
    Page<HouseAttributes> findAllByBedrooms(Integer bedrooms, Pageable pageable);

    @Query("SELECT AVG(h.price) FROM HouseAttributes h")
    Double averagePrice();

    @Query("SELECT MIN(h.price) FROM HouseAttributes h")
    Double minPrice();

    @Query("SELECT MAX(h.price) FROM HouseAttributes h")
    Double maxPrice();

    @Query(value = """
            SELECT AVG(middle_values.square_footage) AS median_square_footage
            FROM (
                SELECT square_footage, 
                       ROW_NUMBER() OVER (ORDER BY square_footage) AS rn,
                       COUNT(*) OVER () AS cnt
                FROM house_attributes
            ) middle_values
            WHERE rn IN (FLOOR((cnt + 1) / 2), CEIL((cnt + 1) / 2))
            """, nativeQuery = true)
    Double findMedianSquareFootage();

    @Query("SELECT AVG(h.schoolRating) FROM HouseAttributes h")
    Double findAverageSchoolRating();


    @Query("SELECT h.bedrooms, AVG(h.price) FROM HouseAttributes h GROUP BY h.bedrooms ORDER BY h.bedrooms")
    List<Object[]> findAveragePriceByBedrooms();


    @Query("SELECT h.yearBuilt, AVG(h.price) FROM HouseAttributes h GROUP BY h.yearBuilt ORDER BY h.yearBuilt")
    List<Object[]> findAveragePriceByYearBuilt();

    List<HouseAttributes> findAll();

}