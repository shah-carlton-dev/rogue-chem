import React, { useState, useEffect } from 'react';
import Axios from "axios";
import "../../styles/FileDisplay.css";
import FileLibrary from "./FileLibrary.jsx"
import FileList from "./FileList.jsx"
import { API_URL } from "../../utils/constants.js";

const FileDisplay = (props) => {
    const { course, section, files, setFiles } = props;

    const addFile = async (id) => {
        try {
            const req = { "file_id": id, "section_id": section._id }
            await Axios.put(API_URL + "/courses/addFile", req).then(res => setFiles(res.data));
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data);
            }
        }
    };

    const removeFile = async (id) => {
        try {
            const req = { "file_id": id, "section_id": section._id }
            await Axios.put(API_URL + "/courses/removeFile", req).then(res => setFiles(res.data));
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data);
            }
        }
    };

    return (<>
        <h5>Existing files </h5>
        { files.length === 0
            ? <p> No existing files in this folder </p>
            : <FileList files={files} removeFile={(id) => removeFile(id)}></FileList>
        }
        <br></br>
        <h5>Add files </h5>
        <FileLibrary addFile={(id) => addFile(id)} files={files}></FileLibrary>
    </>);
};

export default FileDisplay;