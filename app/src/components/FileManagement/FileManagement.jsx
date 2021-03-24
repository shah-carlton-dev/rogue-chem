import React from 'react';
import FileUpload from './FileUpload';
import VideoUpload from './VideoUpload';
import '../../styles/FileManagement.scss';
import {NavLink} from 'react-router-dom';
const FileManagement = (props) => {

    return (
        <React.Fragment>
            <h1>File Management</h1>
            <div className="header">
                <nav>
                    <NavLink activeClassName="active" to="/fileUpload">
                        File Upload
                    </NavLink>
                    <NavLink activeClassName="active" to="/videoUpload">
                        Video Upload
                    </NavLink>
                </nav>
            </div>            
            <div className="container">
                <FileUpload></FileUpload>
                <VideoUpload></VideoUpload>
            </div>
        </React.Fragment>
    );
};

export default FileManagement;