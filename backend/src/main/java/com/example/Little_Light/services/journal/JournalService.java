package com.example.Little_Light.services.journal;

import com.example.Little_Light.DTOs.JournalDTO;
import com.example.Little_Light.entities.Journal;

import java.util.List;
import java.util.Optional;

public interface JournalService {
    List<Journal> getJournalsByUserId(Long userId);
    Optional<Journal> getJournalById(Long journalId);  // New method to get a journal by ID
    Journal addJournal(JournalDTO journalDTO);
    Journal updateJournal(Long journalId, JournalDTO journalDTO);
    void deleteJournal(Long journalId);
}
