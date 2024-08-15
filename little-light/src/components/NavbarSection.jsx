// Created by Judith Kurian

import styles from "../styles/NavbarStyles";
import Logo from "../images/Logo.jpg";
import { useTheme, Button, AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { useAuth } from "../hooks/useAuth";
import "../styles/Homepage.css";

const buttonsData = [
	{ to: "/", text: "Home" },
	{ to: "/profile", text: "My Profile" },
	{ to: "/blogs", text: "Blogs" },
	{ to: "/music", text: "Music" },
	{ to: "/journal", text: "My Journals" },
	{ to: "/booking", text: "Therapist Booking" },
	{ to: "/request-status", text: "Request Status" },
	{ to: "/appointment-status", text: "Appointment Status" },
	{ to: "/reminders", text: "Reminders" },
];

const NavbarSection = () => {
	const theme = useTheme();
	const { user } = useAuth();

	const NavLink = styled(Typography)(({ theme }) => ({
		margin: 8,
		textDecoration: "none",
		fontFamily: "'Fredoka', 'Roboto'",
		fontWeight: "400",
		fontSize: "18px",
		"&:hover": {
			backgroundColor: "rgba(165, 137, 177, 0.3)",
			borderRadius: "8px",
		},
		color: "#efe8f2",
		padding: "0.5vw",
	}));

	return (
		<section id="header">
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
							<Link to="/contact-us" className="nav-link">
								Contact Us
							</Link>
							<Link to="/faq" className="nav-link">
								FAQ
							</Link>
							<Link to="/music/" className="nav-link">
								Music
							</Link>
							<Link to="/journal" className="nav-link">
								My Journal
							</Link>
							<Link to="/userprofile" className="nav-link">
								Profile
							</Link>
							<Link to="/" className="nav-link">
								Logout
							</Link>
						</div>
					</div>
				</div>
			</nav>
		</section>
		// <AppBar position="fixed" style={{...styles.navbar,...{borderBottom: `2px solid ${theme.palette.primary.dark}`}}}>
		//     <Toolbar style={styles.toolbar}>
		//         <img src={Logo} alt="Logo" style={styles.logo}/>
		//         <div style={styles.navLinks}>
		//         <NavLink component={Link} to="/">
		//                 Home
		//             </NavLink>
		//             <NavLink component={Link} to="">
		//                 My Profile
		//             </NavLink>
		//             <NavLink component={Link} to="" style={styles.link}>
		//                 Blogs
		//             </NavLink>
		//             <NavLink component={Link} to="/music/" style={styles.link}>
		//                 Music
		//             </NavLink>
		//             <NavLink component={Link} to="/journal" style={styles.link}>
		//                 My Journals
		//             </NavLink>
		//              {/* Only for people dealing with mental health illness */}
		//             <NavLink component={Link} to="/booking" style={styles.link}>
		//                 Therapist Booking
		//             </NavLink>
		//              {/* Only for people dealing with mental health illness */}
		//             <NavLink component={Link} to="/request-status" style={styles.link}>
		//                 Request Status
		//             </NavLink>
		//             {/* Only for therapists */}
		//             <NavLink component={Link} to="/appointment-requests" style={styles.link}>
		//                 Requests
		//             </NavLink>
		//         </div>
		//         <Button size="small" variant="contained" style={{...styles.logout, ...{color: theme.palette.primary.dark}}}>
		//             Logout
		//         </Button>
		//     </Toolbar>
		// </AppBar>
	);
};

export default NavbarSection;
