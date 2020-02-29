package com.dm.cams.domain.requests

import com.fasterxml.jackson.annotation.JsonCreator

data class ParticipantPassengerRequest @JsonCreator constructor(val participantId: Long,
                                                                val passenger: PersonRequest,
                                                                val injuredLevel: Int)

