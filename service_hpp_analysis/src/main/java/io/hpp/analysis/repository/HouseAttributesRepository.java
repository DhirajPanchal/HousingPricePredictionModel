package io.hpp.analysis.repository;


import io.hpp.analysis.entity.HouseAttributes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HouseAttributesRepository extends JpaRepository<HouseAttributes, Long> {
    Page<HouseAttributes> findAllByBedrooms(Integer bedrooms, Pageable pageable);

    @Query("SELECT AVG(h.price) FROM HouseAttributes h")
    Double averagePrice();

    @Query("SELECT MIN(h.price) FROM HouseAttributes h")
    Double minPrice();

    @Query("SELECT MAX(h.price) FROM HouseAttributes h")
    Double maxPrice();
}