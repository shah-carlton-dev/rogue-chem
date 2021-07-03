import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import "../../../styles/Announcement.css";

const Announcement = (props) => {
    const { announcement, meta } = props;
    const [showAnnouncement, setShowAnnouncement] = useState(false);

    const getCourseName = () => {
        return meta.filter(c => c.id === announcement.to)[0].name;
    }

    const trimAnnouncementBody = () => {
        const max = 40;
        const str = announcement.body.substring(0, Math.min(announcement.body.length, max));
        if (announcement.body.length > max) return str + "...";
        else return str;
    }

    const toggleModal = () => {
        setShowAnnouncement(!showAnnouncement);
    }

    return (
        <>
            <Container className="announcement-item" >
                <Row onClick={toggleModal}>
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
            <Modal show={showAnnouncement} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={toggleModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Announcement;