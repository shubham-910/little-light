package com.example.Little_Light.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SongDTO {
    private Long songId;
    private String title;
    private String songPath;
    private Long categoryId;
    private String categoryName;
    private Long artistId;
    private String artistName;
    private String imagePath;
}
