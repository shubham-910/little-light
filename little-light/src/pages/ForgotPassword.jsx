import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInputText from "../components/FormInputText";

const ForgotPassword = () => {
	const { control, handleSubmit } = useForm({ mode: "onChange" });

	const onSubmit = (values) => {
		console.log(values);
		// const response = await fetch("https://express-t4.onrender.com/api/login", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(values),
		// 	mode: "cors",
		// });

		// if (response.status === 200) {
		// 	navigate("/users");
		// }
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
						/>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<Button type="submit" variant="contained" size="large" fullWidth>
							Send Verification Link
						</Button>
						<p className="mt-2">
							Remember your password? <Link to="/login">Login here</Link>
						</p>
					</div>
				</div>
			</form>
		</>
	);
};

export default ForgotPassword;
