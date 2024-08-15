package com.example.Little_Light.controllers;

import com.example.Little_Light.DTOs.TherapistDTO;
import com.example.Little_Light.services.therapist.TherapistService;
import com.example.Little_Light.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/profiles/therapist")
@RequiredArgsConstructor
public class TherapistProfileController {

    private static final Logger logger = LoggerFactory.getLogger(TherapistProfileController.class);

    private final TherapistService therapistService;

    @GetMapping
    public ResponseEntity<TherapistDTO> getTherapistProfile() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = user.getUsername();
        TherapistDTO therapistDTO = therapistService.getTherapist(email);
        if (therapistDTO == null) {
            throw new ResourceNotFoundException("Therapist not found with email: " + email);
        }
        return ResponseEntity.ok(therapistDTO);
    }

    @PutMapping
    public ResponseEntity<TherapistDTO> updateTherapistProfile(@RequestBody TherapistDTO therapistDTO) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = user.getUsername();
        therapistDTO.setEmail(email);
        TherapistDTO updatedTherapist = therapistService.updateTherapist(therapistDTO);
        return ResponseEntity.ok(updatedTherapist);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TherapistDTO>> getAllTherapists() {
        List<TherapistDTO> therapists = therapistService.getAllTherapists();
        return ResponseEntity.ok(therapists);
    }
}
