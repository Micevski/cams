package com.dm.cams.domain

import javax.persistence.*

@Entity
@Table(name = "accident_documents")
class AccidentDocument(@ManyToOne
                       @JoinColumn(name = "accident_id")
                       var accident: Accident,
                       @ManyToOne
                       @JoinColumn(name = "document_id")
                       var document: CamsDocument
                       ) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0;
}