import React from 'react';
import FileUpload from './FileUpload';
import FileLibrary from './FileLibrary';
import '../../styles/FileManagement.scss';
const FileManagement = (props) => {

    return (
        <React.Fragment>
            <h1>File Management</h1>
            <div className="container">
                <FileUpload></FileUpload>

            </div>
            
        </React.Fragment>
    );
};

export default FileManagement;