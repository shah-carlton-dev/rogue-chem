import React from "react";
import '../../../styles/FilePreview.css';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import '../../../styles/PDFView.css';

const FilesList = (props) => {
    const { files, setPreviewChange, sectionName } = props;
    //console.log(files);
    return (
        files.length === 0 ?
            <p className="italicize text-center">No files in this folder</p> :
            <dl>
                <h5> {sectionName}</h5>
                {files.map(file =>
                    <div className="file-description" key={file._id}>
                        <dt><button className="btn btn-link" id={file._id} onClick={(e) => { setPreviewChange(e.target.id) }}>{file.title}</button></dt>
                        <dd> <p>{file.description}</p> </dd>

                    </div>
                )}
            </dl>
    )
}

export default FilesList;