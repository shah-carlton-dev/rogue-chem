import React from "react";
import '../../../styles/FileList.css';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import '../../../styles/PDFView.css';

const FolderInfo = (props) => {
    const { files, setPreviewChange, sectionName, courseName, setRecent } = props;
    // console.log(props)
    setRecent(sectionName);
    return (
        <div className="filelist-root">
            {
                files.length === 0 ?
                    <p className="italicize text-center">No files in this folder</p> :
                    <dl>
                        <h5> {sectionName}</h5>
                        <hr />
                        {files.map(file =>
                            <div className="file-description" key={file._id}>
                                <dt><button className="btn btn-link" id={file._id} onClick={(e) => { setPreviewChange(e.target.id) }}>{file.title}</button></dt>
                                <dd> <p>{file.description}</p> </dd>
                                <hr />
                            </div>
                        )}
                    </dl>
            }
        </div>
    )
}

export default FolderInfo;