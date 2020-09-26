package com.dm.cams.repository

import com.dm.cams.domain.CamsDocument
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CamsDocumentRepository : JpaRepository<CamsDocument, Long> {
}