import React, { useState, useeffect, useEffect } from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import { Modal, Button } from 'react-bootstrap';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import '../../../styles/PDFView.css';
import { API_URL } from '../../../utils/constants';

const Preview = (props) => {
    const { preview } = props;
    const [show, setShow] = useState(false);
    const [file, setFile] = useState("");
    const [fileDesc, setFileDesc] = useState("");
    const [fileTitle, setFileTitle] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log('attempting preview render');
        if (preview !== null && preview !== undefined && preview.file_path !== undefined) {
            showPreview();
        }
    }, []);

    const showPreview = () => {
        setFileDesc(preview.description);
        setFileTitle(preview.title);
        const path = preview.file_path.slice(5);
        setFile(API_URL + "/" + path);

    }

    return (
        <React.Fragment>
            {preview !== null && preview !== undefined
                ?
                <>
                    <h5>File: {fileTitle}</h5>
                    <p>Description: {fileDesc}</p>
                    <Button variant="primary" onClick={handleShow}>
                        View file
                    </Button>
                    <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog">
                        <Modal.Header closeButton>
                            <Modal.Title>{fileTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{fileDesc}</Modal.Body>
                        <div className="center-video">
                            <div className="App">
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                                    <div id="pdfviewer">
                                        <Viewer fileUrl={file} toolbar="0" />
                                    </div>
                                </Worker>
                            </div>
                        </div>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                </>
                :
                <p>No preview selected</p>
            }
        </React.Fragment>
    )
}

export default Preview;