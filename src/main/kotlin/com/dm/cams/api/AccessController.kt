package com.dm.cams.api

import com.dm.cams.domain.User
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/access")
class AccessController {

    @GetMapping("/authentication")
    fun getAuthentication(authentication: Authentication) : User {
        return authentication.principal as User
    }



}
