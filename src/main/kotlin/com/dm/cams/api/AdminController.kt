package com.dm.cams.api

import com.dm.cams.domain.User
import com.dm.cams.domain.requests.NewUserRequest
import com.dm.cams.domain.requests.TableFilterRequest
import com.dm.cams.domain.response.UserResponse
import com.dm.cams.service.UserService
import org.springframework.data.domain.Page
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin")
class AdminController(val userService: UserService) {

    @GetMapping("/users/filter")
    fun getAll(accidentFilterRequest: TableFilterRequest): Page<UserResponse> {
        return userService.finAll(accidentFilterRequest.page, accidentFilterRequest.pageSize,
                accidentFilterRequest.sortProperty, accidentFilterRequest.sortDirection)
    }

    @PostMapping("/add/user")
    fun addNewUser(@RequestBody request: NewUserRequest){
        userService.createUser(request.personRequest, request.password)
    }
}
