package com.dm.cams.service

import com.dm.cams.domain.Participant
import com.dm.cams.domain.ParticipantPassenger
import com.dm.cams.domain.Person
import com.dm.cams.domain.enums.InjuredLevel
import com.dm.cams.domain.requests.ParticipantPassengerRequest
import com.dm.cams.repository.ParticipantPassengerRepository
import org.springframework.stereotype.Service

@Service
class ParticipantPassengerService(val repository: ParticipantPassengerRepository,
                                  val participantService: ParticipantService,
                                  val accidentParticipantService: AccidentParticipantService,
                                  val personService: PersonService) {

    fun addPassenger(participant: Participant, passenger: Person, injuredLevel: InjuredLevel, driver: Boolean): ParticipantPassenger {
        return repository.save(ParticipantPassenger(participant, passenger, injuredLevel, driver))
    }

    fun findById(id: Long): ParticipantPassenger = repository.getOne(id);

    fun findAllForParticipant(participantId: Long): List<ParticipantPassenger> = repository.findAllByParticipantId(participantId);
    fun findAllForAccident(accidentId: Long): List<ParticipantPassenger> {
        val participantIds = accidentParticipantService.findAllParticipantsForAccident(accidentId)
                .map { it.id }
        return repository.findAllByParticipantIdIn(participantIds)
    }

    fun createOrUpdate(request: List<ParticipantPassengerRequest>): List<ParticipantPassenger> {
        val passengers = request.map {
            it.participantPassengerId?.let { _ ->
                updateParticipantPassenger(it)
            } ?: createParticipantPassenger(it)
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

    fun createParticipantPassenger(request: ParticipantPassengerRequest): ParticipantPassenger {
        val participant: Participant = participantService.findById(request.participantId);
        val passengerPerson: Person = request.passenger.let { per ->
            personService.findOrCreate(per.id, per.firstName, per.lastName, per.dateOfBirth, per.genderId, per.placeOfBirth, per.placeOfLiving, per.uniquePersonIdentifier)
        }
        return ParticipantPassenger(participant, passengerPerson, InjuredLevel.values()[request.injuredLevel], request.driver)
    }
}