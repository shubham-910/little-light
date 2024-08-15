// created by Drishti Patel
import React from "react";
import { AutoStories, LibraryMusic, Newspaper } from "@mui/icons-material";
import { Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";

const TherapistDashboard = () => {
	const theme = useTheme();
	const features = [
		{
			icon: <AutoStories sx={{ fontSize: 40 }} />,
			title: "Journal",
			description: "Curated Selections to Feed Your Imagination and Enrich Your Mind",
		},
		{
			icon: <LibraryMusic sx={{ fontSize: 40 }} />,
			title: "Booking",
			description: "Immerse Yourself in Melodies that Speak to Your Soul",
		},
		{
			icon: <Newspaper sx={{ fontSize: 40 }} />,
			title: "Blogs",
			description: "Discover Perspectives, Ideas, and Expertise on a Variety of Topics",
		},
	];

	return (
		<>
			<section id="headerBanner" className="top">
				<div className="container" style={{ padding: 100, paddingTop: 50 }}>
					<div className="row">
						<div className="col-7 pb-4">
							<Typography variant="h1" className="fw-bold text-uppercase" style={{ color: theme.palette.primary.dark }}>
								Nurture Your Mind,
								<br />
								Heal Your Heart
							</Typography>
							<Typography variant="h3" component="p" style={{ color: theme.palette.secondary.dark }}>
								Empowering Therapists to Deliver Exceptional Care
							</Typography>
						</div>
						<div className="col-5 d-flex align-items-center justify-content-center">
							<img src="images/undraw_i_can_fly_-7-egl.svg" alt="Homepage" className="w-100" />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default TherapistDashboard;
