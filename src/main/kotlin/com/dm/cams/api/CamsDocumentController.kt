package com.dm.cams.api

import com.dm.cams.domain.AccidentDocument
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



}