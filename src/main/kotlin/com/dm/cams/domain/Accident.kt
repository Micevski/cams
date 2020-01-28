package com.dm.cams.domain

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "accidents")
class Accident(
        @ManyToOne
        @JoinColumn(name = "location_id")
        val location: Location,

        @Column(name = "date_accident")
        val dateAccident: LocalDateTime?,
        val reason: String?,
        val description: String?
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0;
}