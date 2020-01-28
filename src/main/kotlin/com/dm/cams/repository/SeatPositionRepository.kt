package com.dm.cams.repository

import com.dm.cams.domain.SeatPosition
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SeatPositionRepository : JpaRepository<SeatPosition, Long> {
}