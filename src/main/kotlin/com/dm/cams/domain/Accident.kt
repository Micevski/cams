package com.dm.cams.domain

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "accidents")
class Accident(
        @ManyToOne
        @JoinColumn(name = "location_id")
        var location: Location,

        @Column(name = "date_accident")
        var dateAccident: LocalDateTime?,
        var reason: String?,
        var description: String?
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0;
}