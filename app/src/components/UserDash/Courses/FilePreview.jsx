import React from "react";
import '../../../styles/FilePreview.css';
import {Button} from 'react-bootstrap'
const FilePreview = (props) => {
    const { files, setPreviewChange } = props;
    console.log(files);
    return (
        
        <dl> {files.map(file =>
            <>
                <div className="file-description">
                    <dt><button class="btn btn-link" id={file._id} onClick={(e) => {setPreviewChange(e.target.id)}}>{file.title}</button></dt>
                    <dd> <p>{file.description} </p></dd>
                </div>

            </>
        )}</dl>

    )
}

export default FilePreview;