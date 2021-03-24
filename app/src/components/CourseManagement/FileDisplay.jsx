import React, { useState, useEffect } from 'react';
import Axios from "axios";
import "../../styles/FileDisplay.css";
import FileLibrary from "./FileLibrary.jsx"
import FileList from "./FileList.jsx"
import { API_URL } from "../../utils/constants.js";

const FileDisplay = (props) => {
    const { course, section } = props;
    const [files, setFiles] = useState([]);
    const [fileUpdate, setFileUpdate] = useState(false);

    useEffect(() => {
        getFiles();
    }, [fileUpdate]);

    useEffect(() => {
        getFiles();
    }, []);

    const getFiles = async () => {
        await Axios.get(API_URL + "/courses/files/" + section._id).then(res => setFiles(res.data));
    }

    const addFile = async (id) => {
        try {
            const req = { "file_id": id, "section_id": section._id }
            await Axios.put(API_URL + "/courses/addFile", req).then(res => {
                setFiles(res.data);
                setFileUpdate(!fileUpdate);
            });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data);
            }
        }
    };

    const removeFile = async (id) => {
        try {
            const req = { "file_id": id, "section_id": section._id }
            await Axios.put(API_URL + "/courses/removeFile", req).then(res => {
                setFiles(res.data);
                setFileUpdate(!fileUpdate);
            });
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
        <FileLibrary files={files} addFile={(id) => addFile(id)} ></FileLibrary>
    </>);
};

export default FileDisplay;