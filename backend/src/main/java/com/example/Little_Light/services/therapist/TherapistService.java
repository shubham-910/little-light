package com.example.Little_Light.services.therapist;

import com.example.Little_Light.DTOs.TherapistDTO;
import com.example.Little_Light.payloads.LoginCredentials;
import com.example.Little_Light.responses.AuthenticationResponse;

import java.util.List;

public interface TherapistService {
    AuthenticationResponse registerTherapist(TherapistDTO therapistDTO);
    AuthenticationResponse loginTherapist(LoginCredentials loginCredentials);
    TherapistDTO getTherapist(String email);
    TherapistDTO updateTherapist(TherapistDTO therapistDTO);
    List<TherapistDTO> getAllTherapists();
}
