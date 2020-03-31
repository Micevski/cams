package com.dm.cams.api

import com.dm.cams.domain.requests.NewUserRequest
import com.dm.cams.service.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/admin")
class AdminController(val userService: UserService) {

    @PostMapping("/add/user")
    fun addNewUser(@RequestBody request: NewUserRequest){
        userService.createUser(request.personRequest, request.password)
    }
}
