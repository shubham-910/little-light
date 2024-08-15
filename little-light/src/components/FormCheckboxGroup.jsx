import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const FormCheckboxGroup = ({ control, disabled = false, required = false, name, defaultValue, options, label, setValue }) => {
	const [selectedItems, setSelectedItems] = useState([]);
	// we are handling the selection manually here
	const handleSelect = (value) => {
		const isPresent = selectedItems.indexOf(value);
		if (isPresent !== -1) {
			const remaining = selectedItems.filter((item) => item !== value);
			setSelectedItems(remaining);
		} else {
			setSelectedItems((prevItems) => [...prevItems, value]);
		}
	};
	// we are setting form value manually here
	useEffect(() => {
		setValue(name, selectedItems);
	}, [name, selectedItems, setValue]);

	return (
		<FormControl sx={{ mb: 1 }} component="fieldset" variant="standard" required={required} disabled={disabled}>
			{label && <FormLabel component="legend">{label}</FormLabel>}
			<FormGroup>
				{options.map((option) => {
					return (
						<FormControlLabel
							control={
								<Controller
									name={name}
									render={({ field }) => {
										return <Checkbox checked={selectedItems.includes(option.value)} onChange={() => handleSelect(option.value)} />;
									}}
									control={control}
								/>
							}
							label={option.label}
							key={"checkbox-group-" + option.value}
						/>
					);
				})}
			</FormGroup>
		</FormControl>
	);
};

export default FormCheckboxGroup;
