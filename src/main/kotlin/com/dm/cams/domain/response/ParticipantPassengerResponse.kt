package com.dm.cams.domain.response

import com.dm.cams.domain.Participant
import com.dm.cams.domain.ParticipantPassenger
import com.dm.cams.domain.Person

data class ParticipantPassengerResponse(val participant: Participant,
                                        val passenger: PersonResponse,
                                        val injuredLevel: Int,
                                        val driver: Boolean,
                                        val id: Long) {
    companion object {
        fun of(participantPassenger: ParticipantPassenger): ParticipantPassengerResponse {
            return ParticipantPassengerResponse(participantPassenger.participant.participant,
                    PersonResponse.of(participantPassenger.passenger),
                    participantPassenger.injuredLevel.ordinal,
                    participantPassenger.driver,
                    participantPassenger.id)
        }
    }

}
