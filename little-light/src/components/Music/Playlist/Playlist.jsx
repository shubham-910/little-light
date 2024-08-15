import React from "react";
import "./Playlist.css";
import { Typography } from "@mui/material";

// Define the path for the default image if needed
const defaultImage = "/images/album3.jpg";

const Playlist = ({ image = defaultImage, name }) => {
	return (
		<div className="v-stack gap-2 text-center mb-3 text-underline-none">
			<img src={image} alt={name} className="playlist-image" />
			<Typography component="p" color="primary">

				{name}
			</Typography>
		</div>
	);
};

export default Playlist;
