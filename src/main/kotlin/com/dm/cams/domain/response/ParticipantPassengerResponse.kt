package com.dm.cams.domain.response

import com.dm.cams.domain.Participant
import com.dm.cams.domain.ParticipantPassenger
import com.dm.cams.domain.Person

data class ParticipantPassengerResponse(val participant: Participant,
                                        val passenger: Person,
                                        val injuredLevel: Int,
                                        val id: Long) {
    companion object {
        fun of(participantPassenger: ParticipantPassenger): ParticipantPassengerResponse {
            return ParticipantPassengerResponse(participantPassenger.participant,
                    participantPassenger.passenger,
                    participantPassenger.injuredLevel.ordinal,
                    participantPassenger.id)
        }
    }

}