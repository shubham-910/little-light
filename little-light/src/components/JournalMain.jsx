import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import JournalModal from "./JournalModal";
import JournalGet from "./JournalGet"; // Assuming this fetches journals
import useAuth from "../hooks/useAuth";

const JournalMain = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [journals, setJournals] = useState([]); // State to store journal entries
	const { user } = useAuth();

	const CustomContainer = styled(Container)(({ theme }) => ({
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	}));

	const Header = styled(Typography)(({ theme }) => ({
		textAlign: "center",
		marginBottom: theme.spacing(4),
	}));

	const Section = styled(Box)(({ theme }) => ({
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(-5),
		padding: theme.spacing(2),
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[3],
		[theme.breakpoints.up("md")]: {
			marginLeft: theme.spacing(25),
			marginRight: theme.spacing(25),
		},
		[theme.breakpoints.down("md")]: {
			marginLeft: theme.spacing(10),
			marginRight: theme.spacing(10),
		},
		[theme.breakpoints.down("sm")]: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
		},
	}));

	const CustomTypography = styled(Typography)(({ theme }) => ({
		[theme.breakpoints.up("md")]: {
			marginLeft: theme.spacing(48),
		},
		[theme.breakpoints.down("md")]: {
			marginLeft: theme.spacing(20),
		},
		[theme.breakpoints.down("sm")]: {
			marginLeft: theme.spacing(2),
		},
	}));

	const CustomButton = styled(Button)(({ theme }) => ({
		height: "60px",
	}));

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const handleEdit = (id) => {
		// Implement edit functionality
		console.log(`Edit journal with id: ${id}`);
	};

	const handleDelete = (id) => {
		// Implement delete functionality
		console.log(`Delete journal with id: ${id}`);
		// Example: Remove the journal from the state
		setJournals(journals.filter((journal) => journal.id !== id));
	};

	return (
		<div>
			<CustomContainer>
				<Header variant="h3" component="h1" gutterBottom>
					Welcome, {user.firstName}!
				</Header>
			</CustomContainer>
			<Section>
				<Grid item xs={12}>
					<CustomButton variant="contained" color="primary" fullWidth type="button" onClick={handleModalOpen}>
						Click to add a new Journal entry.....
					</CustomButton>
					<hr />
					<CustomTypography variant="h5" component="h2" gutterBottom>
						Click '+' icon to start your journey......
					</CustomTypography>
					<JournalGet journals={journals} onEdit={handleEdit} onDelete={handleDelete} />
				</Grid>
			</Section>
			<JournalModal open={modalOpen} onClose={handleModalClose} />
		</div>
	);
};

export default JournalMain;
