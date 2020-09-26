package com.dm.cams.domain.response

import com.dm.cams.domain.AccidentDocument
import com.fasterxml.jackson.annotation.JsonCreator
import java.util.*

data class AccidentDocumentResponse @JsonCreator constructor(val accidentId: Long,
                                                             val documentId: Long,
                                                             val document: String,
                                                             val type: String?
) {
    companion object {
        fun of(accidentDocument: AccidentDocument): AccidentDocumentResponse {
            val base64 = Base64.getEncoder().encodeToString(accidentDocument.document.documentBytes);
            val base64Document = String.format("data:%s;base64,%s", accidentDocument.document.type, base64)
            return AccidentDocumentResponse(accidentDocument.accident.id, accidentDocument.document.id, base64Document, accidentDocument.document.type)
        }
    }
}