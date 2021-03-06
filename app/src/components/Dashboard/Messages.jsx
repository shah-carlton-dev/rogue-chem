import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Messages.css";
import DMList from "./Messages/DMList.jsx";

const Messages = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    return (
        <Container className="pt-2 px-0 mx-4">


            <div className="dms pl-3">
                <h2>Direct Messages</h2>
                <hr />
                <DMList />
            </div>
        </Container>
    )
}

export default Messages;