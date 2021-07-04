import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import "../../../styles/Messages.css";
import Axios from "axios";
import { API_URL } from '../../../utils/constants.js';

const NewMessageModal = (props) => {

    const {show, toggle} = props;

    const postAnnouncement = async () => {
        console.log("posting announcement")
    }

    useEffect(() => {
        
    }, [])

    return (
        <Modal
            show={show}
            onHide={toggle}
            dialogClassName="modal-70w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Write a new message
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={postAnnouncement}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default NewMessageModal;