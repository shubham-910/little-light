// src/components/JournalEdit.jsx
import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const JournalEdit = ({ open, onClose, journalId, onEditSuccess }) => {
	const [formData, setFormData] = useState({ date: "", title: "", description: "" });
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (journalId) {
			const fetchJournal = async () => {
				try {
					const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/journals/${journalId}`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					});
					setFormData({
						date: response.data.journalDate,
						title: response.data.journalTitle,
						description: response.data.journalDescription,
					});
				} catch (error) {
					console.error("There was an error fetching the journal entry:", error);
				}
			};
			fetchJournal();
		}
	}, [journalId]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: "" }); // Clear error for the field being edited
	};

	const handleSubmit = async () => {
		const { date, title, description } = formData;

		// Validate the form
		const newErrors = {};
		if (!date) newErrors.date = "Date field is required";
		if (!title) newErrors.title = "Title field is required";
		if (!description) newErrors.description = "Description field is required";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			await axios.put(
				`${process.env.REACT_APP_SERVER_URL}/journals/${journalId}`,
				{
					journalTitle: title,
					journalDate: date,
					journalDescription: description,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);
			setSnackbarMessage("Journal entry updated successfully!");
			setSnackbarOpen(true);
			onEditSuccess();
			onClose();
		} catch (error) {
			console.error("There was an error updating the journal entry:", error);
			setSnackbarMessage("Failed to update journal entry.");
			setSnackbarOpen(true);
		}
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	return (
		<div>
			<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
				<DialogTitle>Edit Journal Entry</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						name="date"
						label="Date"
						type="date"
						fullWidth
						variant="outlined"
						value={formData.date}
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
						error={!!errors.date}
						helperText={errors.date}
					/>
					<TextField
						margin="dense"
						name="title"
						label="Title"
						type="text"
						fullWidth
						variant="outlined"
						value={formData.title}
						onChange={handleChange}
						error={!!errors.title}
						helperText={errors.title}
					/>
					<TextField
						margin="dense"
						name="description"
						label="Description"
						type="text"
						fullWidth
						variant="outlined"
						value={formData.description}
						onChange={handleChange}
						error={!!errors.description}
						helperText={errors.description}
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
				<Alert onClose={handleSnackbarClose} severity={snackbarMessage === "Journal entry updated successfully!" ? "success" : "error"}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default JournalEdit;
