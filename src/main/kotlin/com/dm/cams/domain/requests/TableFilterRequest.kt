package com.dm.cams.domain.requests

import com.fasterxml.jackson.annotation.JsonCreator
import org.springframework.data.domain.Sort

open class TableFilterRequest @JsonCreator constructor(var page: Int,
                                                       var pageSize: Int,
                                                       var sortProperty: String?,
                                                       var sortDirection: Sort.Direction?)
