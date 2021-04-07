import React from "react";
import '../../../styles/FilePreview.css';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import '../../../styles/PDFView.css';

const FilesList = (props) => {
    const { files, setPreviewChange } = props;
    //console.log(files);
    return (
        files.length === 0 ?
            <p className="italicize text-center">No files in this folder</p> :
            <dl> {files.map(file =>
                <>
                    <div className="file-description">
                        <dt><button className="btn btn-link" id={file._id} onClick={(e) => { setPreviewChange(e.target.id) }}>{file.title}</button></dt>
                        <dd> <p>{file.description} </p></dd>

                    </div>
                </>
            )}</dl>



    )
}

export default FilesList;