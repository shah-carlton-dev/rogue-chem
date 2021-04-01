import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Nav } from "react-bootstrap";
import Axios from "axios";
import { API_URL } from '../../utils/constants';
import SectionsList from "./SectionsList.jsx";
import { NavLink } from "react-router-dom";

const SectionCreateModal = (props) => {
    let { handleClose, sections, defaultName, defaultDescription, addHandler } = props;
    defaultName = (defaultName === undefined ? "" : defaultName);
    defaultDescription = (defaultDescription === undefined ? "" : defaultDescription);
    const [name, setName] = useState(defaultName);
    const [description, setDescription] = useState(defaultDescription);
    const [useExisting, setUseExisting] = useState(false);
    const [allSections, setAllSections] = useState([]);
    const [updateSections, setUpdateSections] = useState(false);

    useEffect(() => {
        getAllSections();
    }, [useExisting])

    useEffect(() => {
        setUseExisting(true);
    }, [])

    const getAllSections = async () => {
        const url = API_URL + "/courses/allSections";
        Axios.get(url).then(res => {
            setAllSections(res.data);
            setUpdateSections(!updateSections);
        });
    }

    const showAdd = (bool) => {
        setUseExisting(bool);
    }


    return (
        <>
            <Modal.Header>
                <Modal.Title>Add a Core Folder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Nav variant="tabs" defaultActiveKey="#" className="mb-4">
                    <Nav.Item>
                        <Nav.Link onClick={() => { showAdd(true) }}>Add existing folder</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => { showAdd(false) }}>Create new folder</Nav.Link>
                    </Nav.Item>
                </Nav>
                {
                    useExisting ? (<>
                        <Form>
                            <SectionsList allSections={allSections} handler={addHandler} sections={sections}></SectionsList>
                        </Form>
                    </>) : (<>
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
                    </>)
                }
            </Modal.Body>
            <Modal.Footer>
                <Button className="mr-auto" variant="outline-secondary" onClick={() => handleClose(false)}>
                    Close
                </Button>
                <Button className="ml-auto" variant="outline-dark" onClick={() => handleClose(true, { name, description })}>
                    Save
                </Button>
            </Modal.Footer>
        </>
    )
}

export default SectionCreateModal;