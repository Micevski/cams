package com.dm.cams.api

import com.dm.cams.domain.Accident
import com.dm.cams.domain.AccidentParticipant
import com.dm.cams.domain.Participant
import com.dm.cams.domain.Person
import com.dm.cams.domain.requests.ParticipantRequest
import com.dm.cams.service.AccidentParticipantService
import com.dm.cams.service.AccidentService
import com.dm.cams.service.ParticipantService
import com.dm.cams.service.PersonService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/accident-participant")
class ParticipantController(val participantService: ParticipantService,
                            val accidentParticipantService: AccidentParticipantService,
                            val accidentService: AccidentService,
                            val personService: PersonService) {

    @PostMapping("/add/{accidentId}")
    fun addParticipantToAccident(@PathVariable accidentId: Long,
                                 @RequestBody request: ParticipantRequest): AccidentParticipant {
        val accident: Accident = accidentService.findById(accidentId)
        val owner: Person? = request.ownerPerson?.let {
            personService.findOrCreate(it.personId, it.firstName, it.lastName, it.dateOfBirth, it.genderId, it.placeOfBirth, it.placeOfLiving)
        }
        val participant: Participant = participantService.createParticipant(
                request.type, request.model, request.make, request.productionYear, request.registerPlate, owner)
        return accidentParticipantService.addParticipantToAccident(accident, participant)
    }


}