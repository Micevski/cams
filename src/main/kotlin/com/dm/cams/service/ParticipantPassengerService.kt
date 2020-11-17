package com.dm.cams.service

import com.dm.cams.domain.ParticipantPassenger
import com.dm.cams.domain.Person
import com.dm.cams.domain.enums.InjuredLevel
import com.dm.cams.domain.requests.ParticipantPassengerRequest
import com.dm.cams.repository.ParticipantPassengerRepository
import org.springframework.stereotype.Service

@Service
class ParticipantPassengerService(val repository: ParticipantPassengerRepository,
                                  val accidentParticipantService: AccidentParticipantService,
                                  val personService: PersonService) {

    fun findById(id: Long): ParticipantPassenger = repository.getOne(id);

    fun findAllForParticipant(participantId: Long): List<ParticipantPassenger> = repository.findAllByParticipantId(participantId);
    fun findAllForAccident(accidentId: Long): List<ParticipantPassenger> {
        val participantIds = accidentParticipantService.findAllParticipantsForAccident(accidentId)
                .map { it.id }
        return repository.findAllByParticipantIdIn(participantIds)
    }

    fun createOrUpdate(request: List<ParticipantPassengerRequest>, accidentId: Long): List<ParticipantPassenger> {
        val passengers = request.map {
            it.participantPassengerId?.let { _ ->
                updateParticipantPassenger(it)
            } ?: createParticipantPassenger(it, accidentId)
        }
        return repository.saveAll(passengers)
    }

    fun updateParticipantPassenger(request: ParticipantPassengerRequest): ParticipantPassenger {
        val participantPassenger = findById(request.participantPassengerId!!)
        participantPassenger.injuredLevel = InjuredLevel.values()[request.injuredLevel]
        participantPassenger.passenger = personService.updateExistingPerson(request.passenger)
        participantPassenger.driver = request.driver
        repository.save(participantPassenger)
        return participantPassenger;
    }

    fun createParticipantPassenger(request: ParticipantPassengerRequest, accidentId: Long): ParticipantPassenger {
        val accidentParticipant = accidentParticipantService.findByAccidentIdAndParticipantId(accidentId, request.participantId)
        val passengerPerson: Person = request.passenger.let { per ->
            personService.findOrCreate(per.id, per.firstName, per.lastName, per.dateOfBirth, per.genderId, per.placeOfBirth, per.placeOfLiving, per.uniquePersonIdentifier)
        }
        return ParticipantPassenger(accidentParticipant, passengerPerson, InjuredLevel.values()[request.injuredLevel], request.driver)
    }
}
