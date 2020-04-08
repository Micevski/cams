package com.dm.cams.service

import com.dm.cams.domain.Location
import com.dm.cams.repository.LocationRepository
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class LocationService(val locationRepository: LocationRepository) {

    fun findById(id: Long): Location = locationRepository.getOne(id)
    fun save(lat: BigDecimal, lng: BigDecimal, streetName: String?, streetNumber: String?, city: String?,
             country: String?, postcode: String?, area: String): Location {
        val location = Location(lat, lng, streetName, streetNumber, city, country, area, postcode)
        return locationRepository.save(location)
    }
}
