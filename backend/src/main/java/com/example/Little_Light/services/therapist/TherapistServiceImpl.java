package com.example.Little_Light.services.therapist;

import com.example.Little_Light.DTOs.TherapistDTO;
import com.example.Little_Light.entities.Therapist;
import com.example.Little_Light.exceptions.APIException;
import com.example.Little_Light.exceptions.ResourceNotFoundException;
import com.example.Little_Light.payloads.LoginCredentials;
import com.example.Little_Light.repositories.TherapistRepository;
import com.example.Little_Light.responses.AuthenticationResponse;
import com.example.Little_Light.security.JWTConfig;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TherapistServiceImpl implements TherapistService {

    private static final Logger logger = LoggerFactory.getLogger(TherapistServiceImpl.class);

    private final ModelMapper modelMapper;
    private final TherapistRepository therapistRepo;
    private final JWTConfig jwtConfig;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse registerTherapist(TherapistDTO therapistDTO) {
        logger.info("Registering therapist: {}", therapistDTO);
        try {
            Therapist therapist = modelMapper.map(therapistDTO, Therapist.class);
            logger.info("Mapped Therapist entity: {}", therapist);

            Therapist registeredTherapist = therapistRepo.save(therapist);
            logger.info("Therapist saved: {}", registeredTherapist);

            String accessToken = jwtConfig.generateToken(registeredTherapist);
            String refreshToken = jwtConfig.generateRefreshToken(registeredTherapist);
            return AuthenticationResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
        } catch (DataIntegrityViolationException e) {
            logger.error("Data Integrity Violation: {}", e.getMessage());
            throw new APIException("User already exists with emailId");
        } catch (ConstraintViolationException e) {
            logger.error("Constraint Violation: {}", e.getConstraintViolations());
            throw new APIException(e.getConstraintViolations().toString());
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
            throw new RuntimeException("Internal Server Error");
        }
    }

    @Override
    public AuthenticationResponse loginTherapist(LoginCredentials credentials) {
        UsernamePasswordAuthenticationToken authCredentials = new UsernamePasswordAuthenticationToken(credentials.getEmail(), credentials.getPassword());
        authenticationManager.authenticate(authCredentials);
        Therapist therapist = therapistRepo.findByEmail(credentials.getEmail());
        if (therapist == null) {
            throw new ResourceNotFoundException("Therapist not found with email: " + credentials.getEmail());
        }
        String accessToken = jwtConfig.generateToken(therapist);
        String refreshToken = jwtConfig.generateRefreshToken(therapist);
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public TherapistDTO getTherapist(String email) {
        Therapist therapist = therapistRepo.findByEmail(email);
        if (therapist == null) {
            throw new ResourceNotFoundException("Therapist not found with email: " + email);
        }
        TherapistDTO therapistDTO = modelMapper.map(therapist, TherapistDTO.class);
        therapistDTO.setPassword(null);
        return therapistDTO;
    }

    @Override
    public TherapistDTO updateTherapist(TherapistDTO therapistDTO) {
        Therapist existingTherapist = therapistRepo.findByEmail(therapistDTO.getEmail());
        if (existingTherapist == null) {
            throw new ResourceNotFoundException("Therapist not found with email: " + therapistDTO.getEmail());
        }

        existingTherapist.setFirstName(therapistDTO.getFirstName());
        existingTherapist.setLastName(therapistDTO.getLastName());
        existingTherapist.setPhoneNumber(therapistDTO.getPhoneNumber());
        existingTherapist.setProfessionalDetails(therapistDTO.getProfessionalDetails());
        existingTherapist.setAreaOfSpecialization(therapistDTO.getAreaOfSpecialization());
        existingTherapist.setYearsOfExperience(therapistDTO.getYearsOfExperience());
        // Update other fields as necessary

        Therapist updatedTherapist = therapistRepo.save(existingTherapist);
        return modelMapper.map(updatedTherapist, TherapistDTO.class);
    }

    @Override
    public List<TherapistDTO> getAllTherapists() {
        List<Therapist> therapists = therapistRepo.findAll();
        return therapists.stream()
                .map(therapist -> modelMapper.map(therapist, TherapistDTO.class))
                .collect(Collectors.toList());
    }
}
