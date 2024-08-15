package com.example.Little_Light.repositories;

import com.example.Little_Light.entities.MusicEntities.Favourites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FavouritesRepository extends JpaRepository<Favourites, Integer> {
    List<Favourites> findByUserUserId(Long userId);

    @Modifying
    @Transactional
    @Query(value = "INSERT into Favourites (song_id, user_id) values (:songId, :userId)", nativeQuery = true)
    void addFavourite(Long songId, Long userId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Favourites WHERE song_id = :songId AND user_id = :userId", nativeQuery = true)
    void removeFavourite(Long songId, Long userId);
}
