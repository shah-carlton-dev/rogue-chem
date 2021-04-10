import React, { useState, useEffect } from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import { Button } from 'react-bootstrap';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import '../../../styles/PDFView.css';
import '../../../styles/PreviewRender.css';
import { API_URL } from '../../../utils/constants';


const PreviewRender = (props) => {
    const { preview } = props;
    const [file, setFile] = useState("");


    useEffect(() => {
        //console.log('attempting preview render');
        if (preview !== null && preview !== undefined && preview.file_path !== undefined) {
            setFile(API_URL + "/" + preview.file_path.slice(5));
        }
    }, [preview]);

    return (
        <React.Fragment>
            {preview !== null && preview !== undefined && Object.keys(preview).length > 0
                ?
                <>
                    <div className="center-video">
                        <div className="App">
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                                <div id="pdfviewer">
                                    <Viewer fileUrl={file} toolbar="0" />
                                </div>
                            </Worker>
                        </div>
                    </div>
                </>
                :
                <p className="italicize text-center">No preview selected</p>
            }
        </React.Fragment>
    )
}

export default PreviewRender;