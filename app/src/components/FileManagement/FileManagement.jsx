import React from 'react';
import '../../styles/FileManagement.scss';
import FileUpload from './FileUpload';
import {NavLink} from 'react-router-dom';
const FileManagement = (props) => {

    return (
        <React.Fragment>
            <FileUpload></FileUpload>            
        </React.Fragment>
    );
};

export default FileManagement;