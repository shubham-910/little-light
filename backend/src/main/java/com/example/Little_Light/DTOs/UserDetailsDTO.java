package com.example.Little_Light.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsDTO {
    private Integer detailsId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String professionalDetails;
    private String areaOfSpecialization;
    private Integer yearsOfExperience;
}
