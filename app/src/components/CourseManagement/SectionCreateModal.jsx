import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SectionCreateModal = (props) => {
    let { handleClose, course, defaultName, defaultDescription } = props;
    defaultName = (defaultName === undefined ? "" : defaultName);
    defaultDescription = (defaultDescription === undefined ? "" : defaultDescription);
    const [name, setName] = useState(defaultName);
    const [description, setDescription] = useState(defaultDescription);
    return (
        <>
            <Modal.Header>
                <Modal.Title>Create Core Folder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="sectionName">
                        <Form.Label>Folder Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter folder name" value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="sectionDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter folder description" value={description} onChange={e => setDescription(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="mr-auto" variant="outline-secondary" onClick={() => handleClose(false)}>
                    Close
                </Button>
                <Button className="ml-auto" variant="outline-dark" onClick={() => handleClose(true, { name, description })}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </>
    )
}

export default SectionCreateModal;