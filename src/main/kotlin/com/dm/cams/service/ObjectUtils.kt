package com.dm.cams.service

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

val mapper = jacksonObjectMapper()

// Convert a Map to an object
inline fun <reified T> Map<String, Any>.toObject(): T {
    return convert()
}

// Convert an object to a Map
fun <T> T.toMap(): Map<String, Any> {
    return convert()
}
fun <T> T.toList(): List<T> {
    return convert()
}
// Convert an object of type T to type R
inline fun <T, reified R> T.convert(): R {
    val json = mapper.writeValueAsString(this)
    return mapper.readValue(json, R::class.java)
}
