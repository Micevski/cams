package com.dm.cams.domain.requests

import com.fasterxml.jackson.annotation.JsonCreator

data class ParticipantRequest @JsonCreator constructor(val id: Long?,
                                                       val accidentParticipantId: Long?,
                                                       val type: String,
                                                       val model: String?,
                                                       val make: String?,
                                                       val productionYear: Int?,
                                                       val registerPlate: String?,
                                                       val owner: PersonRequest?)
