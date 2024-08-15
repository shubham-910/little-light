package com.example.Little_Light.services.journal;

import com.example.Little_Light.DTOs.JournalDTO;
import com.example.Little_Light.entities.Journal;
import com.example.Little_Light.entities.User;
import com.example.Little_Light.exceptions.ResourceNotFoundException;
import com.example.Little_Light.repositories.JournalRepository;
import com.example.Little_Light.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JournalServiceImpl implements JournalService {

    @Autowired
    private JournalRepository journalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<Journal> getJournalsByUserId(Long userId) {
        return journalRepository.findByUserUserId(userId);
    }

    @Override
    public Optional<Journal> getJournalById(Long journalId) {
        return journalRepository.findById(journalId);  // New method to get a journal by ID
    }

    @Override
    public Journal addJournal(JournalDTO journalDTO) {
        User user = userRepository.findById(journalDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + journalDTO.getUserId()));

        Journal journal = modelMapper.map(journalDTO, Journal.class);
        journal.setUser(user);
        return journalRepository.save(journal);
    }

    @Override
    public Journal updateJournal(Long journalId, JournalDTO journalDTO) {
        Journal journal = journalRepository.findById(journalId)
                .orElseThrow(() -> new ResourceNotFoundException("Journal not found with id: " + journalId));

        journal.setJournalTitle(journalDTO.getJournalTitle());
        journal.setJournalDate(journalDTO.getJournalDate());
        journal.setJournalDescription(journalDTO.getJournalDescription());

        return journalRepository.save(journal);
    }

    @Override
    public void deleteJournal(Long journalId) {
        Journal journal = journalRepository.findById(journalId)
                .orElseThrow(() -> new ResourceNotFoundException("Journal not found with id: " + journalId));
        journalRepository.delete(journal);
    }
}
