package com.dm.cams.api

import com.dm.cams.domain.Accident
import com.dm.cams.domain.Location
import com.dm.cams.domain.requests.AccidentRequest
import com.dm.cams.service.AccidentService
import com.dm.cams.service.LocationService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/accidents")
class AccidentController(val accidentService: AccidentService,
                         val locationService: LocationService) {

    @GetMapping
    fun getAll() = accidentService.findAll();

    @PostMapping
    fun saveAccident(@RequestBody request: AccidentRequest): Accident? {
        val locationId: Long? = request.locationId
        val location: Location =
                if (locationId != null) locationService.findById(locationId)
                else request.location!!.let {
                    locationService.save(it.lat, it.lng, it.streetName, it.area, it.city, it.country, it.zipCode)
                }
        accidentService.save(location, request.dateAccident, request.reason, request.description)

        return null
    }
}