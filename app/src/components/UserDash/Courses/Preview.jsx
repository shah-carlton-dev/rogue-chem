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
    const [fileDesc, setFileDesc] = useState(preview.description);
    const [fileTitle, setFileTitle] = useState(preview.title);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        //console.log('attempting preview render');
        if (preview !== null && preview !== undefined && preview.file_path !== undefined) {
            showPreview();
        }
    }, [preview]);

    const showPreview = () => {
        //console.log("about to render preview modal: ");
        setFileDesc(preview.description);
        setFileTitle(preview.title);
        //const path = ;
        setFile(API_URL + "/" + preview.file_path.slice(5));
        //console.log(file +'\n'+fileDesc+'\n'+fileTitle);
    }

    return (
        <React.Fragment>
            {/* {console.log(preview)} */}
            {preview !== null && preview !== undefined && Object.keys(preview).length > 0
                ?
                <>
                    <h5>{preview.title}</h5>
                    <p>{preview.description}</p>
                    <Button variant="link" onClick={handleShow}>
                        View file
                    </Button>

                    <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog">
                        <Modal.Header closeButton>
                            <Modal.Title>{preview.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{preview.description}</Modal.Body>
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
                <p className="italicize text-center">No preview selected</p>
            }
        </React.Fragment>
    )
}

export default Preview;