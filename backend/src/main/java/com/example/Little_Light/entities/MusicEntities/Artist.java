package com.example.Little_Light.entities.MusicEntities;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Artist")
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long artist_id;

    @Column(nullable = false)
    private String artist_name;

    // Getters and Setters
    public Long getArtist_id() {
        return artist_id;
    }

    public void setArtist_id(Long artist_id) {
        this.artist_id = artist_id;
    }

    public String getName() {
        return artist_name;
    }

    public void setName(String name) {
        this.artist_name = name;
    }

}
