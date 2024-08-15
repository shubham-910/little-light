import React, { createContext, useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const SnackbarContext = createContext();

export const useSnackbar = () => {
	return useContext(SnackbarContext);
};

export const SnackbarProvider = ({ children }) => {
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [message, setMessage] = useState("");

	const showSuccessSnackbar = (msg) => {
		setMessage(msg);
		setOpenSuccess(true);
	};
	const showErrorSnackbar = (msg) => {
		setMessage(msg);
		setOpenError(true);
	};

	const handleClose = () => {
		setOpenSuccess(false);
		setOpenError(false);
	};

	return (
		<SnackbarContext.Provider value={{ showSuccessSnackbar, showErrorSnackbar }}>
			{children}
			<Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success">
					{message}
				</Alert>
			</Snackbar>
			<Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error">
					{message}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};
