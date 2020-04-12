package com.dm.cams.service

import com.dm.cams.domain.Participant
import com.dm.cams.domain.Person
import com.dm.cams.repository.ParticipantRepository
import org.springframework.stereotype.Service

@Service
class ParticipantService(val participantRepository: ParticipantRepository) {

    fun findById(id: Long) = participantRepository.getOne(id);

    fun createOrUpdateParticipant(id: Long?, type: String, model: String?, make: String?, productionYear: Int?,
                                  registerPlate: String?, owner: Person?): Participant {
        return id?.let {
            val participant = findById(id)
            participant.make = make
            participant.model = model
            participant.owner = owner
            participant.productionYear = productionYear
            participant.registerPlate = registerPlate
            participant.type = type
            participantRepository.save(participant)
        } ?: participantRepository.save(Participant(type, model, make, productionYear, registerPlate, owner))

    }

}