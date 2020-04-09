package com.dm.cams.repository

import com.dm.cams.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    fun findByUsername(username: String) : User
}
