package com.dm.cams.api

import com.dm.cams.domain.Accident
import com.dm.cams.domain.Participant
import com.dm.cams.domain.requests.ParticipantRequest
import com.dm.cams.domain.requests.ParticipantTableRequest
import com.dm.cams.domain.requests.TableFilterRequest
import com.dm.cams.domain.response.AccidentParticipantResponse
import com.dm.cams.domain.response.ParticipantResponse
import com.dm.cams.service.AccidentParticipantService
import com.dm.cams.service.ParticipantService
import org.springframework.data.domain.Page
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/accident-participant")
class ParticipantController(val accidentParticipantService: AccidentParticipantService,
                            val participantService: ParticipantService) {

    @GetMapping("/filter")
    fun getAll(accidentFilterRequest: ParticipantTableRequest): Page<Participant> {
        return participantService.finAll(accidentFilterRequest.page, accidentFilterRequest.pageSize,
                accidentFilterRequest.sortProperty, accidentFilterRequest.sortDirection)
    }

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

    @GetMapping("/participant/plate/{plate}")
    fun findParticipantByPlate(@PathVariable plate: String): ResponseEntity<ParticipantResponse> {
        participantService.findByPlate(plate).let {
            return if (it.isPresent) {
                ResponseEntity.ok(ParticipantResponse.of(it.get()))
            } else ResponseEntity.status(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS).build()
        }

    }


}
