package com.dm.cams.repository

import com.dm.cams.domain.Participant
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ParticipantRepository : JpaRepository<Participant, Long>, JpaSpecificationExecutor<Participant> {
    fun findByRegisterPlate(plate: String): Optional<Participant>
}
