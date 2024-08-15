// Created by Judith Kurian

import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTherapistDetails, setBookingError, setBookingSuccess } from "./BookingActions";
import { List, ListSubheader, Typography } from "@mui/material";
import RowComponent from "./RowComponent";
import { useSnackbar } from "../../hooks/useSnackbar";

const TherapistDiv = (props) => {
	const [timeSlots, setTimeSlots] = useState([]);
	const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();

	useEffect(() => {
		props.getTherapistDetails();
	}, []);

	useEffect(() => {
		if (props.refresh === true) {
			if (props.therapists && Array.isArray(props.therapists)) {
				setTimeSlots(Array(props.therapists.length).fill(""));
			} else {
				setTimeSlots([]);
			}
			props.setRefresh(false);
		}
	}, [props.refresh]);

	useEffect(() => {
		if (props.bookingSuccess) {
			showSuccessSnackbar("Booking successful!");
		}

		if (props.bookingError) {
			showErrorSnackbar("Booking failed!");
		}
	}, [props.bookingSuccess, props.bookingError]);

	const isValidData = (data) => {
		return data !== null && data !== undefined;
	};

	return (
		<>
			{/* <Typography variant="h2">Therapists</Typography> */}
			{Array.isArray(props.therapists) && (
				<List
					sx={{ width: "100%", bgcolor: "background.paper" }}
					component="nav"
					subheader={
						<ListSubheader component="div" id="nested-list-subheader" sx={{ marginBottom: 3 }}>
							<Typography variant="h2" color="text.primary" fontWeight="bold">
								Therapists
							</Typography>
						</ListSubheader>
					}
				>
					{props.therapists.map((data, index) => {
						const name = `${data.firstName} ${data.lastName}`;
						const rowName = name.toLowerCase();
						const searchText = props.text.toLowerCase();
						const rowSpecialisation = isValidData(data.areaOfSpecialization) ? data.areaOfSpecialization.toLowerCase() : "";
						return (
							<>
								{props.text === "" && <RowComponent data={data} timeSlots={timeSlots} setTimeSlots={setTimeSlots} index={index} />}
								{props.text !== "" && (rowName.includes(searchText) || rowSpecialisation.includes(searchText)) && (
									<RowComponent data={data} timeSlots={timeSlots} setTimeSlots={setTimeSlots} index={index} />
								)}

								{/* <RowComponent data={data} timeSlots={timeSlots} setTimeSlots={setTimeSlots} index={index} />
								<Divider variant="inset" component="li" /> */}
							</>
						);
					})}
				</List>
			)}
			{/* <div style={styles.therapistDiv}>
				{props.bookingSuccess && <div style={styles.successBanner}>Booking successful!</div>}
				{props.bookingError && <div style={styles.errorBanner}>Booking failed!</div>}
				{Array.isArray(props.therapists) &&
					props.therapists.map((data, index) => {
						const name = `${data.firstName} ${data.lastName}`;
						const rowName = name.toLowerCase();
						const searchText = props.text.toLowerCase();
						const rowSpecialisation = isValidData(data.areaOfSpecialization) ? data.areaOfSpecialization.toLowerCase() : "";
						return (
							<>
								{props.text === "" && <RowComponent data={data} timeSlots={timeSlots} setTimeSlots={setTimeSlots} index={index} />}
								{props.text !== "" && (rowName.includes(searchText) || rowSpecialisation.includes(searchText)) && (
									<RowComponent data={data} timeSlots={timeSlots} setTimeSlots={setTimeSlots} index={index} />
								)}
							</>
						);
					})}
			</div> */}
		</>
	);
};

const mapStateToProps = (state) => ({
	therapists: state.therapists,
	bookingSuccess: state.bookingSuccess,
	bookingError: state.bookingError,
});

const mapDispatchToProps = { getTherapistDetails, setBookingError, setBookingSuccess };

export default connect(mapStateToProps, mapDispatchToProps)(TherapistDiv);
