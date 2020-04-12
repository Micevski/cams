package com.dm.cams.domain

import javax.persistence.*

@Entity
@Table(name = "participants")
class Participant(
        var type: String,
        var model: String?,
        var make: String?,
        @Column(name = "production_year")
        var productionYear: Int?,
        @Column(name = "register_plate")
        var registerPlate: String?,
        @ManyToOne
        @JoinColumn(name = "owner_id", referencedColumnName = "id")
        var owner: Person?
) {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
}