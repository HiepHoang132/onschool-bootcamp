package com.devcamp.pizza365.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devcamp.pizza365.model.CCountry;
import com.devcamp.pizza365.repository.CountryRepository;

@RestController
public class CountryController {
	@Autowired
	private CountryRepository countryRepository;

	@CrossOrigin
	@GetMapping("/country/details/{id}")
	public CCountry getCountryById(@PathVariable Long id) {
		if (countryRepository.findById(id).isPresent())
			return countryRepository.findById(id).get();
		else
			return null;
	}

	@CrossOrigin
	@GetMapping("/country/all")
	public List<CCountry> getAllCountry() {
		return countryRepository.findAll();
	}

	@CrossOrigin
	@PostMapping("/country/create")
	public ResponseEntity<Object> createCountry(@RequestBody CCountry cCountry) {
		try {
			CCountry newRole = new CCountry();
			newRole.setCountryName(cCountry.getCountryName());
			newRole.setCountryCode(cCountry.getCountryCode());
			newRole.setRegions(cCountry.getRegions());
			CCountry savedRole = countryRepository.save(newRole);
			return new ResponseEntity<>(savedRole, HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println("+++++++++++++++++++++::::: " + e.getCause().getCause().getMessage());
			return ResponseEntity.unprocessableEntity()
					.body("Failed to Create specified Voucher: " + e.getCause().getCause().getMessage());
		}
	}

	@CrossOrigin
	@PutMapping("/country/update/{id}")
	public ResponseEntity<Object> updateCountry(@PathVariable("id") Long id, @RequestBody CCountry cCountry) {
		Optional<CCountry> countryData = countryRepository.findById(id);
		if (countryData.isPresent()) {
			CCountry newCountry = countryData.get();
			newCountry.setCountryName(cCountry.getCountryName());
			newCountry.setCountryCode(cCountry.getCountryCode());
			newCountry.setRegions(cCountry.getRegions());
			CCountry savedCountry = countryRepository.save(newCountry);
			return new ResponseEntity<>(savedCountry, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@CrossOrigin
	@DeleteMapping("/country/delete/{id}")
	public ResponseEntity<Object> deleteCountryById(@PathVariable Long id) {
		try {
			Optional<CCountry> optional = countryRepository.findById(id);
			if (optional.isPresent()) {
				countryRepository.deleteById(id);
			} else {
				// countryRepository.deleteById(id);
			}
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
