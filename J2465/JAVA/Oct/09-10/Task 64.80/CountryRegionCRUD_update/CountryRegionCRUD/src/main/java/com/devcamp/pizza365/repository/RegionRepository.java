package com.devcamp.pizza365.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devcamp.pizza365.model.CRegion;

@Repository
public interface RegionRepository extends JpaRepository<CRegion, Long> {
	List<CRegion> findByCountryId(Long countryId);

	Optional<CRegion> findByIdAndCountryId(Long id, Long instructorId);
}
