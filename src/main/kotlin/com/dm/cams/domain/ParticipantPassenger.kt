package com.dm.cams.domain

import com.dm.cams.domain.enums.InjuredLevel
import javax.persistence.*

@Entity
@Table(name = "participant_passengers")
class ParticipantPassenger(
        @ManyToOne
        @JoinColumn(name = "participant_id")
        val participant: Participant,
        @ManyToOne
        @JoinColumn(name = "passenger_person_id")
        val passenger: Person,
        @Column(name = "injured_id")
        @Enumerated(EnumType.ORDINAL)
        val injuredLevel: InjuredLevel
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0;
}