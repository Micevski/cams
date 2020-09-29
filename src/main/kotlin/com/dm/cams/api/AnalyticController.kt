package com.dm.cams.api

import com.dm.cams.domain.requests.AnalyticRequest
import com.dm.cams.service.AnalyticService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.time.ZonedDateTime

@RestController
@RequestMapping("api/analytics")
class AnalyticController(val service: AnalyticService) {

    @PostMapping("accidents/date-grouped")
    fun getAccidentsCountByDate(@RequestBody(required = false) request: AnalyticRequest?): Map<LocalDate, Long> {
        val to = request?.to ?: ZonedDateTime.now()
        val from: ZonedDateTime = request?.from ?: to.minusMonths(1)
        return service.getAccidentsCountGroupByDate(from, to)
    }

    @PostMapping("accidents/city-grouped")
    fun getAccidentsCountByCity(@RequestBody(required = false) request: AnalyticRequest?): Map<String, Long> {
        val to = request?.to ?: ZonedDateTime.now()
        val from: ZonedDateTime = request?.from ?: to.minusMonths(1)
        return service.getAccidentsCountGroupByCity(from, to)
    }
}

