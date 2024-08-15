import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Grid, Typography, Button, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import JournalDelete from "./JournalDelete";
import JournalEdit from "./JournalEdit";

const JournalGet = () => {
	const [journals, setJournals] = useState([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedJournalId, setSelectedJournalId] = useState(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const navigate = useNavigate();

	const getToken = () => {
		return localStorage.getItem("accessToken");
	};

	const isAuthenticated = () => {
		return !!getToken();
	};

	const axiosInstance = axios.create({
		baseURL: `${process.env.REACT_APP_SERVER_URL}/journals`,
		headers: {
			"Content-Type": "application/json",
		},
	});

	axiosInstance.interceptors.request.use((config) => {
		const token = getToken();
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	});

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate("/login");
		} else {
			const fetchJournals = async () => {
				try {
					const response = await axiosInstance.get(`${process.env.REACT_APP_SERVER_URL}/journals`);
					setJournals(response.data);
				} catch (error) {
					console.error("Error fetching journals", error);
				}
			};
			fetchJournals();
		}
	}, [navigate]);

	const handleDeleteClick = (journalId) => {
		setSelectedJournalId(journalId);
		setDeleteModalOpen(true);
	};

	const handleDeleteConfirm = async () => {
		try {
			await axiosInstance.delete(`/${selectedJournalId}`);
			setJournals(journals.filter((journal) => journal.journalId !== selectedJournalId));
			setSnackbarMessage("Journal entry deleted successfully!");
			setSnackbarOpen(true);
		} catch (error) {
			console.error("Error deleting journal", error);
		} finally {
			setDeleteModalOpen(false);
		}
	};

	const handleDeleteCancel = () => {
		setDeleteModalOpen(false);
		setSelectedJournalId(null);
	};

	const handleEditClick = (journalId) => {
		setSelectedJournalId(journalId);
		setEditModalOpen(true);
	};

	const handleEditSuccess = async () => {
		const response = await axiosInstance.get(`${process.env.REACT_APP_SERVER_URL}/journals`);
		setJournals(response.data);
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};
	const JournalItem = styled(Box)(({ theme }) => ({
		padding: theme.spacing(2),
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[1],
		marginBottom: theme.spacing(2),
	}));

	const ButtonContainer = styled(Box)(({ theme }) => ({
		display: "flex",
		justifyContent: "flex-end",
		gap: theme.spacing(1),
	}));

	return (
		<Grid container spacing={2}>
			{journals.map((journal) => (
				<Grid item xs={12} key={journal.journalId}>
					<JournalItem>
						<Typography variant="h6" gutterBottom>
							{journal.journalTitle}
						</Typography>
						<Typography variant="body2" gutterBottom>
							{journal.journalDescription}
						</Typography>
						<ButtonContainer>
							<Button variant="outlined" color="primary" onClick={() => handleEditClick(journal.journalId)}>
								Edit
							</Button>
							<Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(journal.journalId)}>
								Delete
							</Button>
						</ButtonContainer>
					</JournalItem>
				</Grid>
			))}
			<JournalDelete open={deleteModalOpen} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
			<JournalEdit open={editModalOpen} onClose={() => setEditModalOpen(false)} journalId={selectedJournalId} onEditSuccess={handleEditSuccess} />
			<Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity="success">
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Grid>
	);
};

export default JournalGet;
