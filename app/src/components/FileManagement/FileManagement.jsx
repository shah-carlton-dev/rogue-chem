import React from 'react';
import '../../styles/FileManagement.scss';
import { NavLink } from 'react-router-dom';
import { Container } from "react-bootstrap";
const FileManagement = (props) => {

    return (
        <React.Fragment>
            <Container>
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
            </Container>
        </React.Fragment>
    );
};

export default FileManagement;