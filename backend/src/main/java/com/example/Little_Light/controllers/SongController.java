package com.example.Little_Light.controllers;

import com.example.Little_Light.DTOs.CategoryDTO;
import com.example.Little_Light.DTOs.SongDTO;
import com.example.Little_Light.entities.MusicEntities.Artist;
import com.example.Little_Light.entities.MusicEntities.Category;
import com.example.Little_Light.entities.MusicEntities.Song;
import com.example.Little_Light.repositories.CategoryRepository;
import com.example.Little_Light.services.FileUploadService;
import com.example.Little_Light.services.music.SongService;
import com.example.Little_Light.repositories.SongRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/songs")
@RequiredArgsConstructor
public class SongController {
    @Autowired
    private SongRepository songRepository;

    private static final Logger logger = LoggerFactory.getLogger(SongController.class);

    @GetMapping
    public ResponseEntity<?> getSongsByCategoryName(@RequestParam("categoryName") String categoryName) {
        try {
            logger.info("Received categoryName: {}", categoryName);
            List<Song> songs = songRepository.findSongsByCategoryName(categoryName);
            if (songs.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            List<SongDTO> songDTOS = new ArrayList<>();
            for(Song song: songs){
                SongDTO songDTO = new SongDTO(song.getSong_id(), song.getTitle(), song.getSongPath(), song.getCategory().getId(), song.getCategory().getName(), song.getArtist().getArtist_id(), song.getArtist().getName(), song.getImagePath());
                songDTOS.add(songDTO);
            }
            return ResponseEntity.ok(songDTOS);
        } catch (Exception e) {
            logger.error("Error occurred: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
