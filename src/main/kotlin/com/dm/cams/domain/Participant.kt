package com.dm.cams.domain

import javax.persistence.*

@Entity
@Table(name = "participants")
class Participant(
        val type: String,
        val model: String?,
        val make: String?,
        @Column(name = "production_year")
        val productionYear: Int?,
        @Column(name = "register_plate")
        val registerPlate: String?,
        @ManyToOne
        @JoinColumn(name = "owner_id", referencedColumnName = "id")
        val owner: Person?
) {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
}