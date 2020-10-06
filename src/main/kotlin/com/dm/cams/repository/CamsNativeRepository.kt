package com.dm.cams.repository

import org.springframework.stereotype.Repository
import java.time.ZonedDateTime
import javax.persistence.EntityManager

@Repository
class CamsNativeRepository(private val entityManager: EntityManager) {
    companion object {
        private const val PATH = "/analytic_queries"
        const val AGE_SERIES = "$PATH/age_series.sql"
        const val ACCIDENT_TIME_SERIES = "$PATH/accident_time_series.sql"
    }

    fun getAgeSeries(from: ZonedDateTime, to: ZonedDateTime): List<*> {
        val args = HashMap<String, ZonedDateTime>();
        args["#from_date"] = from
        args["#to_date"] = to
        return runNativeQuery(AGE_SERIES, args);
    }

    fun getAccidentsTimeSeries(from: ZonedDateTime, to: ZonedDateTime): List<*> {
        val args = HashMap<String, ZonedDateTime>();
        args["#from_date"] = from
        args["#to_date"] = to
        return runNativeQuery(ACCIDENT_TIME_SERIES, args);
    }

    private fun runNativeQuery(resourceFile: String, args: Map<String, ZonedDateTime>): List<*> {
        var query = javaClass.getResource(resourceFile).readText()
        args.forEach {
            query = query.replace(it.key, "'${it.value.toOffsetDateTime()}'")
        }
        return entityManager.createNativeQuery(query)
                .resultList
    }
}
