package com.dm.cams.domain.response

import com.dm.cams.domain.Person

data class UserResponse(val id: Long,
                        val username: String,
                        val person: Person,
                        val role: String);
