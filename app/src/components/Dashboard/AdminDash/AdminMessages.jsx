import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import "../../../styles/Messages.css";
import AnnouncementsList from "../Messages/AnnouncementsList.jsx";
import DMList from "../Messages/DMList.jsx";

const AdminMessages = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    const [showAnnouncement, setShowAnnouncement] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const toggleAnnouncements = () => {
        setShowAnnouncement(!showAnnouncement);
    }

    const toggleMessages = () => {
        setShowMessage(!showMessage);
    }

    return (
        <div>
            <Container className="pt-2 px-0 mx-4">
                <h2>Messages</h2>
                <hr />
                <div className="announcements pl-3">
                    <h4 >Announcements <span className="pl-3"><Button onClick={toggleAnnouncements} variant="outline-dark">+</Button> </span></h4>
                    <hr />
                    < AnnouncementsList />
                </div>

                <div className="dms pl-3">
                    <h4 >Direct Messages <span className="pl-3"><Button onClick={toggleMessages} variant="outline-dark">+</Button> </span></h4>
                    <hr />
                    <DMList />
                </div>
            </Container>

            <Modal
                show={showAnnouncement}
                onHide={toggleAnnouncements}
                dialogClassName="modal-70w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Write a new announcement
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                        commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                        ipsam atque a dolores quisquam quisquam adipisci possimus
                        laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                        accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                        reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                        deleniti rem!
                    </p>
                </Modal.Body>
            </Modal>

            <Modal
                show={showMessage}
                onHide={toggleMessages}
                dialogClassName="modal-70w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Write a new message
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                        commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                        ipsam atque a dolores quisquam quisquam adipisci possimus
                        laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                        accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                        reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                        deleniti rem!
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AdminMessages;