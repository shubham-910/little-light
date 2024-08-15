// created by Judith Kurian

import { connect } from "react-redux";
import styles from "./styles";
import { Row, Col, Image } from "react-bootstrap";
import {
	Avatar,
	Button,
	Divider,
	FormControl,
	InputLabel,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListSubheader,
	MenuItem,
	Select,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import DoctorIcon from "../../images/doctor-icon.png";
import { useAuth } from "../../hooks/useAuth";
import { createBooking } from "./BookingActions";
import { useState, Fragment } from "react";
import FormSelect from "../FormSelect";
import { useForm } from "react-hook-form";

const timeSlots = [
	{ label: "Monday 4:00 pm", value: "Monday 4:00 pm" },
	{ label: "Tuesday 5:30 pm", value: "Tuesday 5:30 pm" },
	{ label: "Wednesday 5:00 pm", value: "Wednesday 5:00 pm" },
	{ label: "Thursday 5:00 pm", value: "Thursday 5:00 pm" },
	{ label: "Friday 6:00 pm", value: "Friday 6:00 pm" },
	{ label: "Saturday 11:00 am", value: "Saturday 11:00 am" },
];

const RowComponent = (props) => {
	const { control } = useForm();
	const theme = useTheme();
	const { user } = useAuth();

	const [currentSlot, setCurrentSlot] = useState("");

	const changeTimeSlot = (index, slot) => {
		console.log("here");
		setCurrentSlot(slot);
		const newTimeSlots = [...props.timeSlots];
		newTimeSlots[props.index] = slot;
		props.setTimeSlots(newTimeSlots);
	};

	const book = () => {
		if (currentSlot !== "") {
			let data = {
				booking_day_time: currentSlot,
				therapist_name: `${props.data.firstName} ${props.data.lastName}`,
				patient_name: `${user.firstName} ${user.lastName}`,
				appointment_status: "PENDING",
			};
			props.createBooking(data);
		}
	};

	return (
		<>
			<ListItem
				alignItems="flex-start"
				secondaryAction={
					<>
						<FormControl>
							<InputLabel id="demo-simple-select-label">Select Slot</InputLabel>
							<Select
								control={control}
								name="role"
								label="Select Slot"
								value={props.timeSlots[props.index]}
								onChange={(e) => changeTimeSlot(props.index, e.target.value)}
								sx={{ width: "200px", marginRight: 4 }}
							>
								{timeSlots.map((option, index) => (
									<MenuItem value={option.value} key={`menu-item-${option}$-{option?.key}-${index}`}>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Button variant="contained" onClick={book}>
							Book Appointment
						</Button>
					</>
				}
			>
				<ListItemAvatar>
					<Avatar alt={props.data.firstName} src={DoctorIcon} sx={{ width: 56, height: 56, marginRight: 2 }} />
				</ListItemAvatar>
				<ListItemText
					primary={
						<Fragment>
							<Typography sx={{ display: "inline", fontWeight: "bold" }} variant="h5" color="text.primary">
								{props.data.firstName + " " + props.data.lastName}
							</Typography>
						</Fragment>
					}
					secondary={
						<Fragment>
							<Typography sx={{ display: "inline" }} component="span" variant="subtitle" color="text.secondary">
								{props.data.areaOfSpecialization}
							</Typography>
						</Fragment>
					}
				/>
			</ListItem>
			{/* <Row style={styles.therapistRow}>
				<Col sm="6" style={styles.doctorDiv}>
					<Image src={Doctor1} style={styles.doctorImage}></Image>
					<div style={styles.doctorDescription}>
						<p style={{ ...styles.doctorName, ...{ color: theme.palette.primary.dark } }}>{`${props.data.firstName} ${props.data.lastName}`}</p>
						<p style={styles.descriptionText}>{props.data.areaOfSpecialization}</p>
					</div>
				</Col>
				<Col sm="4" style={styles.timeDiv}>
					<TextField
						variant="outlined"
						select
						label="Select Slot"
						value={props.timeSlots[props.index]}
						onChange={(e) => changeTimeSlot(props.index, e.target.value)}
						style={styles.selectControl}
						InputLabelProps={{
							style: { color: theme.palette.primary.dark },
						}}
					>
						<MenuItem value={"Monday 4:00 pm"}>Monday 4:00 pm</MenuItem>
						<MenuItem value={"Tuesday 5:30 pm"}>Tuesday 5:30 pm</MenuItem>
						<MenuItem value={"Wednessday 5:00 pm"}>Wednesday 5:00 pm</MenuItem>
						<MenuItem value={"Thursday 5:00 pm"}>Thursday 5:00 pm</MenuItem>
						<MenuItem value={"Friday 6:00 pm"}>Friday 6:00 pm</MenuItem>
						<MenuItem value={"Saturday 11:00 am"}>Saturday 11:00 am</MenuItem>
					</TextField>
				</Col>
				<Col sm="2" className="d-flex align-items-center">
					<Button variant="contained" onClick={book}>
						Book Appointment
					</Button>
				</Col>
			</Row>
			<div style={{ ...styles.divider, ...{ backgroundColor: theme.palette.primary.dark } }}></div> */}
		</>
	);
};

const mapDispatchToProps = { createBooking };

export default connect(null, mapDispatchToProps)(RowComponent);
