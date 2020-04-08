package com.dm.cams.service

import com.dm.cams.domain.Location
import com.dm.cams.repository.LocationRepository
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class LocationService(val locationRepository: LocationRepository) {

    fun findById(id: Long): Location = locationRepository.getOne(id)
    fun save(lat: BigDecimal, lng: BigDecimal, streetName: String, area: String): Location {
        return locationRepository.save(parseLocationData(lat, lng, streetName, area))
    }

    private fun parseLocationData(lat: BigDecimal, lng: BigDecimal, streetName: String, area: String): Location {
        val locationData: List<String> = streetName.split(",");
        val streetName = locationData.getOrElse(0) { " " };
        val cityAndZipCode = locationData.getOrElse(1) { " " }
                .split(" ");
        val zipCode = cityAndZipCode.last();
        val city = cityAndZipCode.dropLast(1).joinToString().replace(",", "")
        val country = locationData.last();
        return Location(lat, lng, streetName, area, city, country, zipCode)
    }
}