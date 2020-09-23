package com.dm.cams.domain.response

import com.dm.cams.domain.Person
import java.time.LocalDateTime

data class PersonResponse(
        val id: Long,
        val firstName: String,
        val lastName: String,
        val dateOfBirth: LocalDateTime?,
        val genderId: Int,
        val uniquePersonIdentifier: String?
) {
    companion object {
        fun of(person: Person): PersonResponse {
            return PersonResponse(person.id, person.firstName, person.lastName,
                    person.dateOfBirth, person.gender.ordinal, person.uniquePersonIdentifier)
        }
    }
}