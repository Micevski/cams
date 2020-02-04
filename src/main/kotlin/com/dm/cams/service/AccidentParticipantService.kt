package com.dm.cams.service

import com.dm.cams.domain.Accident
import com.dm.cams.domain.AccidentParticipant
import com.dm.cams.domain.Participant
import com.dm.cams.repository.AccidentParticipantRepository
import org.springframework.stereotype.Service
import java.util.stream.Collectors

@Service
class AccidentParticipantService(val accidentParticipantRepository: AccidentParticipantRepository) {

    fun findAllParticipantsForAccident(accidentId: Long) : List<Participant> = accidentParticipantRepository.findAllByAccident_Id(accidentId)
            .stream()
            .map(AccidentParticipant::participant)
            .collect(Collectors.toList())
    fun addParticipantToAccident(accident: Accident, participant: Participant) =
            accidentParticipantRepository.save(AccidentParticipant(accident, participant))
}