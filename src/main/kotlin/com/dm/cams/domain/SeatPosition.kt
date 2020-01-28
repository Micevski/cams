package com.dm.cams.domain

import javax.persistence.*

@Entity
@Table(name = "seat_positions")
class SeatPosition(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        val name: String,
        @Column(name="seat_num")
        val seatNumber: Int?
);