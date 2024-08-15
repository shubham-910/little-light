// src/pages/CreateBlog.jsx

import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";

const CreateBlog = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		if (image) {
			formData.append("image", image);
		}

		setLoading(true);
		try {
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs`, formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					"Content-Type": "multipart/form-data",
				},
			});
			alert("Blog created successfully!");
			setTitle("");
			setDescription("");
			setImage(null);
			setLoading(false);
			console.log(response.data);
		} catch (error) {
			console.error("Error creating blog:", error);
			alert("Failed to create the blog");
			setLoading(false);
		}
	};

	return (
		<Container sx={{ marginY: "2rem" }}>
			<Paper elevation={3} sx={{ padding: 4 }}>
				<Typography variant="h4" gutterBottom>
					Create a New Blog Post
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required margin="normal" />
					<TextField
						label="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						fullWidth
						required
						multiline
						rows={4}
						margin="normal"
					/>
					<input type="file" onChange={handleImageChange} style={{ marginTop: "1rem" }} />
					<Box sx={{ marginTop: "1rem" }}>
						<Button variant="contained" color="primary" type="submit" disabled={loading}>
							{loading ? "Creating..." : "Create Blog"}
						</Button>
					</Box>
				</form>
			</Paper>
		</Container>
	);
};

export default CreateBlog;
