package com.dm.cams.config

import com.dm.cams.service.UserService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.authentication.AuthenticationFailureHandler
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@EnableWebSecurity
@Configuration
class SecurityConfiguration {

    @Configuration
    class UserSecurity(
            val successHandler: AuthenticationSuccessHandler,
            val failureHandler: AuthenticationFailureHandler,
            val logoutSuccessHandler: LogoutSuccessHandler,
            val authenticationEntryPoint: AuthenticationEntryPoint,
            val userService: UserService,
            val passwordEncoder: PasswordEncoder) : WebSecurityConfigurerAdapter() {

        override fun configure(auth: AuthenticationManagerBuilder) {
            auth.userDetailsService(userService).passwordEncoder(passwordEncoder)

        }

        @Throws(Exception::class)
        override fun configure(http: HttpSecurity) {
            http.csrf().disable()
                    .httpBasic().disable()
                    .exceptionHandling()
                    .authenticationEntryPoint(authenticationEntryPoint)

            http.formLogin()
                    .loginProcessingUrl("/api/login")
                    .successHandler(successHandler)
                    .failureHandler(failureHandler)
                    .usernameParameter("username")
                    .passwordParameter("password")
                    .permitAll()
                    .and()
                    .logout()
                    .logoutUrl("/api/logout")
                    .logoutSuccessHandler(logoutSuccessHandler)
                    .deleteCookies("JSESSIONID")
                    .permitAll()
                    .and()
                    .headers()
                    .frameOptions()
                    .disable()

            http.authorizeRequests()
                    .antMatchers("/api/admin/**").hasAuthority("ADMIN")
                    .anyRequest().authenticated()

        }

    }

    @Bean
    fun getSuccessHandler(): AuthenticationSuccessHandler? {
        return AuthenticationSuccessHandler { _: HttpServletRequest?, response: HttpServletResponse, _: Authentication? -> response.status = HttpStatus.OK.value() }
    }

    @Bean
    fun failureHandler(): AuthenticationFailureHandler? {
        return AuthenticationFailureHandler { _: HttpServletRequest?, response: HttpServletResponse, _: AuthenticationException? -> response.status = HttpStatus.UNAUTHORIZED.value() }
    }

    @Bean
    fun logoutSuccessHandler(): LogoutSuccessHandler? {
        return LogoutSuccessHandler { _: HttpServletRequest?, response: HttpServletResponse, _: Authentication? -> response.status = HttpStatus.OK.value() }
    }

    @Bean
    fun authenticationEntryPoint(): AuthenticationEntryPoint? {
        return AuthenticationEntryPoint { _, response, _ ->
            /**
             * Always returns a 401 error code to the client.
             */
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access Denied")
        }
    }

    @Bean
    fun passwordEncoder(): BCryptPasswordEncoder? {
        return BCryptPasswordEncoder()
    }


}
