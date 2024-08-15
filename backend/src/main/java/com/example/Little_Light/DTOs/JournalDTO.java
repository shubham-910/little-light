package com.example.Little_Light.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JournalDTO {
    private Long journalId;
    private Long userId;
    private String journalTitle;
    private LocalDate journalDate;
    private String journalDescription;
}
