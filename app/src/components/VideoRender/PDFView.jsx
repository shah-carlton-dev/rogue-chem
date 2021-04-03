import React, {useState} from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import {Modal, Button} from 'react-bootstrap';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import filePDF from './test.pdf'
import '../../styles/PDFView.css';
const testClass = {
  width: "50vw"
}
function PDFView() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Open Sample
            </Button>
        <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog">
          <Modal.Header closeButton>
            <Modal.Title>Sample</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sample description</Modal.Body>
          <div className="center-video">
            <div className="App">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                <div id="pdfviewer">
                  <Viewer fileUrl={filePDF} toolbar="0" />
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