import { AutoStories, LibraryMusic, Newspaper } from "@mui/icons-material";
import { Button, Icon, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";

const Homepage = () => {
	const theme = useTheme();
	const features = [
		{
			icon: <AutoStories sx={{ fontSize: 40 }} />,
			title: "Books",
			description: "Curated Selections to Feed Your Imagination and Enrich Your Mind",
		},
		{
			icon: <LibraryMusic sx={{ fontSize: 40 }} />,
			title: "Music",
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
			{/* <section id="header">
				<nav className="navbar navbar-expand-lg">
					<div className="container-fluid">
						<Link to="/" className="navbar-brand">
							Little Light
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarNavAltMarkup"
							aria-controls="navbarNavAltMarkup"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
							<div className="navbar-nav ms-auto gap-4">
								<Link to="/" className="nav-link">
									Home
								</Link>
								<Link to="/contact-us" className="nav-link">
									Contact Us
								</Link>
								<Link to="/faq" className="nav-link">
									FAQ
								</Link>
								<div className="hstack gap-2">
									<Button className=" px-4" variant="outlined" href="/login" target="_blank">
										Login
									</Button>
									<Button className=" px-4" variant="contained" href="/sign-up" target="_blank">
										Sign Up
									</Button>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</section> */}
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
								Caring Support for Your Journey to Emotional Well-being
							</Typography>
						</div>
						<div className="col-5 d-flex align-items-center justify-content-center">
							<img src="images/undraw_i_can_fly_-7-egl.svg" alt="Homepage" className="w-100" />
						</div>
					</div>
				</div>
			</section>
			<section id="features" className="bottom pt-5">
				<div className="container">
					<Typography variant="h3" className="fw-bold my-5 text-center text-uppercase homepage-heading" style={{ color: theme.palette.primary.dark }}>
						Features
					</Typography>
					<div className="row py-5">
						<div className="col-4">
							<img src="images/undraw_notebook_re_id0r.svg" alt="Homepage" className="w-100" />
						</div>
						<div className="col-8 d-flex ps-5 flex-column justify-content-center">
							<Typography variant="h4" component="h2" className="fw-bold" style={{ color: theme.palette.primary.dark }}>
								Journaling
							</Typography>
							<Typography variant="p" className="fst-italic">
								Caring Support for Your Journey to Emotional Well-being
							</Typography>
						</div>
					</div>
					<div className="row py-5">
						{features.map((section, index) => (
							<div key={index} className="col-4">
								<div
									className="m-3 p-5 shadow text-center"
									style={{
										backgroundColor: theme.palette.secondary.main,
										borderRadius: theme.shape.borderRadius,
										color: theme.palette.primary.dark,
									}}
								>
									<span className="d-inline-block p-3 mb-4">{section.icon}</span>
									<Typography variant="h4" component="h2" className="fw-bold mb-2" style={{ color: theme.palette.primary.dark }}>
										{section.title}
									</Typography>
									<Typography variant="p" className="fst-italic" style={{ color: theme.palette.secondary.contrastText }}>
										{section.description}
									</Typography>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* <section id="footer" style={{ background: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
				<div className="container">
					<div className="row py-5">
						<div className="col-6">
							<Typography variant="h4" component="h2" className="fw-bold">
								Little Light
							</Typography>
						</div>
						<div className="col-3"></div>
						<div className="col-3">
							<Typography variant="p" className="fw-bold">
								Support
							</Typography>
							<ul className="vstack gap-1 mt-2 list-unstyled">
								<li className="">
									<Link to="/contact-us" style={{ color: theme.palette.primary.contrastText, textDecoration: "none" }}>
										Contact Us
									</Link>
								</li>
								<li className="">
									<Link to="/faq" style={{ color: theme.palette.primary.contrastText, textDecoration: "none" }}>
										FAQ
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="row py-3">
						<small className="col text-center">&copy; 2024 - All rights reserved to Group 13</small>
					</div>
				</div>
			</section> */}
		</>
	);
};

export default Homepage;
