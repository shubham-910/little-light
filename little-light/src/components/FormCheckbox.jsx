import { Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const FormCheckbox = ({ control, disabled = false, required = false, name, defaultValue, label, value = false, checked = false, setValue }) => {
	const [isSelected, setIsSelected] = useState(value);
	// we are handling the selection manually here
	const handleSelect = (value) => {
		setIsSelected(value);
	};

	useEffect(() => {
		setValue(name, isSelected);
	}, [name, isSelected, setValue]);

	return (
		<FormControl sx={{ mb: 1 }} component="fieldset" variant="standard" required={required} disabled={disabled}>
			<FormGroup>
				<FormControlLabel
					control={
						<Controller
							name={name}
							render={({ field }) => {
								return <Checkbox checked={isSelected} onChange={() => handleSelect(!isSelected)} />;
							}}
							control={control}
						/>
					}
					label={label}
					key={label}
				/>
			</FormGroup>
		</FormControl>
	);
};

export default FormCheckbox;
