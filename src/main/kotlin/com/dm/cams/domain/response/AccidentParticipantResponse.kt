package com.dm.cams.domain.response

import com.dm.cams.domain.AccidentParticipant
import com.dm.cams.domain.Person

data class AccidentParticipantResponse(
        val id: Long,
        val accidentParticipantId: Long,
        val type: String,
        val model: String?,
        val make: String?,
        val productionYear: Int?,
        val registerPlate: String?,
        val owner: Person?
) {
    companion object {

        fun of(accidentParticipant: AccidentParticipant): AccidentParticipantResponse {
            return AccidentParticipantResponse(accidentParticipant.participant.id,
                    accidentParticipant.id, accidentParticipant.participant.type,
                    accidentParticipant.participant.model,
                    accidentParticipant.participant.make,
                    accidentParticipant.participant.productionYear,
                    accidentParticipant.participant.registerPlate,
                    accidentParticipant.participant.owner
            );
        }
    }
}