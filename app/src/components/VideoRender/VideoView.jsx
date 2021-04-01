import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/VideoView.css';
const VideoView = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const modalStyle = {width: '90vw'};
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Open {props.video.title}
            </Button>
            <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog">
                <Modal.Header closeButton>
                    <Modal.Title>{props.video.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.video.description}</Modal.Body>
                <div className="center-video">
                    <iframe title={props.video.title} src={props.video.url} width="640" height="480" frameorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
                </div>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )


}

export default VideoView;