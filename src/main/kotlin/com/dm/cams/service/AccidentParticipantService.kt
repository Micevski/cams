package com.dm.cams.service

import com.dm.cams.domain.Accident
import com.dm.cams.domain.AccidentParticipant
import com.dm.cams.domain.Participant
import com.dm.cams.domain.Person
import com.dm.cams.domain.requests.ParticipantRequest
import com.dm.cams.repository.AccidentParticipantRepository
import org.springframework.stereotype.Service
import java.util.stream.Collectors
import kotlin.streams.toList

@Service
class AccidentParticipantService(val accidentParticipantRepository: AccidentParticipantRepository,
                                 val accidentService: AccidentService,
                                 val participantService: ParticipantService,
                                 val personService: PersonService) {

    fun findAllParticipantsForAccident(accidentId: Long): List<Participant> = accidentParticipantRepository.findAllByAccident_Id(accidentId)
            .stream()
            .map(AccidentParticipant::participant)
            .collect(Collectors.toList())

    fun addParticipantToAccident(accident: Accident, participant: Participant) =
            accidentParticipantRepository.save(AccidentParticipant(accident, participant))

    fun addParticipantsToAccident(participantsRequest: List<ParticipantRequest>, accidentId: Long): List<AccidentParticipant> {
        val accident: Accident = accidentService.findById(accidentId)
        val participantList: List<Participant> = participantsRequest.stream().map { request ->
            val owner: Person? = request.owner?.let {
                personService.findOrCreate(it.personId, it.firstName, it.lastName, it.dateOfBirth, it.genderId, it.placeOfBirth, it.placeOfLiving)
            }
            participantService.createParticipant(
                    request.type, request.model, request.make, request.productionYear, request.registerPlate, owner)
        }.toList()
        val accidentParticipantList = participantList.map { AccidentParticipant(accident, it) }
        return accidentParticipantRepository.saveAll(accidentParticipantList)
    }
}