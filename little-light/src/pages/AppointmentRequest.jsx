// Created by Judith Kurian

import { connect } from "react-redux";
import { Container, Image } from "react-bootstrap";
import RequestDiv from "../components/AppointmentBooking/RequestDiv";
import RefreshImage from "../images/refresh.png";
import styles from "../components/AppointmentBooking/styles";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { getBookingStatus } from "../components/AppointmentBooking/BookingActions";

const AppointmentRequests = (props) => {
	const theme = useTheme();
	const [refresh, setRefresh] = useState(false);
	const [text, setText] = useState("");

	useEffect(() => {
		if (refresh === true) {
			setText("");
		}
	}, [refresh]);

	useEffect(() => {
		props.getBookingStatus();
	}, []);

	return (
		<Container fluid sx={{ bgcolor: "background.paper" }}>
			<div style={styles.searchDiv}>
				<input
					style={{ ...styles.search, ...{ color: theme.palette.primary.dark, border: `1px solid ${theme.palette.primary.dark}` } }}
					type="text"
					placeholder="Search..."
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<Image src={RefreshImage} style={styles.refresh} onClick={() => setRefresh(true)}></Image>
			</div>
			<RequestDiv refresh={refresh} setRefresh={setRefresh} text={text} />
		</Container>
	);
};

const mapDispatchToProps = { getBookingStatus };

export default connect(null, mapDispatchToProps)(AppointmentRequests);
