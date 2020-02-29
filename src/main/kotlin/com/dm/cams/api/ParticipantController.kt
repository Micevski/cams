package com.dm.cams.api

import com.dm.cams.domain.Participant
import com.dm.cams.domain.requests.ParticipantRequest
import com.dm.cams.service.AccidentParticipantService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/accident-participant")
class ParticipantController(val accidentParticipantService: AccidentParticipantService) {

    @GetMapping("/{accidentId}")
    fun getAllParticipantsForAccident(@PathVariable accidentId: Long): List<Participant> =
            accidentParticipantService.findAllParticipantsForAccident(accidentId)

    @PostMapping("/add/{accidentId}")
    fun addParticipantToAccident(@PathVariable accidentId: Long,
                                 @RequestBody participantsRequest: List<ParticipantRequest>): List<Participant> {
        return accidentParticipantService.addParticipantsToAccident(participantsRequest, accidentId)
                .map { it.participant }

    }


}