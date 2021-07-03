import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../../styles/Announcement.css";

const DirectMessage = (props) => {
    const { dm } = props;

    const trimMessageBody = () => {
        const max = 40;
        const str = dm.body.substring(0, Math.min(dm.body.length, max));
        if (dm.body.length > max) return str + "...";
        else return str;
    }

    console.log(dm);

    return (
        <Container className="announcement-item" >
            <Row onClick={() => console.log("clickedAnnouncement")}>
                <Col xs={0} md={1} className="text-center">
                    img
                </Col>
                <Col xs={12} md={9}>
                    <span className="announcement-title pr-4">{dm.title}</span> <span className="announcement-body">{trimMessageBody()}</span>
                </Col>
                <Col xs={12} md={2}>
                    {dm.from}
                </Col>
            </Row>
            <hr />
        </Container>
    )
}

export default DirectMessage;