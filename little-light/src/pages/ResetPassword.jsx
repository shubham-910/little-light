import { useForm } from "react-hook-form";
import FormInputTextPassword from "../components/FormInputPassword";
import { Button } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import FormInputText from "../components/FormInputText";

const ResetPassword = () => {
	const { control, handleSubmit } = useForm();
	const [queryParameters] = useSearchParams();

	const email = queryParameters.get("email") ?? "";

	function onSubmit(values) {
		console.table(values);
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="row">
					<div className="col">
						<FormInputText
							control={control}
							name="email"
							label="Email"
							required={true}
							readonly={true}
							type="email"
							defaultValue={email}
							rules={{ pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } }}
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
						<FormInputTextPassword control={control} name="confirmPassword" label="Confirm Password" required={true} defaultValue="" />
					</div>
				</div>
				<div className="row mt-3">
					<div className="col">
						<Button type="submit" variant="contained" size="large" fullWidth>
							Update Password
						</Button>
						<p className="mt-2">
							Have an account already? <Link to="/">Login here</Link>
						</p>
					</div>
				</div>
			</form>
		</>
	);
};

export default ResetPassword;
