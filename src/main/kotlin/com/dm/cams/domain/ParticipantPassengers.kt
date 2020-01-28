package com.dm.cams.domain

import com.dm.cams.domain.enums.InjuredLevel
import javax.persistence.*

@Entity
@Table(name = "participant_passengers")
class ParticipantPassengers(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,

        @ManyToOne
        @JoinColumn(name = "participant_id")
        val participant: Participant,
        @ManyToOne
        @JoinColumn(name = "person_id")
        val person: Person,
        @ManyToOne
        @JoinColumn(name = "seat_position_id")
        val seatPosition: SeatPosition,
        @Column(name = "is_driver")
        val isDriver: Boolean,
        @Column(name = "injured_id")
        @Enumerated(EnumType.ORDINAL)
        val injuredLevel: InjuredLevel


)