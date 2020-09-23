package com.dm.cams.api

import com.dm.cams.domain.response.PersonResponse
import com.dm.cams.service.PersonService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/person")
class PersonController(val personService: PersonService) {

    @GetMapping("/unique/{uniquePersonIdentifier}")
    fun findPersonByUniqueIdentifier(@PathVariable uniquePersonIdentifier: String ) : ResponseEntity<PersonResponse> {
        return  personService.findByUniqueIdentifier(uniquePersonIdentifier).let {
            if (it.isPresent) { return ResponseEntity.ok(PersonResponse.of(it.get())) }
            else ResponseEntity.status(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS).build()
        }
    }
}