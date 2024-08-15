import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
	const { user, isAuthenticated, logout } = useAuth();
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
							<Link to="/" className="nav-link">
								Home
							</Link>
							<Link to="/contact-us" className="nav-link">
								Contact Us
							</Link>
							<Link to="/faq" className="nav-link">
								FAQ
							</Link>
							{isAuthenticated && (
								<>
									<Link to="/music/" className="nav-link">
										Music
									</Link>
									<Link to="/blogs/" className="nav-link">
										Blogs
									</Link>
									{user.role === "USER" && (
										<>
											<Link to="/journal" className="nav-link">
												My Journal
											</Link>
											<Link to="/booking" className="nav-link">
												Therapist Booking
											</Link>
											<Link to="/request-status" className="nav-link">
												Request Status
											</Link>
											<Link to="/userprofile" className="nav-link">
												Profile
											</Link>
										</>
									)}
									{user.role === "THERAPIST" && (
										<>
											<Link to="/appointment-requests" className="nav-link">
												Requests
											</Link>
											<Link to="/therapistprofile" className="nav-link">
												Profile
											</Link>
										</>
									)}
									<div className="hstack gap-2">
										<Link to="/" className="nav-link p-0" onClick={logout}>
											<Button className=" px-4" variant="contained">
												Logout
											</Button>
										</Link>
									</div>
								</>
							)}
							{!isAuthenticated && (
								<>
									<div className="hstack gap-2">
										<Link to="/login">
											<Button className=" px-4" variant="outlined">
												Login
											</Button>
										</Link>
										<Link to="/sign-up">
											<Button className=" px-4" variant="contained">
												Sign Up
											</Button>
										</Link>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
		</section>
	);
};

export default Header;
