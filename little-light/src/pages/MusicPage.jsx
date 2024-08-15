import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Music/SideBar";
import ImageSlider from "../components/Music/ImageSlider";
import MusicPlayer from "../components/Music/MusicPlayer";
import PlaylistGrid from "../components/Music/Playlist/PlaylistGrid";
import PlaylistPage from "../components/Music/Playlist/PlaylistPage";
import "../styles/MusicPage.css";
import FavouritesPage from "../components/Music/Favorites/Favourites";
import { Grid, Typography } from "@mui/material";

function MusicPage() {
	const [selectedSong, setSelectedSong] = useState(null);
	return (
		<Grid container>
			<Grid item xs={2}>
				<Sidebar />
			</Grid>
			<Grid item xs={10}>
				<div className="main-content">
					<Routes>
						<Route
							index
							element={
								<>
									<ImageSlider />
									<Typography variant="h2" color="primary" fontWeight="bold" sx={{ marginY: 4 }}>
										Let Music Heal You!
									</Typography>
									<PlaylistGrid />
								</>
							}
						/>
						<Route path="playlist" element={<PlaylistPage onSelectSong={(song) => setSelectedSong(song)} />} />
						<Route path="favourites" element={<FavouritesPage onSelectSong={(song) => setSelectedSong(song)} />} />
					</Routes>
					{selectedSong && <MusicPlayer song={selectedSong} />}
				</div>
			</Grid>
		</Grid>
	);
}

export default MusicPage;
