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

    const convertDate = () => {
        const date = new Date(announcement.createdAt);
        return (date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + " at " + date.toLocaleTimeString('en-US'))
    }

    const toggleModal = () => {
        setShowAnnouncement(!showAnnouncement);
    }

    return (
        <div key={announcement._id}>
            <Container className="announcement-item" >
                <Row onClick={toggleModal}>
                    {/* <Col xs={0} md={1} className="text-center">
                        img
                    </Col> */}
                    <Col xs={12} md={9}>
                        <span className="announcement-title pr-4">{getCourseName() + ": " + announcement.title}</span> <span className="announcement-body">{trimAnnouncementBody()}</span>
                    </Col>
                    <Col xs={12} md={2}>
                        {announcement.from}
                    </Col>
                </Row>
                <hr />
            </Container>
            <Modal show={showAnnouncement} onHide={toggleModal} dialogClassName="modal-60w">
                <Modal.Header closeButton>
                    <Modal.Title>{announcement.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="underline">{getCourseName()}</p>
                    <p>{announcement.body}</p>
                </Modal.Body>
                <Modal.Footer className="smaller-footer">
                    <Container>
                        <Row>
                            <Col xs={4}>
                                {announcement.from}
                            </Col>
                            <Col xs={8} className="align-right">
                                {convertDate()}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Announcement;