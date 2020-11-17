package com.dm.cams.service

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

val mapper = jacksonObjectMapper()

fun <T> T.toList(): List<T> {
    return convert()
}
// Convert an object of type T to type R
inline fun <T, reified R> T.convert(): R {
    val json = mapper.writeValueAsString(this)
    return mapper.readValue(json, R::class.java)
}
