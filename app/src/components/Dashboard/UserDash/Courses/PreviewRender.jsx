import React from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import '../../../../styles/PDFView.css';
import '../../../../styles/PreviewRender.css';
import { API_URL } from '../../../../utils/constants';
// import { Document, Page } from 'react-pdf'; this might be the answer to our problems
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';



const PreviewRender = ({ preview }) => {

    return (
        <React.Fragment>
            {preview !== null && preview !== undefined && Object.keys(preview).length > 0
                ?
                <>
                    <div className="center-video">
                        <div className="App">
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.min.js">
                                {/* <div id="pdfviewer">
                                    <Viewer fileUrl={API_URL + "" + preview.file_path.slice(5)} toolbar="0" defaultScale={.6}/>
                                </div> */}
                            </Worker>
                            <p>pdf view will eventually be here</p>
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