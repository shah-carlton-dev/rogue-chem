import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Messages.css";
import { AnnouncementsList } from "./Messages/AnnouncementsList.jsx";
import { DMList } from "./Messages/DMList.jsx";

const Messages = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    return (
        <Container className="pt-2">
            <h2>Messages</h2>
            <hr />
            <h4 className="pl-3">Announcements</h4>
            < AnnouncementsList />
            <hr />
            <h4 className="pl-3">Direct Messages</h4>
            <DMList />
            <hr />
        </Container>
    )
}

export default Messages;