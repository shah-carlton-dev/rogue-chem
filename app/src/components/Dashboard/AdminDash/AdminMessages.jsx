import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import "../../../styles/Messages.css";
import DMList from "../Messages/DMList.jsx";
import Axios from "axios";
import { API_URL } from '../../../utils/constants.js';
import NewMessageModal from '../Messages/NewMessageModal.jsx';


const AdminMessages = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    const [showMessage, setShowMessage] = useState(false);


    const toggleMessages = () => {
        setShowMessage(!showMessage);
    }

    return (
        <div>
            <Container className="pt-2 px-0 mx-4">
                

                <div className="dms pl-3">
                    <h2 >Direct Messages <span className="pl-3"><Button onClick={toggleMessages} variant="outline-dark">+</Button> </span></h2>
                    <hr />
                    <DMList isAdmin={true}/>
                </div>
            </Container>
            <NewMessageModal show={showMessage} toggle={toggleMessages} />
        </div>
    )
}

export default AdminMessages;