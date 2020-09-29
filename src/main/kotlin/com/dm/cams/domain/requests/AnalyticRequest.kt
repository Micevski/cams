package com.dm.cams.domain.requests

import com.fasterxml.jackson.annotation.JsonCreator
import java.time.ZonedDateTime

data class AnalyticRequest @JsonCreator constructor(val from: ZonedDateTime?,
                                                    val to: ZonedDateTime?)
