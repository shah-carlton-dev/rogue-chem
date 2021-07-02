import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../../styles/Announcement.css";

const Announcement = (props) => {
    const { announcement, meta } = props;

    const getCourseName = () => {
        return meta.filter(c => c.id === announcement.to)[0].name;
    }

    const trimAnnouncementBody = () => {
        const max = 40;
        const str = announcement.body.substring(0, Math.min(announcement.body.length, max));
        if (announcement.body.length > max) return str + "...";
        else return str;
    }


    console.log(announcement)

    return (
        <Container className="announcements-list" >
            <Row onClick={() => console.log("clickedAnnouncement")}>
                <Col xs={0} md={1} className="text-center">
                    img
                </Col>
                <Col xs={12} md={9}>
                    <span className="announcement-title pr-4">{getCourseName() + ": " + announcement.title}</span> <span className="announcement-body">{trimAnnouncementBody()}</span>
                </Col>
                <Col xs={12} md={2}>
                    {announcement.from}
                </Col>
            </Row>
            <hr />
        </Container>
    )
}

export default Announcement;