package com.example.Little_Light.entities.MusicEntities;

import com.example.Little_Light.entities.User;
import jakarta.persistence.*;

@Entity
@Table(name = "Favourites")
public class Favourites {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favourite_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id", nullable = false)
    private Song song;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    // Getters and Setters
    public Long getFavourite_id() {
        return favourite_id;
    }

    public void setFavourite_id(Long favourite_id) {
        this.favourite_id = favourite_id;
    }

    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }

    public Long getUser() {
        return this.user.getUserId();
    }

    public void setUser(User user) {
        this.user = user;
    }
}
