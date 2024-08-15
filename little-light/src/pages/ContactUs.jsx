import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Container, Grid, Typography, TextField, Button, Box, Snackbar, Alert, List } from "@mui/material";
import UserDashboard from "./UserDashboard";

const CustomContainer = styled(Container)(({ theme }) => ({
	paddingTop: theme.spacing(4),
	paddingBottom: theme.spacing(4),
}));

const Header = styled(Typography)(({ theme }) => ({
	textAlign: "center",
	marginBottom: theme.spacing(2),
}));

const Quote = styled(Typography)(({ theme }) => ({
	fontStyle: "italic",
	textAlign: "center",
	marginBottom: theme.spacing(4),
}));

const Section = styled(Box)(({ theme }) => ({
	marginBottom: theme.spacing(4),
	padding: theme.spacing(2),
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows[3],
}));

const ContactInfo = styled(Typography)(({ theme }) => ({
	fontWeight: "bold",
}));

const ListItem = styled("li")(({ theme }) => ({
	marginBottom: theme.spacing(1),
}));

const StyledSnackbar = styled(Snackbar)({
	"& .MuiAlert-root": {
		fontSize: "1.2rem",
		width: "100%",
		"@media (max-width: 600px)": {
			fontSize: "1rem",
		},
	},
});

const ContactUs = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		email: "",
		subject: "",
		message: "",
	});
	const [errors, setErrors] = useState({});
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const validateName = (name) => {
		const re = /^[A-Za-z\s]+$/;
		return re.test(name);
	};

	const validate = () => {
		let tempErrors = {};
		tempErrors.firstName = formData.firstName ? (validateName(formData.firstName) ? "" : "Only letters and spaces are allowed in names.") : "Name is required.";
		tempErrors.email = formData.email ? "" : "Email is required.";
		if (formData.email && !validateEmail(formData.email)) {
			tempErrors.email = "Email is not valid.";
		}
		tempErrors.subject = formData.subject ? "" : "Subject is required.";
		tempErrors.message = formData.message ? "" : "Message is required.";
		setErrors(tempErrors);
		return Object.values(tempErrors).every((x) => x === "");
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validate()) {
			try {
				await axios.post(`${process.env.REACT_APP_SERVER_URL}/feedback`, formData);
				setSnackbarOpen(true);
				setFormData({ firstName: "", email: "", subject: "", message: "" });
			} catch (error) {
				console.error("Error submitting feedback:", error);
			}
		}
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackbarOpen(false);
	};

	return (
		<CustomContainer>
			<Header variant="h3" component="h1" gutterBottom>
				Contact Us
			</Header>

			<Quote variant="h5" color="primary" component="h2" gutterBottom>
				"Shining a light on mental health, together we thrive."
			</Quote>

			{/* Reasons to Contact */}
			<Section>
				<Typography variant="h5" component="h2" fontWeight="bold" color="primary" gutterBottom>
					Why Should You Contact Us
				</Typography>
				<Typography variant="body1" paragraph>
					Whether you have questions about our services, need support, or want to provide feedback, we're here to help. Contact us to:
				</Typography>
				<List>
					<ListItem>
						<Typography variant="body1">Learn more about mental health resources available through our platform.</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body1">Get recommendations on articles and books that may help you.</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body1">Find a suitable therapist from our list.</Typography>
					</ListItem>
				</List>
			</Section>

			{/* Showcasing Work */}
			<Section>
				<Typography variant="h5" component="h2" fontWeight="bold" color="primary" gutterBottom>
					Showcasing Our Work
				</Typography>
				<Typography variant="body1" paragraph>
					Explore our range of services and products designed to support your mental health journey:
				</Typography>
				<List>
					<ListItem>
						<Typography variant="body1">In-depth articles on mental health topics.</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body1">Recommended books for mental health awareness and self-improvement.</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body1">A comprehensive list of therapists to suit your needs.</Typography>
					</ListItem>
				</List>
			</Section>

			{/* Contact Information */}
			<Section>
				<Typography variant="h5" component="h2" fontWeight="bold" color="primary" gutterBottom>
					Contact Information
				</Typography>
				<Typography variant="body1" paragraph>
					For immediate communication, reach us at:
				</Typography>
				<ContactInfo variant="body1">
					<strong>Email:</strong> support@littlelight.com
				</ContactInfo>
				<ContactInfo variant="body1">
					<strong>Phone:</strong> +1 (555) 123-4567
				</ContactInfo>
			</Section>

			{/* Feedback Form */}
			<Section>
				<Typography variant="h5" component="h2" gutterBottom>
					Feedback Form
				</Typography>
				<form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="Name"
								name="firstName"
								variant="outlined"
								value={formData.firstName}
								onChange={handleInputChange}
								required
								error={!!errors.firstName}
								helperText={errors.firstName}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="Email"
								name="email"
								variant="outlined"
								value={formData.email}
								onChange={handleInputChange}
								required
								error={!!errors.email}
								helperText={errors.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Subject"
								name="subject"
								variant="outlined"
								value={formData.subject}
								onChange={handleInputChange}
								required
								error={!!errors.subject}
								helperText={errors.subject}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								multiline
								rows={4}
								label="Message"
								name="message"
								variant="outlined"
								value={formData.message}
								onChange={handleInputChange}
								required
								error={!!errors.message}
								helperText={errors.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" color="primary" fullWidth type="submit" size="large">
								Submit
							</Button>
						</Grid>
					</Grid>
				</form>
			</Section>

			<StyledSnackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
				<Alert onClose={handleCloseSnackbar} severity="success">
					Your response is saved successfully!
				</Alert>
			</StyledSnackbar>
		</CustomContainer>
	);
};

export default ContactUs;
