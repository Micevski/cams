package com.dm.cams.service

import com.dm.cams.domain.Person
import com.dm.cams.domain.enums.Gender
import com.dm.cams.domain.requests.PersonRequest
import com.dm.cams.repository.PersonRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.*

@Service
class PersonService(val personRepository: PersonRepository) {

    fun findById(id: Long): Person = personRepository.getOne(id)
    fun findByUniqueIdentifier(uniquePersonIdentifier: String): Optional<Person> =
            personRepository.findByUniquePersonIdentifier(uniquePersonIdentifier)

    fun save(firstName: String, lastName: String, dateOfBirth: LocalDateTime?, genderId: Int,
             placeOfBirth: String?, placeOfLiving: String?, uniquePersonIdentifier: String?): Person {
        return personRepository.save(
                Person(firstName, lastName, dateOfBirth, Gender.values()[genderId], placeOfBirth, placeOfLiving, uniquePersonIdentifier))
    }

    fun findOrCreate(personId: Long?, firstName: String, lastName: String, dateOfBirth: LocalDateTime?, genderId: Int,
                     placeOfBirth: String?, placeOfLiving: String?, uniquePersonIdentifier: String?): Person {
        return if (personId != null) updateExistingPerson(personId, firstName, lastName, dateOfBirth,
                genderId, placeOfBirth, placeOfLiving, uniquePersonIdentifier)
        else save(firstName, lastName, dateOfBirth, genderId, placeOfBirth, placeOfLiving,uniquePersonIdentifier)
    }

    fun updateExistingPerson(id: Long, firstName: String, lastName: String, dateOfBirth: LocalDateTime?,
                             genderId: Int, placeOfBirth: String?, placeOfLiving: String?, uniquePersonIdentifier: String?): Person {
        val person: Person = findById(id)
        person.firstName = firstName
        person.lastName = lastName
        person.dateOfBirth = dateOfBirth
        person.gender = Gender.values()[genderId]
        person.placeOfBirth = placeOfBirth
        person.placeOfLiving = placeOfLiving
        person.uniquePersonIdentifier = uniquePersonIdentifier
        return personRepository.save(person)
    }

    fun updateExistingPerson(personRequest: PersonRequest): Person =
            updateExistingPerson(personRequest.id!!, personRequest.firstName, personRequest.lastName,
                    personRequest.dateOfBirth, personRequest.genderId, personRequest.placeOfBirth,
                    personRequest.placeOfLiving, personRequest.uniquePersonIdentifier)
}