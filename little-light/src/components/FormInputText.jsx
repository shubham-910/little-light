import { InputAdornment, TextField, Tooltip } from "@mui/material";
import { Controller } from "react-hook-form";
import ErrorIcon from "@mui/icons-material/Error";

const FormInputText = ({
	disabled,
	name,
	variant = "outlined",
	control,
	defaultValue,
	label,
	type = "text",
	required = false,
	rows = 1,
	multiline = false,
	autofocus = false,
	readonly = false,
	placeholder = "",
	rules,
	helperText,
}) => {
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
					InputProps={{
						readOnly: readonly,
						endAdornment: error && (
							<InputAdornment position="end">
								<Tooltip title={error.message} placement="right" arrow open>
									<ErrorIcon color="error" />
								</Tooltip>
							</InputAdornment>
						),
					}}
					type={type}
					rows={rows}
					multiline={multiline}
					autoFocus={autofocus}
					onChange={onChange}
					value={value}
					variant={variant}
					required={required}
					placeholder={placeholder}
					helperText={helperText}
				/>
			)}
		/>
	);
};

export default FormInputText;
