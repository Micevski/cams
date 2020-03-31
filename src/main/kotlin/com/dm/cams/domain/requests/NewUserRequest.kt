package com.dm.cams.domain.requests

import com.fasterxml.jackson.annotation.JsonCreator

data class NewUserRequest @JsonCreator constructor(
        val personRequest: PersonRequest,
        val password: String
);
