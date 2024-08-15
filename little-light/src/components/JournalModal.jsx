import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const JournalModal = ({ open, onClose }) => {
	const [formData, setFormData] = useState({ journalDate: "", journalTitle: "", journalDescription: "" });
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: "" }); // Clear error for the field being edited
	};

	const handleSubmit = () => {
		const { journalDate, journalTitle, journalDescription } = formData;

		// Validate the form
		const newErrors = {};
		if (!journalDate) newErrors.journalDate = "Date field is required";
		if (!journalTitle) newErrors.journalTitle = "Title field is required";
		if (!journalDescription) newErrors.journalDescription = "Description field is required";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		const token = localStorage.getItem("accessToken"); // Ensure you have the JWT token stored in localStorage

		axios
			.post(
				`${process.env.REACT_APP_SERVER_URL}/journals`,
				{
					journalTitle: formData.journalTitle,
					journalDate: formData.journalDate,
					journalDescription: formData.journalDescription,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((response) => {
				setSnackbarMessage("Journal entry saved successfully!");
				setSnackbarOpen(true);
				onClose();
			})
			.catch((error) => {
				console.error("There was an error saving the journal entry:", error.response || error.message || error);
				setSnackbarMessage("Failed to save journal entry.");
				setSnackbarOpen(true);
			});
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	return (
		<div>
			<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
				<DialogTitle>Add New Journal Entry</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						name="journalDate"
						label="Date"
						type="date"
						fullWidth
						variant="outlined"
						value={formData.journalDate}
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
						error={!!errors.journalDate}
						helperText={errors.journalDate}
					/>
					<TextField
						margin="dense"
						name="journalTitle"
						label="Title"
						type="text"
						fullWidth
						variant="outlined"
						value={formData.journalTitle}
						onChange={handleChange}
						error={!!errors.journalTitle}
						helperText={errors.journalTitle}
					/>
					<TextField
						margin="dense"
						name="journalDescription"
						label="Description"
						type="text"
						fullWidth
						variant="outlined"
						value={formData.journalDescription}
						onChange={handleChange}
						error={!!errors.journalDescription}
						helperText={errors.journalDescription}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity={snackbarMessage === "Journal entry saved successfully!" ? "success" : "error"}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default JournalModal;
