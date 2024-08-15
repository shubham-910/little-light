package com.example.Little_Light.controllers;

import com.example.Little_Light.DTOs.JournalDTO;
import com.example.Little_Light.entities.Journal;
import com.example.Little_Light.entities.User;
import com.example.Little_Light.exceptions.ResourceNotFoundException;
import com.example.Little_Light.repositories.UserRepository;
import com.example.Little_Light.services.journal.JournalService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/journals")
public class JournalController {

    @Autowired
    private JournalService journalService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<?> getJournalsByUser() {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String email = userDetails.getUsername(); // Get email from Spring Security UserDetails

            // Fetch the custom User entity from the database
            User customUser = userRepository.findByEmail(email);

            if (customUser == null) {
                throw new ResourceNotFoundException("User not found with email: " + email);
            }

            Long userId = customUser.getUserId();
            List<Journal> journals = journalService.getJournalsByUserId(userId);
            return ResponseEntity.ok(journals);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJournalById(@PathVariable Long id) {
        try {
            Journal journal = journalService.getJournalById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Journal not found with id: " + id));
            return ResponseEntity.ok(journal);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> addJournal(@RequestBody JournalDTO journalDTO) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String email = userDetails.getUsername(); // Get email from Spring Security UserDetails

            // Fetch the custom User entity from the database
            User customUser = userRepository.findByEmail(email);

            if (customUser == null) {
                throw new ResourceNotFoundException("User not found with email: " + email);
            }

            journalDTO.setUserId(customUser.getUserId());
            Journal createdJournal = journalService.addJournal(journalDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdJournal);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateJournal(@PathVariable Long id, @RequestBody JournalDTO journalDTO) {
        try {
            Journal updatedJournal = journalService.updateJournal(id, journalDTO);
            return ResponseEntity.ok(updatedJournal);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJournal(@PathVariable Long id) {
        try {
            journalService.deleteJournal(id);
            return ResponseEntity.ok("Journal deleted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
