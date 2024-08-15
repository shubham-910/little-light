import { FormControl, InputAdornment, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { Controller } from "react-hook-form";
import ErrorIcon from "@mui/icons-material/Error";

const FormSelect = ({ control, disabled = false, required = false, name, defaultValue, options, label }) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue || ""}
			rules={{
				required: {
					value: required,
					message: `${label} is required`,
				},
			}}
			key={`select-${name}`}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<FormControl fullWidth required={required} sx={{ mb: 1, textAlign: "start" }} error={!!error}>
					<InputLabel id={`input-label-${name}`}>{label}</InputLabel>
					<Select
						fullWidth
						onChange={onChange}
						value={value}
						label={label}
						disabled={disabled}
						endAdornment={
							error && (
								<InputAdornment position="end" sx={{ mr: 2 }}>
									<Tooltip title={error.message} placement="right" arrow open>
										<ErrorIcon color="error" />
									</Tooltip>
								</InputAdornment>
							)
						}
					>
						{options.map((option, index) => (
							<MenuItem value={option.value} key={`menu-item-${name}$-{option?.key}-${index}`}>
								{option.label}
							</MenuItem>
						))}
					</Select>
					{/* {error && <FormHelperText>{error.message}</FormHelperText>} */}
				</FormControl>
			)}
		/>
	);
};

export default FormSelect;
