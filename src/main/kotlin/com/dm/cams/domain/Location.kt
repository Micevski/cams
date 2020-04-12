package com.dm.cams.domain

import java.math.BigDecimal
import javax.persistence.*

@Entity
@Table(name = "locations")
class Location(
        var lat: BigDecimal,
        var lng: BigDecimal,
        @Column(name = "street_name")
        var streetName: String?,
        @Column(name = "street_number")
        var streetNumber: String?,
        var city: String?,
        var country: String?,
        var area: String,
        var postcode: String?
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
}
