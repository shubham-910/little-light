// Created by Judith Kurian

import { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./styles";
import { Row, Col, Image } from "react-bootstrap";
import { getBookingStatus } from "./BookingActions";
import { Paper, Typography, useTheme } from "@mui/material";

const StatusRow = (props) => {
	const theme = useTheme();

	useEffect(() => {
		props.getBookingStatus();
	}, []);

	return (
		<Paper elevation={4} sx={{ p: 4 }}>
			<Typography variant="h2" mb={4} fontWeight="bold">
				Request Status
			</Typography>
			<div style={styles.statusRowDiv}>
				{Array.isArray(props.bookingDetails) &&
					props.bookingDetails.map((data) => {
						return (
							<Row style={{ ...styles.statusRow, ...{ border: `5px solid ${theme.palette.secondary.main}` } }}>
								<Col sm="6" style={styles.doctorDiv}>
									<Image src={"Doctor"} alt={data.therapist_name} style={styles.doctorImage}></Image>
									<div style={styles.doctorDescription}>
										<Typography variant="h4" fontWeight="bold">
											{data.therapist_name}
										</Typography>
										<Typography variant="body2">{data.specialisation}</Typography>
									</div>
								</Col>
								<Col sm="4" style={styles.timeDiv}>
									<Typography variant="h5">{data.booking_day_time}</Typography>
								</Col>
								<Col sm="2" className="d-flex align-items-center">
									<Typography variant="h5" color={data.appointment_status === "APPROVED" ? "success" : "info"}>
										{data.appointment_status}
									</Typography>
								</Col>
							</Row>
						);
					})}
			</div>
		</Paper>
	);
};

const mapStateToProps = (state) => ({
	bookingDetails: state.bookingDetails,
});

const mapDispatchToProps = { getBookingStatus };

export default connect(mapStateToProps, mapDispatchToProps)(StatusRow);
