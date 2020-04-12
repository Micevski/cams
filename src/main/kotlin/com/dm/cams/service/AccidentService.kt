package com.dm.cams.service

import com.dm.cams.domain.Accident
import com.dm.cams.domain.Location
import com.dm.cams.domain.requests.LocationRequest
import com.dm.cams.repository.AccidentRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class AccidentService(val accidentRepository: AccidentRepository,
                      val locationService: LocationService,
                      val pageableUtils: PageableUtils) {

    fun findById(id: Long): Accident = accidentRepository.getOne(id)
    fun findAll(): List<Accident> = accidentRepository.findAll()
    fun finAll(page: Int, pageSize: Int, sortProperty: String?, sortDirection: Sort.Direction?): Page<Accident> =
            accidentRepository.findAll(pageableUtils.getPageable(page, pageSize, sortProperty, sortDirection))

    fun save(locationRequest: LocationRequest, id: Long?, dateAccident: LocalDateTime?, reason: String?, description: String?): Accident {
        val location: Location =
                locationRequest.let {
                    locationService.findOrCreate(it.id, it.lat, it.lng, it.streetName, it.streetNumber,
                            it.city, it.country, it.postcode, it.area)
                }
        return if (id != null)
            updateLocation(id, dateAccident, reason, description)
        else
            accidentRepository.save(Accident(location, dateAccident, reason, description))

    }

    private fun updateLocation(id: Long, dateAccident: LocalDateTime?, reason: String?, description: String?): Accident {
        val accident = findById(id);
        accident.dateAccident = dateAccident
        accident.reason = reason
        accident.description = description
        return accidentRepository.save(accident);
    }


}

