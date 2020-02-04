package com.dm.cams.api

import com.dm.cams.domain.Participant
import com.dm.cams.domain.ParticipantPassenger
import com.dm.cams.domain.Person
import com.dm.cams.domain.enums.InjuredLevel
import com.dm.cams.domain.requests.ParticipantPassengerRequest
import com.dm.cams.service.ParticipantPassengerService
import com.dm.cams.service.ParticipantService
import com.dm.cams.service.PersonService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/passengers")
class ParticipantPassengerController(val participantPassengerService: ParticipantPassengerService,
                                     val participantService: ParticipantService,
                                     val personService: PersonService) {

    @GetMapping("/{participantId}")
    fun getAllPassengersForParticipant(@PathVariable participantId: Long): List<Person> = participantPassengerService.findAllForParticipant(participantId)

    //TODO add multiple passengers in one request
    @PostMapping("/add/{participantId}")
    fun addPassengerToParticipant(@PathVariable participantId: Long,
                                  @RequestBody request: ParticipantPassengerRequest): ParticipantPassenger? {

        val participant: Participant = participantService.findById(participantId);
        val passengerPerson: Person? = request.personRequest?.let {
            personService.findOrCreate(it.personId, it.firstName, it.lastName, it.dateOfBirth, it.genderId, it.placeOfBirth, it.placeOfLiving)
        }
        return participantPassengerService.addPassenger(participant, passengerPerson, InjuredLevel.values()[request.injuredLevel]);
    }
}