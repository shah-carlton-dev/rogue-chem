import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Messages.css";
import AnnouncementsList from "./Messages/AnnouncementsList.jsx";
import DMList from "./Messages/DMList.jsx";

const Messages = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    return (
        <Container className="pt-2 px-0 mx-4">
            <h2>Messages</h2>
            <hr />
            <div className="announcements pl-3">
                <h4 >Announcements</h4>
                <hr />
                < AnnouncementsList />
            </div>

            <div className="dms pl-3">
                <h4>Direct Messages</h4>
                <hr />
                <DMList />
            </div>
        </Container>
    )
}

export default Messages;