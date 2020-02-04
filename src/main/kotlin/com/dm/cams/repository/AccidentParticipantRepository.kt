package com.dm.cams.repository

import com.dm.cams.domain.AccidentParticipant
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AccidentParticipantRepository : JpaRepository<AccidentParticipant, Long> {
    fun findAllByAccident_Id(accidentId: Long) : List<AccidentParticipant>
}