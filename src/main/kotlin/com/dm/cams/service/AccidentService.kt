package com.dm.cams.service

import com.dm.cams.domain.Accident
import com.dm.cams.domain.Location
import com.dm.cams.repository.AccidentRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class AccidentService(val accidentRepository: AccidentRepository) {

    fun findById(id: Long): Accident = accidentRepository.getOne(id)
    fun save(location: Location, dateAccident: LocalDateTime?, reason: String?, description: String?): Accident =
            accidentRepository.save(Accident(location, dateAccident, reason, description))


}