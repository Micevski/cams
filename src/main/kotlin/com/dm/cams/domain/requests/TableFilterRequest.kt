package com.dm.cams.domain.requests

import com.fasterxml.jackson.annotation.JsonCreator
import org.springframework.data.domain.Sort

data class TableFilterRequest @JsonCreator constructor(val page: Int,
                                                       val pageSize: Int,
                                                       val sortProperty: String?,
                                                       val sortDirection: Sort.Direction?)