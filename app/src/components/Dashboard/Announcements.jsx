import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Messages.css";
import AnnouncementsList from "./Messages/AnnouncementsList.jsx";

const Announcements = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    return (
        <Container className="pt-2 px-0 mx-4">

            <div className="announcements pl-3">
                <h2 >Announcements</h2>
                <hr />
                < AnnouncementsList />
            </div>
        </Container>
    )
}

export default Announcements;