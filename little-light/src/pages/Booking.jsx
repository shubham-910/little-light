// Created by Judith Kurian

import TherapistDiv from "../components/AppointmentBooking/TherapistDiv";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { IconButton, Paper, Tooltip } from "@mui/material";
import FormInputText from "../components/FormInputText";
import { useForm } from "react-hook-form";

const Booking = () => {
	const [refresh, setRefresh] = useState(false);
	const [text, setText] = useState("");
	const { control, reset, handleSubmit, getValues } = useForm({ mode: "onChange" });

	useEffect(() => {
		if (refresh === true) {
			setText("");
		}
	}, [refresh]);

	const onSubmit = ({ search }) => {
		setText(search);
	};

	const handleInputChange = (e) => {
		const value = e.target.value;
		setText(value);
		onSubmit({ search: value });
	};

	const handleReset = () => {
		reset(); // Reset the form
		onSubmit({ search: "" });
	};

	return (
		<>
			<div className="container mt-4">
				<Paper elevation={4} sx={{ paddingY: 4 }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="row h-100 position-relative justify-content-center align-items-center">
							<div className="col-5">
								<FormInputText
									name="search"
									control={control}
									type="text"
									placeholder="Search Therapists"
									onChange={(e) => handleInputChange(e)}
									helperText="Press 'Enter' to search"
								/>
							</div>
							<div className="col-1">
								<Tooltip title="Clear Search" placement="right">
									<IconButton onClick={handleReset}>
										<ClearIcon />
									</IconButton>
								</Tooltip>
							</div>
						</div>
					</form>
				</Paper>

				<div className="mt-4">
					<div className="row">
						<Paper elevation={4} sx={{ marginBottom: 4 }}>
							<TherapistDiv refresh={refresh} setRefresh={setRefresh} text={text} />
						</Paper>
					</div>
				</div>
			</div>
		</>
	);
};

export default Booking;
