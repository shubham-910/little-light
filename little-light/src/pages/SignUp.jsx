import React, { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormInputText from "../components/FormInputText";
import FormInputTextPassword from "../components/FormInputPassword";
import FormSelect from "../components/FormSelect";
import axios from "axios";

const SignUp = () => {
	const { control, handleSubmit, getValues } = useForm();
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const navigate = useNavigate();

	async function onSubmit(values) {
		const { role, email, password, firstName, lastName, phoneNumber } = values;
		const userRole = role === 0 ? "USER" : "THERAPIST";
		try {
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
				email,
				password,
				role: userRole,
				firstName,
				lastName,
				phoneNumber,
			});
			// Store userRole in local storage
			localStorage.setItem("userRole", userRole);
			// Optionally, store tokens or navigate to another page
			const storedRole = localStorage.getItem("userRole");
			navigate("/login");
			// Show success message
			setOpenSnackbar(true);
		} catch (error) {
			console.error("Error registering user:", error.response.data);
		}
	}

	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="row">
					<div className="col">
						<FormSelect
							control={control}
							name="role"
							label="Role"
							options={[
								{ label: "Regular", value: 0 },
								{ label: "Therapist", value: 1 },
							]}
							required={true}
							defaultValue={0}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<FormInputText control={control} name="firstName" label="First Name" required={true} type="text" defaultValue="" />
					</div>
					<div className="col">
						<FormInputText control={control} name="lastName" label="Last Name" required={true} type="text" defaultValue="" />
					</div>
				</div>
				<div className="row">
					<div className="col">
						<FormInputText
							control={control}
							name="email"
							label="Email"
							required={true}
							type="email"
							defaultValue=""
							rules={{ pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } }}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<FormInputText
							control={control}
							name="phoneNumber"
							label="Phone Number"
							required={true}
							type="text"
							defaultValue=""
							rules={{ pattern: { value: /^\d{10}$/, message: "Phone number must be 10 digits" } }}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<FormInputTextPassword control={control} name="password" label="Password" required={true} defaultValue="" />
					</div>
				</div>
				<div className="row">
					<div className="col">
						<FormInputTextPassword
							control={control}
							name="confirmPassword"
							label="Confirm Password"
							required={true}
							defaultValue=""
							validate={(value) => {
								const { password } = getValues();
								return password === value || "Confirm Password does not match";
							}}
						/>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col">
						<Button type="submit" variant="contained" size="large" fullWidth>
							Register
						</Button>
						<p className="mt-2">
							Have an account already? <Link to="/login">Login here</Link>
						</p>
					</div>
				</div>
			</form>
			<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
					Registration successful!
				</Alert>
			</Snackbar>
		</>
	);
};

export default SignUp;
