import React, { useState, useEffect } from 'react';
import Axios from "axios";
import "../../styles/FileDisplay.css";
import FileLibrary from "./FileLibrary.jsx"
import FileList from "./FileList.jsx"
import VideoLibrary from './VideoLibrary.jsx';
import VideoList from './VideoList.jsx';
import { API_URL } from "../../utils/constants.js";
import { Container, Row, Col } from 'react-bootstrap';

const FileDisplay = (props) => {
    const { section } = props;
    const [files, setFiles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [fileUpdate, setFileUpdate] = useState(false);
    const [videoUpdate, setVideoUpdate] = useState(false);

    useEffect(() => {
        getFiles();
    }, [fileUpdate]);

    useEffect(() => {
        getVideos();
    }, [videoUpdate]);

    const getFiles = async () => {
        await Axios.get(API_URL + "/courses/files/" + section._id).then(res => setFiles(res.data));
    }
    
    const getVideos = async () => {
        await Axios.get(API_URL + "/courses/videos/" + section._id).then(res => setVideos(res.data));
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

    const addVideo = async (id) => {
        try {
            const req = { "video_id": id, "section_id": section._id }
            await Axios.put(API_URL + "/courses/addVideo", req).then(res => {
                setVideos(res.data);
                setVideoUpdate(!videoUpdate);
            });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data);
            }
        }
    }

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

    const removeVideo = async (id) => {
        try {
            const req = { "video_id": id, "section_id": section._id } 
            await Axios.put(API_URL + "/courses/removeVideo", req).then(res => {
                setVideos(res.data);
                setVideoUpdate(!videoUpdate);
            });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data);
            }
        }
    }

    return (<>
        <Container>
            <Row>
                <Col lg={6}>
                    <h5>Existing files </h5>
                    {files.length === 0
                        ? <div className="text-center my-3"><p className="italicize"> No existing files in this folder. Add them from below. </p></div>
                        : <FileList files={files} removeFile={(id) => removeFile(id)}></FileList>
                    }
                    <hr />
                    <h5>Add files </h5>
                    <FileLibrary files={files} addFile={(id) => addFile(id)} ></FileLibrary>
                </Col>
                <Col lg={6}>
                    <h5>Existing Videos </h5>
                    {videos.length === 0
                        ? <div className="text-center my-3"><p className="italicize"> No existing videos in this folder. Add them from below. </p></div>
                        : <VideoList videos={videos} removeVideo={(id) => removeVideo(id)}></VideoList>
                    }
                    <hr />
                    <h5>Add videos </h5>
                    <VideoLibrary videos={videos} addVideo={(id) => addVideo(id)} ></VideoLibrary>
                </Col>
            </Row>
        </Container>

    </>);
};

export default FileDisplay;