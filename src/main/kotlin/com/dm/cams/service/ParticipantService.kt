package com.dm.cams.service

import com.dm.cams.domain.Participant
import com.dm.cams.domain.Person
import com.dm.cams.repository.ParticipantRepository
import org.springframework.stereotype.Service

@Service
class ParticipantService(val participantRepository: ParticipantRepository) {

    fun createParticipant(type: String, model: String?, make: String?, productionYear: Int?,
                                 registerPlate: String?, owner: Person?): Participant =
            participantRepository.save(Participant(type, model, make, productionYear, registerPlate, owner))

}