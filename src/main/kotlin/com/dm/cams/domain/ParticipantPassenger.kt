package com.dm.cams.domain

import com.dm.cams.domain.enums.InjuredLevel
import javax.persistence.*

@Entity
@Table(name = "participant_passengers")
class ParticipantPassenger(
        @ManyToOne
        @JoinColumn(name = "participant_id")
        var participant: Participant,
        @ManyToOne
        @JoinColumn(name = "passenger_person_id")
        var passenger: Person,
        @Column(name = "injured_id")
        @Enumerated(EnumType.ORDINAL)
        var injuredLevel: InjuredLevel,
        @Column(name = "is_driver")
        var driver:Boolean
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0;
}