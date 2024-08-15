package com.example.Little_Light.controllers;

import com.example.Little_Light.DTOs.AddFavouriteDTO;
import com.example.Little_Light.DTOs.SongDTO;
import com.example.Little_Light.entities.MusicEntities.Favourites;
import com.example.Little_Light.repositories.FavouritesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/favourites")
public class FavourtiesController {
    private static final Logger logger = LoggerFactory.getLogger(FavourtiesController.class);

    @Autowired
    private FavouritesRepository favouritesRepository;

    @GetMapping
    public ResponseEntity<?> getAllFavoriteSongsByUser(@RequestParam("userId") Long userId){
        try {
            List<Favourites> favorites = favouritesRepository.findByUserUserId(userId);
            if (favorites.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            List<SongDTO> listOfSongs = new ArrayList<>();
            for(Favourites favourite: favorites){
                SongDTO songDTO = new SongDTO(favourite.getSong().getSong_id(), favourite.getSong().getTitle(), favourite.getSong().getSongPath(), favourite.getSong().getCategory().getId(), favourite.getSong().getCategory().getName(), favourite
                .getSong().getArtist().getArtist_id(), favourite.getSong().getArtist().getName(), favourite.getSong().getImagePath());
                listOfSongs.add(songDTO);
            }
            return ResponseEntity.ok(listOfSongs);
        } catch (Exception e) {
            logger.error("Error occurred: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping
    ResponseEntity<?> addFavourite(@RequestBody AddFavouriteDTO body) {
        try {
            favouritesRepository.addFavourite(body.getSongId(), body.getUserId());
            return ResponseEntity.status(HttpStatus.CREATED).body("Added a favourite");
        } catch (Exception e) {
            logger.error("Error occurred: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    @DeleteMapping
    ResponseEntity<?> removeFavourite(@RequestBody AddFavouriteDTO body) {
        try {
            favouritesRepository.removeFavourite(body.getSongId(), body.getUserId());
            return ResponseEntity.ok("Removed from favourites");
        } catch (Exception e) {
            logger.error("Error occurred: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

}
