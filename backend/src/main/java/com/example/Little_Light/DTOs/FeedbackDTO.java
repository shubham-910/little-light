package com.example.Little_Light.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {
    private Integer userId;
    private String message;
    private String firstName;
    private String email;
    private String subject;
}
