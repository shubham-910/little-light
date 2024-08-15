package com.example.Little_Light.repositories;

import com.example.Little_Light.entities.MusicEntities.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {

    @Query("SELECT s FROM Song s WHERE s.category.name = :categoryName")
    List<Song> findSongsByCategoryName(@Param("categoryName") String categoryName);

    List<Song> findByCategoryId(Long id);

}
