// created by Judith Kurian

import { connect } from "react-redux";
import styles from "./styles";
import {Row, Col, Image} from 'react-bootstrap';
import { Button, useTheme } from "@mui/material";
import ProfileIcon from "../../images/ProfileIcon.png";
import { setStatus } from "./BookingActions";

const RequestsRow = (props) => {
    const theme = useTheme();

    const updateStatus = (status) => {
        props.setStatus({
            "status":status,
            "id": props.data.booking_Id
        });
    }

    return (
        <>
            <Row style={styles.therapistRow}>
                <Col sm="6" style={styles.doctorDiv}>                            
                    <Image src={ProfileIcon} style={styles.doctorImage}></Image>
                    <div style={styles.doctorDescription}>
                        <p style={{...styles.doctorName, ...{color: theme.palette.primary.dark}}}>{props.data.patient_name}</p>
                    </div>
                </Col>
                <Col sm="4" style={styles.timeDiv}>
                    <p style={{...styles.blackBlue, ...{color: theme.palette.primary.dark}}}>{props.data.booking_day_time}</p>
                </Col>
                <Col sm="2" className="d-flex align-items-center">
                    <Button 
                    variant="outlined" 
                    style={{backgroundColor: theme.palette.secondary.main, color:theme.palette.primary.contrastText}}
                    onClick={()=>{updateStatus('APPROVED')}}
                    >
                        Approve
                    </Button>
                    <Button 
                    variant="outlined" 
                    style={{backgroundColor: theme.palette.secondary.main, color:theme.palette.primary.contrastText, marginLeft: '1vw'}}
                    onClick={()=>{updateStatus('DECLINED')}}
                    >
                        Decline
                    </Button>
                </Col>
            </Row>
            <div style={{...styles.divider,...{backgroundColor: theme.palette.primary.dark}}}></div>
        </>
    )
}

const mapDispatchToProps = { setStatus }

export default connect(null, mapDispatchToProps)(RequestsRow);