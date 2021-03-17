import React from 'react';
import FileUpload from './FileUpload';
import FileLibrary from './FileLibrary';
import '../../styles/FileManagement.css';
const FileManagement = (props) => {

    return (
        <React.Fragment>
            <h1>File Management</h1>
            <FileUpload></FileUpload>
            <FileLibrary></FileLibrary>
        </React.Fragment>
    );
};

export default FileManagement;