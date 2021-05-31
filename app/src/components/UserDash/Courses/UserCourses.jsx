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

const UserCourses = ({ course, prev }) => {
    const { userData, setUserData } = useContext(UserContext);
    const [retrieving, setRetrieving] = useState(true);
    const [sections, setSections] = useState([]);
    const [sectionChange, setSectionChange] = useState(0);
    const [files, setFiles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [previewChange, setPreviewChange] = useState(0);
    const [preview, setPreview] = useState({});
    const courseName = course.name;
    const courseId = course._id;
    const prevFolder = prev.folder;
    const prevFile = prev.file;
    console.log(prev);
    const [sectionName, setSectionName] = useState("");

    const setRecentCourse = (c) => {
        recent.course = { name: course.name, _id: course._id };
    }
    const setRecentFolder = (f) => {
        recent.folder = { 'name': f, '_id': sectionChange };
    }
    const setRecentFile = (f) => {
        recent.file = f;
    }
    useEffect(() => {
        return async function cleanup() {
            console.log(userData)
            await Axios.post(
                API_URL + "/users/lastState",
                { userId: userData.user._id, recent }
            ).then(res => {
                if (res.data) {
                    // successful update
                } else {
                    // update failed
                }
            });
        }
    }, []);

    useEffect(() => {
        getSectionData(courseId);
    }, [course]);

    useEffect(() => {
        getFileData(sectionChange);
    }, [sectionChange]);

    useEffect(() => {
        getPreview(previewChange);
    }, [previewChange]);

    const getPreview = async (id) => {
        const url = API_URL + '/getFile/' + id;
        console.log("getting file for preview");
        try {
            if (id !== 0 && id !== undefined) {
                await Axios.get(url).then((res) => {
                    console.log(res.data);
                    setPreview(res.data);
                })
            }
        } catch { }
    }

    const getFileData = async (id) => {
        const url = API_URL + '/courses/files/' + id;
        const vURL = API_URL + '/courses/videos/' + id;
        console.log("getting file list");
        try {
            if (sections !== undefined) {
                setSectionName(sections.filter(s => s._id === id)[0].name);
            }
        } catch { }
        try {
            if (id !== 0) {
                await Axios.get(url).then((res) => {
                    setFiles(res.data);
                    if (res.data[0])
                        setPreviewChange(res.data[0]._id);
                })
            }
        } catch { }
        try { // now, we yoink the video data
            if (id !== 0) {
                await Axios.get(vURL).then((res) => {
                    setVideos(res.data);
                    if (res.data[0] && previewChange !== 0) // if there is a video, and preview isn't a PDF set video as preview
                        setPreviewChange(res.data[0].id);
                })
            }
        } catch { }
    }

    const getSectionData = async (id) => {
        const url = API_URL + '/courses/sections/' + id;
        try {
            if (id !== undefined) {
                await Axios.get(url).then((res) => {
                    setSections(res.data);
                    setSectionChange(res.data[0]._id);
                })
            }
        } catch { }
    }

    return (<>
        <div className='usercourses-container'>
            <ResizePanel direction="s" handleClass="customHandle" borderClass="customResizeBorder" style={{ height: '40vh' }}>
                <div className='content-area'>
                    <div className='header panel container'>
                        <CourseInfo things={{ courseName, sections, setSectionChange }} setRecent={setRecentCourse} />
                    </div>
                </div>
            </ResizePanel>
            <div className='content-area'>
                <Col xs={4}>
                    <div className='content panel right-border'>
                        <FolderInfo files={files} setPreviewChange={setPreviewChange} sectionName={sectionName} courseName={courseName} setRecent={setRecentFolder} />
                    </div>
                </Col>
                <Col xs={4}>
                    <div className='content panel right-border'>
                        <FileInfo preview={preview} setRecent={setRecentFile} />
                    </div>
                </Col>
                <Col xs={4} className="preview-render">
                    <div className='content panel preview-render'>
                        <PreviewRender preview={preview} />
                    </div>
                </Col>
            </div>
        </div>
    </>)
}

export default UserCourses;