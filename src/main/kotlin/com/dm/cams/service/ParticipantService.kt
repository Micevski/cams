package com.dm.cams.service

import com.dm.cams.domain.Participant
import com.dm.cams.domain.Person
import com.dm.cams.domain.requests.ParticipantTableRequest
import com.dm.cams.repository.ParticipantRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.util.*

@Service
class ParticipantService(val participantRepository: ParticipantRepository,
                         val pageableUtils: PageableUtils) {

    fun findById(id: Long) = participantRepository.getOne(id);

    fun finAll(page: Int, pageSize: Int, sortProperty: String?, sortDirection: Sort.Direction?): Page<Participant> =
            participantRepository.findAll(pageableUtils.getPageable(page, pageSize, sortProperty, sortDirection))

//    fun findAll(filterRequest: ParticipantTableRequest):Page<Participant> {
//
//    }

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

    fun findByPlate(plate: String): Optional<Participant> = participantRepository.findByRegisterPlate(plate)


}
