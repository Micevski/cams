package com.dm.cams.domain.requests

import com.fasterxml.jackson.annotation.JsonCreator
import java.time.LocalDateTime
import java.time.ZonedDateTime

data class AccidentRequest @JsonCreator constructor(val id: Long?,
                                                    val location: LocationRequest,
                                                    val dateAccident: ZonedDateTime,
                                                    val reason: String?,
                                                    val description: String?)
