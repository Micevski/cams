package com.dm.cams.service

import com.dm.cams.domain.User
import com.dm.cams.domain.requests.PersonRequest
import com.dm.cams.domain.response.UserResponse
import com.dm.cams.repository.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Sort
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(val userRepository: UserRepository,
                  val personService: PersonService,
                  val passwordEncoder: PasswordEncoder,
                  val pageableUtils: PageableUtils) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        return userRepository.findByUsername(username)
    }

    fun createUser(personRequest: PersonRequest, password: String) {
        val person = personService.findOrCreate(
                personRequest.personId,
                personRequest.firstName,
                personRequest.lastName,
                personRequest.dateOfBirth,
                personRequest.genderId,
                personRequest.placeOfBirth,
                personRequest.placeOfLiving
        )
        val username = String.format("%s.%s", person.firstName, person.lastName);
        val passwordEncoded = passwordEncoder.encode(password);
        userRepository.save(User(username.toLowerCase(), passwordEncoded, person, "USER"));
    }

    fun finAll(page: Int, pageSize: Int, sortProperty: String?, sortDirection: Sort.Direction?): Page<UserResponse> =
            userRepository.findAll(pageableUtils.getPageable(page, pageSize, sortProperty, sortDirection)).map {
                UserResponse(it.id,it.username, it.getPerson(), it.authorities.first().authority)
            }

}
