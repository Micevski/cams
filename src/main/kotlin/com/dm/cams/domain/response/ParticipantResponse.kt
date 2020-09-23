package com.dm.cams.domain.response

import com.dm.cams.domain.Participant

data class ParticipantResponse(val id: Long?,
                               val type: String?,
                               val model: String?,
                               val make: String?,
                               val productionYear: Int?,
                               val registerPlate: String?,
                               val owner: PersonResponse?) {

    companion object {
        fun of(participant: Participant): ParticipantResponse {
            val ownerResponse = participant.owner?.let {
                PersonResponse.of(it)
            }
            return ParticipantResponse(participant.id, participant.type,
                    participant.model, participant.make,
                    participant.productionYear, participant.registerPlate, ownerResponse)
        }
    }
}