package com.dm.cams.api

import com.dm.cams.domain.requests.ParticipantRequest
import com.dm.cams.domain.response.AccidentParticipantResponse
import com.dm.cams.service.AccidentParticipantService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/accident-participant")
class ParticipantController(val accidentParticipantService: AccidentParticipantService) {

    @GetMapping("/{accidentId}")
    fun getAllParticipantsForAccident(@PathVariable accidentId: Long): List<AccidentParticipantResponse> =
            accidentParticipantService.findAllParticipantsForAccident(accidentId)
                    .map {
                        AccidentParticipantResponse.of(it)
                    }

    @PostMapping("/add/{accidentId}")
    fun addParticipantToAccident(@PathVariable accidentId: Long,
                                 @RequestBody participantsRequest: List<ParticipantRequest>): List<AccidentParticipantResponse> {
        return accidentParticipantService.addParticipantsToAccident(participantsRequest, accidentId)
                .map {
                    AccidentParticipantResponse.of(it)
                }
    }


}