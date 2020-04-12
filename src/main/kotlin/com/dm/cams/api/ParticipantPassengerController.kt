package com.dm.cams.api

import com.dm.cams.domain.ParticipantPassenger
import com.dm.cams.domain.enums.Gender
import com.dm.cams.domain.enums.InjuredLevel
import com.dm.cams.domain.requests.ParticipantPassengerRequest
import com.dm.cams.domain.response.OptionResponse
import com.dm.cams.domain.response.ParticipantPassengerResponse
import com.dm.cams.service.ParticipantPassengerService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/passengers")
class ParticipantPassengerController(val participantPassengerService: ParticipantPassengerService) {

    @GetMapping("/{participantId}")
    fun getAllPassengersForParticipant(@PathVariable participantId: Long): List<ParticipantPassengerResponse> =
            participantPassengerService.findAllForParticipant(participantId)
                    .map { ParticipantPassengerResponse.of(it) };

    @GetMapping("accident/{accidentId}")
    fun getAllPassengersForAccidentId(@PathVariable accidentId: Long): List<ParticipantPassengerResponse> =
            participantPassengerService.findAllForAccident(accidentId)
                    .map { ParticipantPassengerResponse.of(it) };


    @GetMapping("injured-levels")
    fun getAllInjuredLevels(): List<OptionResponse> {
        return InjuredLevel.values().map { OptionResponse(it.ordinal.toLong(), it.level) }
    }

    @GetMapping("genders")
    fun getAllGenders(): List<OptionResponse> {
        return Gender.values().map { OptionResponse(it.ordinal.toLong(), it.label) }
    }

    @PostMapping("/add")
    fun addPassengerToParticipant(@RequestBody request: List<ParticipantPassengerRequest>): List<ParticipantPassenger> {
        return participantPassengerService.createOrUpdate(request)
    }
}