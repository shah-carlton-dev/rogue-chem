import React, { useEffect, useContext, useState } from "react";
import ResizePanel from "react-resize-panel";
import '../../../../styles/UserCourses.css';
import CourseInfo from './CourseInfo.jsx';
import FolderInfo from './FolderInfo.jsx';
import FileInfo from './FileInfo.jsx';
import PreviewRender from './PreviewRender.jsx';
import { API_URL } from '../../../../utils/constants.js';
import Axios from "axios";
import { Col } from "react-bootstrap";

// component containing entire use dashboard (minus dashboard nav)

const UserCourses = ({ course }) => {
    // const history = useHistory();
    // sessionStorage.clear();
    // sessionStorage.setItem("last-route", history.location.pathname); doesn't work, forces all reloads to end up here

    const [retrieving, setRetrieving] = useState(true);
    const [sections, setSections] = useState([]);
    const [sectionChange, setSectionChange] = useState(0);
    const [files, setFiles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [previewChange, setPreviewChange] = useState(0);
    const [preview, setPreview] = useState({});
    const courseName = course.name;
    const courseId = course._id;
    const [sectionName, setSectionName] = useState("");

    useEffect(() => {
        getSectionData(courseId);
    }, [course]);

    useEffect(() => {
        getFileData(sectionChange);
    }, [sectionChange]);

    useEffect(() => {
        getPreview(previewChange);
    }, [previewChange]);

    useEffect(() => {
        console.log("mounted")
        console.log(courseName);
        // return function cleanup() {
        //     console.log("unmounted");
        //     console.log(courseName)
        //     console.log("section:");
        //     console.log(sectionChange);
        //     console.log("file:");
        //     console.log(previewChange);
        // }
    }, []);

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
        // now, we yoink the video data
        try {
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
            <ResizePanel direction="s" handleClass="customHandle" borderClass="customResizeBorder" style={{ height: '20vh' }}>
                <div className='content-area'>
                    <div className='header panel container'>
                        <CourseInfo things={{ courseName, sections, setSectionChange }} />
                    </div>
                </div>
            </ResizePanel>
            <div className='content-area'>
                <Col xs={4}>
                    <div className='content panel right-border'>
                        <FolderInfo files={files} setPreviewChange={setPreviewChange} sectionName={sectionName} />
                    </div>
                </Col>
                <Col xs={5} className="preview-render right-border">
                    <div className='content panel preview-render'>
                        <PreviewRender preview={preview} />
                    </div>
                </Col>
                <Col xs={3}>
                    <div className='content panel '>
                        <FileInfo preview={preview} />
                    </div>
                </Col>
                
            </div>
        </div>
    </>)
}

export default UserCourses;