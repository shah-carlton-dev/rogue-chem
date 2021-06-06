import React, { useState, useContext, useEffect } from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import { Modal, Button, Row, Container } from 'react-bootstrap';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import '../../../styles/PDFView.css';
import Axios from "axios";
import { API_URL } from '../../../utils/constants';
import UserContext from "../../../context/UserContext.js";
import ListsContext from "../../../context/ListsContext.js";

const FileInfo = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const { queue, setQueue, recents, setRecents } = useContext(ListsContext);
    const { preview, setRecent } = props;
    const [show, setShow] = useState(false);
    const [file, setFile] = useState("");
    const handleClose = () => setShow(false);

    setRecent(preview._id, preview.title);

    useEffect(() => {
        //console.log('attempting preview render');
        if (preview !== null && preview !== undefined && preview.file_path !== undefined) {
            showPreview();
        }
    }, [preview]);

    const showPreview = () => {
        //console.log("about to render preview modal: ");
        setFile(API_URL + "/" + preview.file_path.slice(5));
        //console.log(file +'\n'+fileDesc+'\n'+fileTitle);
    }
    const handleAddToQueue = async (fileId) => {
        if (queue.files.includes(fileId)) {
            console.log("File already in queue: " + fileId);
        } else {
            try {
                await Axios.post(
                    API_URL + "/users/addToQueue",
                    { fileId, userId: userData.user._id }
                ).then(res => {
                    setQueue({ ...queue, files: [...queue.files, fileId] })
                });
            } catch (e) { }
        }
    }

    const handleShow = async (fileId) => {
        setShow(true);
        console.log("Add to recents: " + fileId);
        try {
            await Axios.post(
                API_URL + "/users/updateRecents",
                { fileId, userId: userData.user._id }
            ).then(res => {
                let find = (e) => e === fileId;
                if (recents.findIndex(find) === -1) {
                    setRecents([fileId, ...recents])
                } else {
                    const rec = recents.splice(find, 1);
                    setRecents([fileId, ...rec]);
                }
            });
        } catch (e) { }
    }


    return (
        <div className="filelist-root">
            {/* {console.log(preview)} */}
            {preview !== null && preview !== undefined && Object.keys(preview).length > 0
                ?
                <>
                    <h5>{preview.title}</h5>
                    <hr />
                    <h6>Description:</h6>
                    <p>{preview.description}</p>
                    <h6>Keywords:</h6>
                    <ul className="keyword-list">
                        {preview.keywords.map((word, index) => (
                            <li key={index}>{word}</li>
                        ))}
                    </ul>
                    <Button variant="link" onClick={() => handleShow(preview._id)}>
                        View file
                    </Button>

                    <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog">
                        <Modal.Header closeButton>
                            <Modal.Title>{preview.title}</Modal.Title> <br />

                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    {preview.description}
                                </Row>
                                <Row>
                                    <Button variant="link" onClick={() => handleAddToQueue(preview._id)}>add to queue</Button>

                                </Row>
                            </Container>
                        </Modal.Body>
                        <div className="center-video">
                            <div className="App">
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.min.js">
                                    <div id="pdfviewer">
                                        <Viewer fileUrl={API_URL + preview.file_path.slice(5)} toolbar="0" />
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
        </div>
    )
}

export default FileInfo;