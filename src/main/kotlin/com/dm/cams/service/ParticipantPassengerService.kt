package com.dm.cams.service

import com.dm.cams.domain.Participant
import com.dm.cams.domain.ParticipantPassenger
import com.dm.cams.domain.Person
import com.dm.cams.domain.enums.InjuredLevel
import com.dm.cams.repository.ParticipantPassengerRepository
import javassist.NotFoundException
import org.springframework.stereotype.Service
import java.util.stream.Collectors

@Service
class ParticipantPassengerService(val repository: ParticipantPassengerRepository) {

    fun addPassenger(participant: Participant, passenger: Person?, injuredLevel: InjuredLevel): ParticipantPassenger {
        return if (passenger != null)
            repository.save(ParticipantPassenger(participant, passenger, injuredLevel))
        else throw NotFoundException("Person not found")
    }

    fun findAllForParticipant(participantId: Long): List<Person> = repository.findAllByParticipant_Id(participantId)
            .stream()
            .map(ParticipantPassenger::passenger)
            .collect(Collectors.toList())
}