import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import "../../../styles/Messages.css";
import AnnouncementsList from "../Messages/AnnouncementsList.jsx";
import Axios from "axios";
import { API_URL } from '../../../utils/constants.js';
import NewAnnouncementModal from '../Messages/NewAnnouncementModal.jsx';


const AdminAnnouncements = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    const [showAnnouncement, setShowAnnouncement] = useState(false);

    const toggleAnnouncements = () => {
        setShowAnnouncement(!showAnnouncement);
    }

    return (
        <div>
            <Container className="pt-2 px-0 mx-4">
                <div className="announcements pl-3">
                    <h2 >Announcements <span className="pl-3"><Button onClick={toggleAnnouncements} variant="outline-dark">+</Button> </span></h2>
                    <hr />
                    < AnnouncementsList isAdmin={true}/>
                </div>
            </Container>
            <NewAnnouncementModal show={showAnnouncement} toggle={toggleAnnouncements} />
        </div>
    )
}

export default AdminAnnouncements;