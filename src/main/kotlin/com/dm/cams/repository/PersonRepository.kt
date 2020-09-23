package com.dm.cams.repository

import com.dm.cams.domain.Person
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface PersonRepository : JpaRepository<Person, Long> {
    fun findByUniquePersonIdentifier(uniquePersonIdentifier: String): Optional<Person>
}