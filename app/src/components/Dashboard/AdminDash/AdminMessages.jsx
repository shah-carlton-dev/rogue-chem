import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import "../../../styles/Messages.css";
import AnnouncementsList from "../Messages/AnnouncementsList.jsx";
import DMList from "../Messages/DMList.jsx";
import Axios from "axios";
import { API_URL } from '../../../utils/constants.js';
import NewAnnouncementModal from '../Messages/NewAnnouncementModal.jsx';
import NewMessageModal from '../Messages/NewMessageModal.jsx';


const AdminMessages = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    const [showAnnouncement, setShowAnnouncement] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const toggleAnnouncements = () => {
        setShowAnnouncement(!showAnnouncement);
    }

    const toggleMessages = () => {
        setShowMessage(!showMessage);
    }

    return (
        <div>
            <Container className="pt-2 px-0 mx-4">
                <h2>Messages</h2>
                <hr />
                <div className="announcements pl-3">
                    <h4 >Announcements <span className="pl-3"><Button onClick={toggleAnnouncements} variant="outline-dark">+</Button> </span></h4>
                    <hr />
                    < AnnouncementsList isAdmin={true}/>
                </div>

                <div className="dms pl-3">
                    <h4 >Direct Messages <span className="pl-3"><Button onClick={toggleMessages} variant="outline-dark">+</Button> </span></h4>
                    <hr />
                    <DMList isAdmin={true}/>
                </div>
            </Container>
            <NewAnnouncementModal show={showAnnouncement} toggle={toggleAnnouncements} />
            <NewMessageModal show={showMessage} toggle={toggleMessages} />
        </div>
    )
}

export default AdminMessages;