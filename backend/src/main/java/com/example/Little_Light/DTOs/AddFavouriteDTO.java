package com.example.Little_Light.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddFavouriteDTO {
    private Long songId;
    private Long userId;
}
