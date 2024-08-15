import React, { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";

const MusicPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (song.songPath) {
        audioRef.current.src = song.songPath;
        console.log("Audio source set to:", song.songPath);
      } else {
        console.warn("No valid audio source provided");
        audioRef.current.src = ""; // Clear the src if songPath is not available
      }
    }
    setIsPlaying(false);
  }, [song]);

  return (
    <div className="music-player">
      <div className="music-info">
        <img src={song.imagePath} alt="Album Art" className="album-art" />
        <div className="song-details">
          <p className="song-name">{song.title}</p>
          <p className="artist-name">{song.artistName}</p>
        </div>
      </div>
      <audio ref={audioRef} controls />
    </div>
  );
};

export default MusicPlayer;
