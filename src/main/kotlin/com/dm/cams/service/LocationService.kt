package com.dm.cams.service

import com.dm.cams.domain.Location
import com.dm.cams.repository.LocationRepository
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class LocationService(val locationRepository: LocationRepository) {

    fun findById(id: Long): Location = locationRepository.getOne(id)
    fun save(lat: BigDecimal, lng: BigDecimal, streetName: String?, area: String?, city: String?, country: String?, zipCode: String?): Location {
        return locationRepository.save(Location(lat, lng, streetName, area, city, country, zipCode))
    }
}