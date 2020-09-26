package com.dm.cams.domain

import org.hibernate.annotations.Type
import java.time.ZonedDateTime
import javax.persistence.*

@Entity
@Table(name = "cams_documents")
class CamsDocument(@Lob
                   @Type(type = "org.hibernate.type.BinaryType")
                   @Column(name = "document_bytes")
                   var documentBytes: ByteArray,
                   @Column(name = "name")
                   var name: String,
                   @Column(name = "type")
                   var type: String?,
                   @Column(name = "size")
                   var size: Long?
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
}