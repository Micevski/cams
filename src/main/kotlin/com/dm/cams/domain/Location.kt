package com.dm.cams.domain

import java.math.BigDecimal
import javax.persistence.*

@Entity
@Table(name = "locations")
class Location(
        val lat: BigDecimal,
        val lng: BigDecimal,
        @Column(name = "street_name")
        val streetName: String?,
        val area: String?,
        val city: String?,
        val country: String?,
        @Column(name = "zip_code")
        val zipCode: String?
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
}