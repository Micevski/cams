package com.dm.cams.domain.response

import com.dm.cams.domain.AccidentParticipant

data class AccidentParticipantResponse(
        val id: Long,
        val accidentParticipantId: Long,
        val type: String,
        val model: String?,
        val make: String?,
        val productionYear: Int?,
        val registerPlate: String?,
        val owner: PersonResponse?,
        val guilty: Boolean
) {
    companion object {

        fun of(accidentParticipant: AccidentParticipant): AccidentParticipantResponse {
            val person: PersonResponse? = accidentParticipant.participant.owner?.let {
                PersonResponse.of(it)
            }
            return AccidentParticipantResponse(accidentParticipant.participant.id,
                    accidentParticipant.id, accidentParticipant.participant.type,
                    accidentParticipant.participant.model,
                    accidentParticipant.participant.make,
                    accidentParticipant.participant.productionYear,
                    accidentParticipant.participant.registerPlate,
                    person, accidentParticipant.guilty
            )
        }
    }
}