package com.dm.cams.service

import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service


@Service
class PageableUtils {

    fun getPageable(page: Int, pageSize: Int, sortProperty: String?, sortDirection: Sort.Direction?): Pageable {
        return if (sortProperty != null) {
            val direction = sortDirection ?: Sort.DEFAULT_DIRECTION
            val sort: Sort = Sort.by(direction, sortProperty)
            PageRequest.of(page - 1, pageSize, sort)
        } else {
            PageRequest.of(page - 1, pageSize)
        }
    }
}