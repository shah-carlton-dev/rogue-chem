import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import {Modal, Button} from 'react-bootstrap';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import '../../styles/PDFView.css';
import {API_URL} from '../../utils/constants';
import { getFilenameFromUrl } from 'pdfjs-dist';
const testClass = {
  width: "50vw"
}
function PDFView() {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  const [fileDesc, setFileDesc] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getFile = async() => {
      try {
        const result = await axios.get(`${API_URL}/getFile/606a11efedef6cf282b51a04`);
        const path = result.data.file_path.slice(5);
        setFile(API_URL + "/" + path);
        setFileDesc(result.data.description);
        setFileTitle(result.data.title);
      } catch (error) {
        console.log(error);
      }
    };
    getFile();
    console.log(file);
  }, [])
  return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Open Sample
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
  );
}

export default PDFView;