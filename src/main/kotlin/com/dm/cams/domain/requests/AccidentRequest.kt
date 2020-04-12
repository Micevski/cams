package com.dm.cams.domain.requests

import com.fasterxml.jackson.annotation.JsonCreator
import java.time.LocalDateTime

data class AccidentRequest @JsonCreator constructor(val id: Long?,
                                                    val location: LocationRequest,
                                                    val dateAccident: LocalDateTime,
                                                    val reason: String?,
                                                    val description: String?)