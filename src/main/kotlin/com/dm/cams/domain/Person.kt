package com.dm.cams.domain

import com.dm.cams.domain.enums.Gender
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "persons")
class Person(
        @Column(name = "first_name")
        var firstName: String,
        @Column(name = "last_name")
        var lastName: String,
        @Column(name = "date_of_birth")
        var dateOfBirth: LocalDateTime?,
        @Column(name = "gender_id")
        @Enumerated(EnumType.ORDINAL)
        var gender: Gender,
        @Column(name = "place_of_birth")
        var placeOfBirth: String?,
        @Column(name = "place_of_living")
        var placeOfLiving: String?
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0;
}
