import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Messages = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    return (
        <Container className="pt-2">
            <h2>Messages</h2>
            <hr />
        </Container>
    )
}

export default Messages;