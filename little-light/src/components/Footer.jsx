import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
	const theme = useTheme();
	return (
		<section id="footer" style={{ background: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
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
		</section>
	);
};

export default Footer;
