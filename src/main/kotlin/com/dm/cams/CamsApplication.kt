package com.dm.cams

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
class CamsApplication

fun main(args: Array<String>) {
    runApplication<CamsApplication>(*args)
}
