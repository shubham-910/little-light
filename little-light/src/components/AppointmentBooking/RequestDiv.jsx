// Created by Judith Kurian

import {React} from 'react';
import { connect } from "react-redux";
import styles from './styles';
import RequestsRow from './RequestsRow';
import { getBookingStatus } from "./BookingActions";

const RequestDiv = (props) => {

    return (
        <div style={styles.therapistDiv}>
            {Array.isArray(props.bookingDetails) && props.bookingDetails.map((data, index) => {
                const rowName = data.patient_name.toLowerCase();
                const bookingDay = data.booking_day_time.toLowerCase();
                const searchText = props.text.toLowerCase();
                
                return (
                    <>
                    {props.text==='' && 
                    data.appointment_status === 'PENDING' && 
                    <RequestsRow data={data} index={index} />}
                    {props.text!=="" && 
                    (rowName.includes(searchText) || bookingDay.includes(searchText)) && data.appointment_status === 'PENDING' && 
                    <RequestsRow data={data} index={index}/>}
                    </>
                )
            })}
        </div>
    )
}

const mapStateToProps = (state) => ({
    bookingDetails: state.bookingDetails
})

const mapDispatchToProps = { getBookingStatus }

export default connect(mapStateToProps, mapDispatchToProps)(RequestDiv);