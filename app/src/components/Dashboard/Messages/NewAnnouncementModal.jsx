import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import "../../../styles/Messages.css";
import Axios from "axios";
import { API_URL } from '../../../utils/constants.js';
import UserContext from "../../../context/UserContext.js";

const NewAnnouncementModal = (props) => {
    const { userData, setUserData } = useContext(UserContext);

    const { show, toggle } = props;

    const [metaDoc, setMetaDoc] = useState([]);

    const [to, setTo] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const postAnnouncement = async (e) => {
        toggle();
        e.preventDefault();
        const announcement = { to, from: userData.user.username, title, body }
        await Axios.post(API_URL + "/msg/newAnnouncement", announcement).then(res => {
            console.log(res)
        });
    }

    const getCourseNameFromId = (id) => {
        if(metaDoc.length > 0) {
            return metaDoc.filter(c => c.id === id)[0].name;
        } else {
            return "";
        }
    }

    useEffect(() => {
        getMetaDoc();
        if (metaDoc !== {}) console.log(metaDoc)
    }, [])

    const getMetaDoc = async () => {
        await Axios.get(API_URL + "/msg/metaDoc").then(res => setMetaDoc(res.data));
    }

    return (
        <Modal
            show={show}
            onHide={toggle}
            dialogClassName="modal-70w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Write a new announcement
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => postAnnouncement(e)}>
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Group controlId="to">
                                <Form.Label>To</Form.Label>
                                <Form.Control as="select" onChange={e => setTo(e.target.value)}>
                                    {
                                        userData.user.courses.map(c =>
                                            <option value={c}>{getCourseNameFromId(c)}</option>
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="from">
                                <Form.Label>From</Form.Label>
                                <Form.Control type="text" placeholder={userData.user.username + ""} readOnly={true} />
                            </Form.Group>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>Announcement title</Form.Label>
                        <Form.Control type="text" placeholder="Add the title here" onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="body">
                        <Form.Label>Announcement body</Form.Label>
                        <Form.Control type="textarea" rows={3} placeholder="Add the announcement body here" onChange={e => setBody(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default NewAnnouncementModal;