import React, { useState, useEffect } from "react";
import "./PlaylistPage.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { Grid, Typography } from "@mui/material";
import { useSnackbar } from "../../../hooks/useSnackbar";

const PlaylistPage = ({ onSelectSong }) => {
	const [songs, setSongs] = React.useState([]);
	const [favoritedSongs, setFavoritedSongs] = useState(new Set());
	const [categoryName, setCategoryName] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const { user } = useAuth();
	const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();

	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/songs?categoryName=${categoryName}`);
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

		const fetchFavoritedSongs = async () => {
			try {
				const userId = user ? user.userId : 1;
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/favourites?userId=${userId}`);
				if (response.status === 200) {
					const favorites = response.data;
					setFavoritedSongs(new Set(favorites.map((favorite) => favorite.songId)));
					showSuccessSnackbar("Added to favourites");
				} else {
					console.error("Error fetching favorites:", response.statusText);
					showErrorSnackbar(response.statusText);
				}
			} catch (error) {
				console.error("Error occurred while fetching favorites:", error);
			}
		};

		setCategoryName(searchParams.get("categoryName"));
		if (categoryName) {
			fetchSongs();
			fetchFavoritedSongs();
		}
	}, [searchParams, categoryName, user]);

	const addToPlaylist = async (songId, userId) => {
		try {
			const isFavorited = favoritedSongs.has(songId);
			if (isFavorited) {
				// Remove from favorites if it is already favorited
				const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/favourites`, {
					data: { songId, userId },
				});
				if (response.status === 200) {
					console.log("Removed from favorites:", response.data);
					showSuccessSnackbar("Removed from favorites");
					setFavoritedSongs((prev) => {
						const updatedFavorites = new Set(prev);
						updatedFavorites.delete(songId);
						return updatedFavorites;
					});
				} else {
					showErrorSnackbar(response.statusText);
					console.error("Error removing from playlist:", response.statusText);
				}
			} else {
				// Add to favorites if it is not already favorited
				const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/favourites`, { songId, userId });
				if (response.status === 201) {
					console.log(response.data);
					setFavoritedSongs((prev) => new Set(prev.add(songId)));
					showSuccessSnackbar("Added to favorites");
				} else {
					showErrorSnackbar(response.statusText);
					console.error("Error adding to playlist:", response.statusText);
				}
			}
		} catch (error) {
			console.error("Error occurred:", error);
		}
	};

	// Manage the state for the active button
	const [activeButton, setActiveButton] = useState(null);

	const handleButtonClick = (songId) => {
		// Toggle active state based on the songId
		setActiveButton((prev) => (prev === songId ? null : songId));
		addToPlaylist(songId, user ? user.userId : 1);
	};

	return (
		<>
			<Grid container px={4}>
				<Grid item xs={12}>
					<Typography variant="h2" color="primary" sx={{ mb: 4 }}>
						{categoryName ?? "Playlist"}
					</Typography>
				</Grid>
				{songs &&
					songs.map((song, index) => (
						<Grid item xs={12}>
							<div key={index} className="song" role="button" onClick={() => onSelectSong(song)}>
								<img src={song.imagePath} alt="Album Art" className="album-image" />
								<div className="song-details-music">
									<p className="song-title">{song.title}</p>
									<p className="song-artist">{song.artistName}</p>
									<p className="song-time">{song.duration ?? "00:00"}</p>
								</div>
								<button
									className={`like-button-music ${favoritedSongs.has(song.songId) ? "active" : ""}`}
									onClick={(e) => {
										e.stopPropagation(); // Prevents the onClick for the song div from firing
										handleButtonClick(song.songId);
									}}
								>
									&#10084;
								</button>
							</div>
						</Grid>
					))}
			</Grid>
		</>
		// <div className="playlist-page">
		//   <h2 className="heading">{categoryName ?? "Playlist"}</h2>
		//   <div className="song-list">
		//     {songs &&
		//       songs.map((song, index) => (
		//         <div
		//           key={index}
		//           className="song"
		//           role="button"
		//           onClick={() => onSelectSong(song)}
		//         >
		//           <img src={song.imagePath} alt="Album Art" className="album-image" />
		//           <div className="song-details-music">
		//             <p className="song-title">{song.title}</p>
		//             <p className="song-artist">{song.artistName}</p>
		//             <p className="song-time">{song.duration ?? "00:00"}</p>
		//           </div>
		//           <button
		//             className={`like-button-music ${favoritedSongs.has(song.songId) ? 'active' : ''}`}
		//             onClick={(e) => {
		//               e.stopPropagation(); // Prevents the onClick for the song div from firing
		//               handleButtonClick(song.songId);
		//             }}
		//           >
		//             &#10084;
		//           </button>
		//         </div>
		//       ))}
		//   </div>
		// </div>
	);
};

export default PlaylistPage;
