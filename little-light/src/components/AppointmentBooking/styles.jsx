// created by Judith Kurian

const styles = {
	container: {
		padding: 0,
	},
	successBanner: {
		backgroundColor: "green",
		color: "white",
		padding: "10px",
		textAlign: "center",
		marginBottom: "10px",
		position: "fixed",
		borderRadius: "3vw",
	},
	errorBanner: {
		backgroundColor: "#E73741",
		color: "white",
		padding: "2vh",
		textAlign: "center",
		position: "fixed",
		borderRadius: "3vw",
	},
	searchDiv: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: "5vh",
		marginTop: "5vh",
		justifyContent: "space-between",
	},
	search: {
		width: "11vw",
		height: "6vh",
		borderRadius: "0.6vw",
		marginLeft: "5.5vh",
		paddingLeft: "0.5vw",
	},
	searchText: {
		marginLeft: "1vw",
		color: "#A7D9C6",
	},
	refresh: {
		height: "1.5vw",
		width: "1.5vw",
		marginRight: "2.7vw",
		cursor: "pointer",
	},
	therapistDiv: {
		marginLeft: "3.5vw",
		marginRight: "3.5vw",
	},
	therapistRow: {
		marginBottom: "4vh",
		borderRadius: "0.7vw",
	},
	doctorDiv: {
		display: "flex",
		flexDirection: "row",
	},
	doctorImage: {
		height: "6vw",
		width: "6vw",
		borderRadius: "10vw",
		marginTop: "1.5vh",
		marginBottom: "1.5vh",
	},
	doctorDescription: {
		marginLeft: "3vw",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	doctorName: {
		fontFamily: "Georgia",
		fontSize: "1.7rem",
		marginBottom: "0px",
	},
	descriptionText: {
		color: "#284B73",
	},
	selectControl: {
		width: "50%",
	},
	timeDiv: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	divider: {
		height: "0.2vh",
		marginLeft: "-0.9vw",
		marginRight: "-0.9vw",
		marginBottom: "4vh",
	},
	statusRow: {
		marginBottom: "7vh",
		borderRadius: "0.7vw",
		padding: "1vw",
	},
	blackBlue: {
		fontWeight: "bold",
		fontSize: "1.2rem",
	},
};

export default styles;
