package com.dm.cams.domain

import com.dm.cams.domain.enums.Gender
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "persons")
class Person(
        @Column(name = "first_name")
        val firstName: String,
        @Column(name = "last_name")
        val lastName: String,
        @Column(name = "date_of_birth")
        val dateOfBirth: LocalDateTime?,
        @Column(name = "gender_id")
        @Enumerated(EnumType.ORDINAL)
        val gender: Gender,
        @Column(name = "place_of_birth")
        val placeOfBirth: String?,
        @Column(name = "place_of_living")
        val placeOfLiving: String?
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0;

}