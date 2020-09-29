package com.dm.cams.service

import com.dm.cams.domain.AnalyticsCountDTO
import com.dm.cams.repository.AccidentRepository
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.ZonedDateTime
import java.util.stream.Collectors

@Service
class AnalyticService(val accidentRepository: AccidentRepository) {

    fun getAccidentsCountGroupByDate(from: ZonedDateTime, to: ZonedDateTime): Map<LocalDate, Long> {
        return accidentRepository.findAllByDateAccidentLessThanEqualAndDateAccidentGreaterThanEqual(to, from)
                .stream()
                .map { AnalyticsCountDTO<LocalDate>(it.id, it.dateAccident.toLocalDate()) }
                .collect(Collectors.groupingBy(AnalyticsCountDTO<LocalDate>::grouped, Collectors.counting()))

    }

    fun getAccidentsCountGroupByCity(from: ZonedDateTime, to: ZonedDateTime): Map<String, Long> {
        return accidentRepository.findAllByDateAccidentLessThanEqualAndDateAccidentGreaterThanEqual(to, from)
                .stream()
                .map { AnalyticsCountDTO(it.id, it.location.city ?: "N/A") }
                .collect(Collectors.groupingBy(AnalyticsCountDTO<String>::grouped, Collectors.counting()))

    }
}
