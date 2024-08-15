import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormInputTextPassword from "../components/FormInputPassword";
import FormInputText from "../components/FormInputText";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSnackbar } from "../hooks/useSnackbar";

const Login = () => {
	const { control, handleSubmit } = useForm({ mode: "onChange" });
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();
	const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();

	const onSubmit = (values) => {
		setIsLoading(true);
		login(values)
			.then((response) => {
				const { role } = response.data;
				localStorage.setItem("userRole", role);

				if (role === "THERAPIST") {
					navigate("/therapist-dashboard");
				} else {
					navigate("/user-dashboard");
				}
				showSuccessSnackbar("Logged in successfully");
			})
			.catch((error) => {
				console.log(error);
				showErrorSnackbar("Login failed");
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="row">
					<div className="col">
						<FormInputText
							control={control}
							name="email"
							label="Email"
							defaultValue=""
							required={true}
							type="email"
							rules={{ pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } }}
							autofocus={true}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<FormInputTextPassword control={control} name="password" label="Password" defaultValue="" required={true} type="password" />
					</div>
				</div>
				<div className="row justify-content-between align-items-center">
					<div className="col text-end">
						<Link to="/forgot-password">Forgot Password?</Link>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col">
						<Button type="submit" variant="contained" size="large" disabled={isLoading} fullWidth>
							Login
						</Button>
						<p className="mt-2">
							Need an account? <Link to="/sign-up">Sign Up</Link>
						</p>
					</div>
				</div>
			</form>
		</>
	);
};

export default Login;
