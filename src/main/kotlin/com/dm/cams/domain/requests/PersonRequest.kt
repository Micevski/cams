package com.dm.cams.domain.requests

import com.fasterxml.jackson.annotation.JsonCreator
import java.time.LocalDateTime

data class PersonRequest @JsonCreator constructor(val id: Long?,
                                                  val firstName: String,
                                                  val lastName: String,
                                                  val dateOfBirth: LocalDateTime?,
                                                  val genderId: Int,
                                                  val placeOfBirth: String?,
                                                  val placeOfLiving: String?)
