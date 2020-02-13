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
class ParticipantController(val accidentParticipantService: AccidentParticipantService) {

    @GetMapping("/{accidentId}")
    fun getAllParticipantsForAccident(@PathVariable accidentId: Long): List<Participant> =
            accidentParticipantService.findAllParticipantsForAccident(accidentId)

    @PostMapping("/add/{accidentId}")
    fun addParticipantToAccident(@PathVariable accidentId: Long,
                                 @RequestBody participantsRequest: List<ParticipantRequest>): List<AccidentParticipant> {
        return accidentParticipantService.addParticipantsToAccident(participantsRequest, accidentId);

    }


}