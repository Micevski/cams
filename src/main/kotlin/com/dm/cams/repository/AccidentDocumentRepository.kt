package com.dm.cams.repository

import com.dm.cams.domain.AccidentDocument
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AccidentDocumentRepository : JpaRepository<AccidentDocument, Long>