import { all, takeLatest, put } from "redux-saga/effects";
import { getCall, postCall, putCall } from "./utils/apiCalls";

export function* getTherapists() {
	try {
		let response = yield getCall(`${process.env.REACT_APP_SERVER_URL}/profiles/therapist/all`);
		if (response.status === 200) {
			let data = yield response.json();
			yield put({ type: "set_therapists", therapists: data });
		} else {
			throw new Error("Error in fetching therapists, status code ", response.status);
		}
	} catch (e) {
		console.log(e);
	}
}

export function* createBooking(payload) {
	try {
		let response = yield postCall(`${process.env.REACT_APP_SERVER_URL}/booking/create`, payload.params);
		if (response.status === 200) {
			yield put({ type: "set_booking_success", params: true });
		} else {
			yield put({ type: "set_booking_error", params: true });
			throw new Error("Error while booking, status code ", response.status);
		}
	} catch (e) {
		console.log(e);
	}
}

export function* setBookingError(payload) {
	yield put({ type: "booking_error", value: payload.params });
}

export function* setBookingSuccess(payload) {
	yield put({ type: "booking_success", value: payload.params });
}

export function* getBookingDetails() {
	try {
		let response = yield getCall(`${process.env.REACT_APP_SERVER_URL}/booking/getStatus`);
		if (response.status === 200) {
			let data = yield response.json();
			yield put({ type: "set_booking_details", bookingDetails: data });
		} else {
			throw new Error("Error in fetching booking details, status code ", response.status);
		}
	} catch (e) {
		console.log(e);
	}
}

export function* setBookingStatus(payload) {
	try {
		let response = yield putCall(`${process.env.REACT_APP_SERVER_URL}/booking/status/${payload.params.id}?status=${payload.params.status}`);
		if (response.status === 200) {
			yield put({ type: "get_booking_status" });
		} else {
			throw new Error("Error in fetching booking details, status code ", response.status);
		}
	} catch (e) {
		console.log(e);
	}
}

export default function* rootSaga() {
	yield all([
		takeLatest("get_therapists", getTherapists),
		takeLatest("create_booking", createBooking),
		takeLatest("set_booking_error", setBookingError),
		takeLatest("set_booking_success", setBookingSuccess),
		takeLatest("get_booking_status", getBookingDetails),
		takeLatest("set_status", setBookingStatus),
	]);
}
