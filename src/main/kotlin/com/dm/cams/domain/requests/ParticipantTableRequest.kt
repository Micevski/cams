package com.dm.cams.domain.requests

import org.springframework.data.domain.Sort

class ParticipantTableRequest(
        val model: String?,
        val make: String?,
        val registerPlate: String?,
        val firstName: String?,
        val lastName: String?,
        val uniqueIdentifier: String?,
        page: Int = 1,
        pageSize: Int = 10,
        sortProperty: String?,
        sortDirection: Sort.Direction?
) : TableFilterRequest(page, pageSize, sortProperty, sortDirection)
