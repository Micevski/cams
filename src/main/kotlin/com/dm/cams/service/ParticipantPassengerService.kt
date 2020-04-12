package com.dm.cams.service

import com.dm.cams.domain.Participant
import com.dm.cams.domain.ParticipantPassenger
import com.dm.cams.domain.Person
import com.dm.cams.domain.enums.InjuredLevel
import com.dm.cams.domain.requests.ParticipantPassengerRequest
import com.dm.cams.repository.ParticipantPassengerRepository
import org.springframework.stereotype.Service
import java.util.stream.Collectors

@Service
class ParticipantPassengerService(val repository: ParticipantPassengerRepository,
                                  val participantService: ParticipantService,
                                  val accidentParticipantService: AccidentParticipantService,
                                  val personService: PersonService) {

    fun addPassenger(participant: Participant, passenger: Person, injuredLevel: InjuredLevel): ParticipantPassenger {
        return repository.save(ParticipantPassenger(participant, passenger, injuredLevel))
    }

    fun findAllForParticipant(participantId: Long): List<Person> = repository.findAllByParticipantId(participantId)
            .stream()
            .map(ParticipantPassenger::passenger)
            .collect(Collectors.toList())

    fun addPassengers(request: List<ParticipantPassengerRequest>): List<ParticipantPassenger> {
        val passengers = request.map {
            val participant: Participant = participantService.findById(it.participantId);
            val passengerPerson: Person = it.passenger.let { per ->
                personService.findOrCreate(per.id, per.firstName, per.lastName, per.dateOfBirth, per.genderId, per.placeOfBirth, per.placeOfLiving)
            }
            ParticipantPassenger(participant, passengerPerson, InjuredLevel.values()[it.injuredLevel])
        }
        return repository.saveAll(passengers)
    }

    fun findAllForAccident(accidentId: Long): List<ParticipantPassenger> {
        val participantIds = accidentParticipantService.findAllParticipantsForAccident(accidentId)
                .map { it.id }
        return repository.findAllByParticipantIdIn(participantIds)
    }

}