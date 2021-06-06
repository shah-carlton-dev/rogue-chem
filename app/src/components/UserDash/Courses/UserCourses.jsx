import React, { useEffect, useContext, useState } from "react";
import ResizePanel from "react-resize-panel";
import '../../../styles/UserCourses.css';
import CourseInfo from './CourseInfo.jsx';
import FolderInfo from './FolderInfo.jsx';
import FileInfo from './FileInfo.jsx';
import PreviewRender from './PreviewRender.jsx';
import { API_URL } from '../../../utils/constants.js';
import Axios from "axios";
import { Col } from "react-bootstrap";
import UserContext from "../../../context/UserContext.js";
import { createPromiseCapability } from "pdfjs-dist";

// component containing entire user dashboard (minus dashboard nav)

let recent = { course: null, folder: null, file: null };

const UserCourses = (props) => {
    const [folders, setFolders] = useState([]);
    const [folderChange, setFolderChange] = useState(0);
    const [files, setFiles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [previewChange, setPreviewChange] = useState(0);
    const [preview, setPreview] = useState({});
    const [folderName, setFolderName] = useState("");

    const { currState, setCurrCourse, setCurrFolder, setCurrFile, lastState } = props;

    console.log(props)

    useEffect(() => {
        if (currState?.currCourse?.id !== undefined) getSectionData(currState.currCourse.id);
    }, [currState?.currCourse?.id]);

    useEffect(() => {
        if (currState?.currFolder?.id !== undefined) getFileData(currState.currFolder.id);
    }, [currState?.currFolder?.id]);

    useEffect(() => {
        if (currState?.currFile?.id !== undefined) getPreview(currState.currFile.id);
    }, [currState?.currFile?.id]);

    const getPreview = async (id) => {
        const url = API_URL + '/getFile/' + id;
        try {
            if (id !== 0 && id !== undefined) {
                await Axios.get(url).then((res) => {
                    setPreview(res.data);
                    setCurrFile(res.data._id, res.data.title)
                })
            }
        } catch { }
    }

    const getFileData = async (id) => {
        const url = API_URL + '/courses/files/' + id;
        const vURL = API_URL + '/courses/videos/' + id;
        try {
            if (folders !== undefined) {
                setFolderName(folders.filter(s => s._id === id)[0].name);
            }
        } catch { }
        try {
            if (id !== 0) {
                await Axios.get(url).then((res) => {
                    setFiles(res.data);
                    if (res.data[0])
                        setCurrFolder(res.data[0]._id, res.data[0].title);
                })
            }
        } catch { }
        try { // now, we yoink the video data
            if (id !== 0) {
                await Axios.get(vURL).then((res) => {
                    setVideos(res.data);
                    if (res.data[0] && previewChange !== 0) // if there is a video, and preview isn't a PDF set video as preview
                        setCurrFolder(res.data[0]._id, res.data[0].title);
                })
            }
        } catch { }
    }

    const getSectionData = async (id) => {
        const url = API_URL + '/courses/sections/' + id;
        try {
            if (id !== undefined) {
                await Axios.get(url).then((res) => {
                    setFolders(res.data);
                    setCurrFolder(res.data[0]._id, res.data[0].name);
                })
            }
        } catch { }
    }

    return (<>
        <div className='usercourses-container'>
            <ResizePanel direction="s" handleClass="customHandle" borderClass="customResizeBorder" style={{ height: '40vh' }}>
                <div className='content-area'>
                    <div className='header panel container'>
                        {
                            currState?.currCourse?.name !== undefined ?
                                <CourseInfo folders={folders} currState={currState} setCurrFolder={setCurrFolder} />
                                : <p>loading...</p>
                        }
                    </div>
                </div>
            </ResizePanel>
            <div className='content-area'>
                <Col xs={4}>
                    <div className='content panel right-border'>
                        {
                            currState?.currCourse?.name !== undefined && currState?.currFolder?.name !== undefined ?
                                <FolderInfo files={files} setPreviewChange={setPreviewChange} sectionName={currState.currFolder.name} courseName={currState.currCourse.name} setRecent={setCurrFolder} />
                                : <p>loading</p>
                        }
                    </div>
                </Col>
                <Col xs={4}>
                    <div className='content panel right-border'>
                        <FileInfo preview={preview} setRecent={setCurrFile} />
                        {/* <FileInfo /> */}
                    </div>
                </Col>
                <Col xs={4} className="preview-render">
                    <div className='content panel preview-render'>
                        <PreviewRender preview={preview} />
                        {/* <PreviewRender /> */}
                    </div>
                </Col>
            </div>
        </div>
    </>)
}

export default UserCourses;