package com.dm.cams.domain.requests

import com.fasterxml.jackson.annotation.JsonCreator

data class ParticipantPassengerRequest @JsonCreator constructor(val personRequest: PersonRequest?,
                                                                val injuredLevel: Int)

