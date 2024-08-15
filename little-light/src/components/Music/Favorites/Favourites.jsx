// Favourites.js
import React, { useEffect, useState } from "react";
import "../Playlist/Playlist.css";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import { useSnackbar } from "../../../hooks/useSnackbar";

const Favourites = ({ onSelectSong }) => {
	const [songs, setSongs] = useState([]);
	const { user } = useAuth();
	const userId = user ? user.userId : 1; // Use userId from user context
	const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();

	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/favourites?userId=${userId}`);
				if (response.status === 200) {
					const data = await response.data;
					setSongs(data);
				} else {
					console.error("Error fetching songs:", response.statusText);
				}
			} catch (error) {
				console.error("Error fetching songs:", error);
			}
		};
		fetchSongs();
	}, [userId]);

	const removeFromFavourites = async (songId) => {
		try {
			const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/favourites`, { data: { songId, userId } });
			if (response.status === 200) {
				// Remove song from state
				setSongs(songs.filter((song) => song.songId !== songId));
				showSuccessSnackbar("Removed from favourites");
			} else {
				console.error("Error removing song from favorites:", response.statusText);
				showErrorSnackbar(response.statusText);
			}
		} catch (error) {
			console.error("Error removing song from favorites:", error);
		}
	};

	return (
		<div className="playlist-page">
			<h2 className="playlist-heading">Favourites</h2>
			<div className="song-list">
				{songs.length > 0 ? (
					songs.map((song, index) => (
						<div key={index} className="song" role="button" onClick={() => onSelectSong(song)}>
							<img src={song.imagePath} alt="Album Art" className="album-image" />
							<div className="song-details-music">
								<p className="song-title">{song.title}</p>
								<p className="song-artist">{song.artistName}</p>
								<button
								className="like-button-music active"
								onClick={(e) => {
									e.stopPropagation(); // Prevents the onClick for the song div from firing
									removeFromFavourites(song.songId);
								}}
							>
								&#10084;
							</button>
							</div>
							
						</div>
					))
				) : (
					<h1>No Favorite Songs</h1>
				)}
			</div>
		</div>
	);
};

export default Favourites;
