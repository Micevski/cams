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

    fun save(locationRequest: LocationRequest, dateAccident: LocalDateTime?, reason: String?, description: String?): Accident {
        val location: Location =
                locationRequest.let {
                    locationService.save(it.lat, it.lng, it.streetName, it.area, it.city, it.country, it.zipCode)
                }
        return accidentRepository.save(Accident(location, dateAccident, reason, description))

    }


}

