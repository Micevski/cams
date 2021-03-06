package com.dm.cams.service

import com.dm.cams.domain.Accident
import com.dm.cams.domain.AccidentDocument
import com.dm.cams.domain.CamsDocument
import com.dm.cams.repository.AccidentDocumentRepository
import com.dm.cams.repository.CamsDocumentRepository
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import javax.transaction.Transactional

@Service
class CamsDocumentService(val repository: CamsDocumentRepository,
                          val accidentDocumentRepository: AccidentDocumentRepository,
                          val accidentService: AccidentService) {
    fun uploadFilesForAccident(file: MultipartFile, accidentId: Long): AccidentDocument {
        val accident: Accident = accidentService.findById(accidentId)
        val camsDocument = repository.save(CamsDocument(file.bytes, file.name, file.contentType, file.size))
        return accidentDocumentRepository.save(AccidentDocument(accident, camsDocument))
    }

    fun findAllDocumentsForAccident(accidentId: Long): List<AccidentDocument> = accidentDocumentRepository.findAllByAccident_Id(accidentId)

    @Transactional
    fun deleteAccidentDocument(accidentId: Long, documentId: Long) {
        accidentDocumentRepository.findByAccident_IdAndDocument_Id(accidentId, documentId).let {
            accidentDocumentRepository.delete(it)
            repository.delete(it.document)
        }
    }



}