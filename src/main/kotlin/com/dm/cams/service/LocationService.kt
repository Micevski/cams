package com.dm.cams.service

import com.dm.cams.domain.Location
import com.dm.cams.repository.LocationRepository
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class LocationService(val locationRepository: LocationRepository) {

    fun findById(id: Long): Location = locationRepository.getOne(id)

    fun findOrCreate(id: Long?, lat: BigDecimal, lng: BigDecimal, streetName: String?, streetNumber: String?, city: String?,
                     country: String?, postcode: String?, area: String): Location {
        return if (id != null) updateLocation(id, lat, lng, streetName, streetNumber, city, country, postcode, area)
        else save(lat, lng, streetName, streetNumber, city, country, postcode, area)
    }

    fun save(lat: BigDecimal, lng: BigDecimal, streetName: String?, streetNumber: String?, city: String?,
             country: String?, postcode: String?, area: String): Location {
        val location = Location(lat, lng, streetName, streetNumber, city, country, area, postcode)
        return locationRepository.save(location)
    }

    fun updateLocation(id: Long, lat: BigDecimal, lng: BigDecimal, streetName: String?, streetNumber: String?, city: String?,
                       country: String?, postcode: String?, area: String): Location {
        val location = findById(id);
        location.lat = lat;
        location.lng = lng;
        location.streetName = streetName;
        location.streetNumber = streetNumber;
        location.city = city;
        location.country = country;
        location.postcode = postcode;
        location.area = area;
        return locationRepository.save(location)
    }
}
