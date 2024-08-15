import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import ErrorIcon from "@mui/icons-material/Error";

const FormInputTextPassword = ({
	disabled,
	name,
	variant = "outlined",
	control,
	defaultValue,
	label,
	type = "password",
	required = false,
	rows = 1,
	multiline = false,
	autofocus = false,
	rules,
	error,
	validate = null,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue ? defaultValue : ""}
			rules={{
				...rules,
				required: {
					value: required,
					message: `${label} is required`,
				},
				validate: validate,
			}}
			render={({ field: { onChange, value }, fieldState: { invalid, isTouched, isDirty, error } }) => (
				<TextField
					// helperText={error ? error.message : null}
					sx={{ mb: 1 }}
					margin="dense"
					error={!!error}
					fullWidth
					label={label}
					disabled={disabled}
					type={showPassword ? "text" : "password"}
					rows={rows}
					multiline={multiline}
					autoFocus={autofocus}
					onChange={onChange}
					value={value}
					variant={variant}
					required={required}
					InputProps={{
						endAdornment: (
							<>
								<InputAdornment position="end">
									<IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
								{error && (
									<InputAdornment position="end">
										<Tooltip title={error.message} placement="right" arrow open>
											<ErrorIcon color="error" />
										</Tooltip>
									</InputAdornment>
								)}
							</>
						),
					}}
				/>
			)}
		/>
	);
};

export default FormInputTextPassword;
