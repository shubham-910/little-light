// src/pages/BlogHome.jsx

import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import CategoryButton from "../components/CategoryButton";
import { Container, Grid, TextField, Fab, Typography, IconButton, Tooltip, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogHome = () => {
	const [blogs, setBlogs] = useState([]);
	const [filteredBlogs, setFilteredBlogs] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const categories = ["View all", "Category 1", "Category 2", "Category 3"];
	const navigate = useNavigate();

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				});
				setBlogs(response.data);
				setFilteredBlogs(response.data);
			} catch (error) {
				console.error("Error fetching blogs:", error);
			}
		};

		fetchBlogs();
	}, []);

	const handleSearchChange = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
		setFilteredBlogs(
			blogs.filter(
				(blog) =>
					blog.title?.toLowerCase().includes(query) ||
					blog.therapist.firstName?.toLowerCase().includes(query) ||
					blog.therapist.lastName?.toLowerCase().includes(query)
			)
		);
	};

	const handleCreateClick = () => {
		navigate("/create-blog");
	};

	const userRole = localStorage.getItem("userRole"); // Get role from localStorage
	console.log(userRole);

	return (
		<Container sx={{ marginY: "2rem" }}>
			<Paper elevation={3} sx={{ padding: 4 }}>
				<Grid container spacing={3} alignItems="center" sx={{ marginBottom: "2rem" }}>
					<Grid item xs={8}>
						<TextField label="Search Blog" fullWidth placeholder="Enter Blog Title" value={searchQuery} onChange={handleSearchChange} />
					</Grid>

					{userRole === "THERAPIST" && (
						<Grid item xs={4}>
							<Button color="secondary" variant="contained" size="large" startIcon={<AddIcon />} onClick={handleCreateClick}>
								Add Blog
							</Button>
						</Grid>
					)}
				</Grid>
				<Grid container spacing={3}>
					{categories.map((category) => (
						<Grid item key={category}>
							<CategoryButton name={category} />
						</Grid>
					))}
				</Grid>
				<Grid container spacing={3} sx={{ marginTop: "2rem" }}>
					{filteredBlogs.map((blog, index) => (
						<Grid item xs={12} sm={6} md={4} key={index}>
							<BlogCard
								id={blog.id}
								title={blog.title}
								description={blog.description}
								imgSrc={blog.image}
								date={new Date(blog.createdDate).toLocaleDateString()}
								author={`${blog.therapist.firstName} ${blog.therapist.lastName}`}
							/>
						</Grid>
					))}
					{!filteredBlogs.length && (
						<Typography variant="h4" sx={{ padding: 5 }}>
							No blogs available
						</Typography>
					)}
				</Grid>
			</Paper>
		</Container>
	);
};

export default BlogHome;
