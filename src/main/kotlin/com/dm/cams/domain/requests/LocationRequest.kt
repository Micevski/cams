package com.dm.cams.domain.requests

import com.fasterxml.jackson.annotation.JsonCreator
import java.math.BigDecimal

data class LocationRequest @JsonCreator constructor(val lat: BigDecimal,
                                                    val lng: BigDecimal,
                                                    val streetName: String?,
                                                    val area: String?,
                                                    val city: String?,
                                                    val country: String?,
                                                    val zipCode: String?)