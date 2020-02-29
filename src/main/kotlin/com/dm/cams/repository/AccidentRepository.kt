package com.dm.cams.repository

import com.dm.cams.domain.Accident
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository

@Repository
interface AccidentRepository : JpaRepository<Accident, Long>, JpaSpecificationExecutor<Accident> {
}