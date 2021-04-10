import React from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import '../../../styles/PDFView.css';
import '../../../styles/PreviewRender.css';
import { API_URL } from '../../../utils/constants';


const PreviewRender = ({ preview }) => {

    return (
        <React.Fragment>
            {preview !== null && preview !== undefined && Object.keys(preview).length > 0
                ?
                <>
                    <div className="center-video">
                        <div className="App">
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                                <div id="pdfviewer">
                                    <Viewer fileUrl={API_URL + "" + preview.file_path.slice(5)} toolbar="0" />
                                </div>
                            </Worker>
                        </div>
                    </div>
                </>
                :
                <p className="italicize text-center">No preview selected or invalid file object</p>
            }
        </React.Fragment>
    )
}

export default PreviewRender;