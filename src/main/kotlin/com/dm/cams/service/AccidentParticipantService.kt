package com.dm.cams.service

import com.dm.cams.domain.Accident
import com.dm.cams.domain.AccidentParticipant
import com.dm.cams.domain.Participant
import com.dm.cams.domain.Person
import com.dm.cams.domain.requests.ParticipantRequest
import com.dm.cams.repository.AccidentParticipantRepository
import org.springframework.stereotype.Service
import kotlin.streams.toList

@Service
class AccidentParticipantService(val accidentParticipantRepository: AccidentParticipantRepository,
                                 val accidentService: AccidentService,
                                 val participantService: ParticipantService,
                                 val personService: PersonService) {

    fun findAllParticipantsForAccident(accidentId: Long): List<AccidentParticipant> = accidentParticipantRepository.findAllByAccident_Id(accidentId)

    fun addParticipantToAccident(accident: Accident, participant: Participant, guilty: Boolean) =
            accidentParticipantRepository.save(AccidentParticipant(accident, participant, guilty))

    fun addParticipantsToAccident2(participantsRequest: List<ParticipantRequest>, accidentId: Long): List<AccidentParticipant> {
        val accident: Accident = accidentService.findById(accidentId)
        //List of new participants that need to be added to the accident.
        val newParticipantList: List<Participant> = participantsRequest
                .stream()
                .filter { it.accidentParticipantId == null }
                .map { createOrUpdateParticipant(it) }
                .toList()
        //Update existing accident participants
        participantsRequest.stream()
                .filter { it.accidentParticipantId != null }
                .forEach { createOrUpdateParticipant(it) }
//        val accidentParticipantList = newParticipantList.map { AccidentParticipant(accident, it) }
//        accidentParticipantRepository.saveAll(accidentParticipantList)
        return findAllParticipantsForAccident(accidentId)
    }

    fun findByAccidentIdAndParticipantId(accidentId: Long, participantId: Long): AccidentParticipant =
            accidentParticipantRepository.findByAccidentIdAndParticipantId(accidentId, participantId);

    fun addParticipantsToAccident(participantsRequest: List<ParticipantRequest>, accidentId: Long): List<AccidentParticipant> {
        val accident: Accident = accidentService.findById(accidentId)
        val accidentParticipants = participantsRequest.stream()
                .map {
                    val participant = createOrUpdateParticipant(it)
                    return@map createOrUpdateAccidentParticipant(participant, accident, it.accidentParticipantId, it.guilty)
                }
                .toList()
        accidentParticipantRepository.saveAll(accidentParticipants);
        return findAllParticipantsForAccident(accidentId);

    }

    private fun createOrUpdateAccidentParticipant(participant: Participant, accident: Accident,
                                                  accidentParticipantId: Long?, guilty: Boolean): AccidentParticipant {
        return accidentParticipantId?.let {
            val accidentParticipant = accidentParticipantRepository.getOne(it)
            accidentParticipant.guilty = guilty
            return accidentParticipant
        } ?: AccidentParticipant(accident, participant, guilty)

    }


    fun createOrUpdateParticipant(request: ParticipantRequest): Participant {
        val owner: Person? = request.owner?.let {
            personService.findOrCreate(it.id, it.firstName, it.lastName, it.dateOfBirth,
                    it.genderId, it.placeOfBirth, it.placeOfLiving, it.uniquePersonIdentifier)
        }
        return participantService.createOrUpdateParticipant(request.id,
                request.type, request.model, request.make, request.productionYear, request.registerPlate, owner)
    }
}
