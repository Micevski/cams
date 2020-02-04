package com.dm.cams.repository

import com.dm.cams.domain.ParticipantPassenger
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ParticipantPassengerRepository : JpaRepository<ParticipantPassenger, Long> {
    fun findAllByParticipant_Id(participantId: Long) : List<ParticipantPassenger>
}