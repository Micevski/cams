package com.dm.cams.domain

import javax.persistence.*

@Entity
@Table(name = "accident_participants")
class AccidentParticipant(
        @ManyToOne
        @JoinColumn(name = "accident_id")
        val accident: Accident,
        @ManyToOne
        @JoinColumn(name = "participant_id")
        val participant: Participant
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0;
}