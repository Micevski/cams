package com.dm.cams.api

import com.dm.cams.domain.AccidentDocument
import com.dm.cams.domain.response.AccidentDocumentResponse
import com.dm.cams.service.CamsDocumentService
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("api/documents")
class CamsDocumentController(val service: CamsDocumentService) {


    @PostMapping("/upload/{accidentId}")
    fun uploadDocuments(@RequestParam file: MultipartFile,
                        @PathVariable accidentId: Long): AccidentDocument {
        return service.uploadFilesForAccident(file, accidentId)
    }

    @GetMapping("/{accidentId}")
    fun getAllDocumentsForAccident(@PathVariable accidentId: Long): List<AccidentDocumentResponse> {
        return service.findAllDocumentsForAccident(accidentId).map {
            AccidentDocumentResponse.of(it)
        }
    }

    @DeleteMapping("accident/{accidentId}/document/{documentId}")
    fun deleteAccidentDocument(@PathVariable accidentId: Long,
                               @PathVariable documentId: Long): List<AccidentDocumentResponse> {
        this.service.deleteAccidentDocument(accidentId, documentId)
        return getAllDocumentsForAccident(accidentId)

    }


}