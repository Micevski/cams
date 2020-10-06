package com.dm.cams.service

import com.dm.cams.domain.AnalyticsCountDTO
import com.dm.cams.domain.response.TwoDimensionAnalyticResponse
import com.dm.cams.repository.AccidentRepository
import com.dm.cams.repository.CamsNativeRepository
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.ZonedDateTime
import java.util.stream.Collectors

@Service
class AnalyticService(val accidentRepository: AccidentRepository,
                      val nativeRepository: CamsNativeRepository) {

    fun getAccidentsCountGroupByDate(from: ZonedDateTime, to: ZonedDateTime): TwoDimensionAnalyticResponse<LocalDate> {
        val data = accidentRepository.findAllByDateAccidentLessThanEqualAndDateAccidentGreaterThanEqual(to, from)
                .stream()
                .map { AnalyticsCountDTO<LocalDate>(it.id, it.dateAccident.toLocalDate()) }
                .collect(Collectors.groupingBy(AnalyticsCountDTO<LocalDate>::grouped, Collectors.counting()))
        return TwoDimensionAnalyticResponse.of(data)
    }


    fun getAccidentsCountGroupByCity(from: ZonedDateTime, to: ZonedDateTime): TwoDimensionAnalyticResponse<String> {
        val data = accidentRepository.findAllByDateAccidentLessThanEqualAndDateAccidentGreaterThanEqual(to, from)
                .stream()
                .map { AnalyticsCountDTO(it.id, it.location.city ?: "N/A") }
                .collect(Collectors.groupingBy(AnalyticsCountDTO<String>::grouped, Collectors.counting()))
        return TwoDimensionAnalyticResponse.of(data)
    }

    fun getAgeSeries(from: ZonedDateTime, to: ZonedDateTime): TwoDimensionAnalyticResponse<String> {
        return objectListToAnalyticResponse(nativeRepository.getAgeSeries(from, to))
    }

    fun getAccidentsTimeSeries(from: ZonedDateTime, to: ZonedDateTime): TwoDimensionAnalyticResponse<String> {
        return objectListToAnalyticResponse(nativeRepository.getAccidentsTimeSeries(from, to))
    }


    private fun <T> objectListToAnalyticResponse(list: List<*>) : TwoDimensionAnalyticResponse<T>{
        val map = HashMap<T, Long>()
        list.forEach {
            val tempList = it.toList()
            @Suppress("UNCHECKED_CAST")
            map[tempList[0]!! as T] = (tempList[1]!! as Int).toLong()
        }
        return TwoDimensionAnalyticResponse.of(map)
    }
}
