import React, { useEffect, useState } from "react";
import Playlist from "./Playlist";
import { Link } from "react-router-dom";
import "./PlaylistGrid.css";
import axios from "axios";
import { Grid } from "@mui/material";

const PlaylistGrid = () => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_SERVER_URL}/category`)
			.then((response) => {
				setCategories(response.data);
			})
			.catch((error) => {
				console.error(error.message ?? "Error occured");
			});
	}, []);
	return (
		<Grid container>
			{categories.map((category, index) => (
				<Grid item xs={2}>
					<Link key={index} underline="none" to={`playlist?categoryName=${category.categoryName}`}>
						<Playlist image={category.imagePath} name={category.categoryName} />
					</Link>
				</Grid>
			))}
		</Grid>
	);
};

export default PlaylistGrid;
