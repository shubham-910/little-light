package com.example.Little_Light.DTOs;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BlogDTO {
    private Long id;
    private String title;
    private String description;
    private String image;
    private Long therapistId;
    private String therapistFirstName;
    private  String therapistLastName;
    private LocalDateTime createdDate;
}
