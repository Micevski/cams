package com.dm.cams.api

import com.dm.cams.domain.Accident
import com.dm.cams.domain.requests.AccidentRequest
import com.dm.cams.domain.requests.TableFilterRequest
import com.dm.cams.service.AccidentService
import org.springframework.data.domain.Page
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/accidents")
class AccidentController(val accidentService: AccidentService) {

    @GetMapping
    fun getAll() = accidentService.findAll();

    @GetMapping("/filter")
    fun getAll(accidentFilterRequest: TableFilterRequest): Page<Accident> {
        return accidentService.finAll(accidentFilterRequest.page, accidentFilterRequest.pageSize,
                accidentFilterRequest.sortProperty, accidentFilterRequest.sortDirection)
    }

    @GetMapping("{id}")
    fun getAccidentById(@PathVariable id: Long): Accident {
        return this.accidentService.findById(id)
    }

    @PostMapping
    fun saveAccident(@RequestBody request: AccidentRequest): Accident? {
        return accidentService.save(request.location, request.id, request.dateAccident, request.reason, request.description)
    }
}