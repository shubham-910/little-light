import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const UpdateBlog = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchBlog = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				});
				setTitle(response.data.title);
				setDescription(response.data.description);
			} catch (error) {
				console.error("Error fetching blog:", error);
			}
		};
		fetchBlog();
	}, [id]);

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		if (title) formData.append("title", title);
		if (description) formData.append("description", description);
		if (image) formData.append("image", image);

		setLoading(true);
		try {
			await axios.put(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`, formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					"Content-Type": "multipart/form-data",
				},
			});
			alert("Blog updated successfully!");
			setLoading(false);
			navigate(`/blogs/${id}`);
		} catch (error) {
			console.error("Error updating blog:", error);
			alert("Failed to update the blog");
			setLoading(false);
		}
	};

	return (
		<div>
			<Container sx={{ marginTop: "2rem" }}>
				<Typography variant="h4" gutterBottom>
					Update Blog Post
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
							{loading ? "Updating..." : "Update Blog"}
						</Button>
					</Box>
				</form>
			</Container>
		</div>
	);
};

export default UpdateBlog;
