package com.example.Little_Light.DTOs;

import com.example.Little_Light.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TherapistDTO {
    private Long therapistId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
    private String phoneNumber;
    private  String professionalDetails;
    private String areaOfSpecialization;
    private  String yearsOfExperience;
}
