package com.dm.cams.service

import com.dm.cams.domain.Person
import com.dm.cams.domain.enums.Gender
import com.dm.cams.repository.PersonRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class PersonService(val personRepository: PersonRepository) {

    fun findById(id: Long): Person = personRepository.getOne(id)

    fun save(firstName: String, lastName: String, dateOfBirth: LocalDateTime?, genderId: Int,
             placeOfBirth: String?, placeOfLiving: String?): Person {
        return personRepository.save(
                Person(firstName, lastName, dateOfBirth, Gender.values()[genderId], placeOfBirth, placeOfLiving))
    }

    fun findOrCreate(personId: Long?, firstName: String, lastName: String, dateOfBirth: LocalDateTime?, genderId: Int,
                     placeOfBirth: String?, placeOfLiving: String?): Person {
        return if (personId != null) findById(personId)
        else save(firstName, lastName, dateOfBirth, genderId, placeOfBirth, placeOfLiving)
    }
}