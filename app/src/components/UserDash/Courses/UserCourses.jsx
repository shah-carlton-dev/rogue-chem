import React, { useEffect, useContext, useState } from "react";
import ResizePanel from "react-resize-panel";
import '../../../styles/UserCourses.css';
import CoursesDash from './CoursesDash.jsx';
import FilesList from './FilesList.jsx';
import Preview from './Preview.jsx';
import PreviewRender from './PreviewRender.jsx';
import { API_URL } from '../../../utils/constants.js';
import Axios from "axios";
import { Col } from "react-bootstrap";

const UserCourses = ({ course}) => {
    // const history = useHistory();
    // sessionStorage.clear();
    // sessionStorage.setItem("last-route", history.location.pathname); doesn't work, forces all reloads to end up here

    const [retrieving, setRetrieving] = useState(true);
    const [sections, setSections] = useState([]);
    const [sectionChange, setSectionChange] = useState(0);
    const [files, setFiles] = useState([]);
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
    }, [previewChange])

    const getPreview = async (id) => {
        const url = API_URL + '/getFile/' + id;
        console.log("getting file for preview");
        try {
            if (id !== 0) {
                await Axios.get(url).then((res) => {
                    console.log(res.data);
                    setPreview(res.data);
                })
            }
        } catch { }
    }

    const getFileData = async (id) => {
        const url = API_URL + '/courses/files/' + id;
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
            <ResizePanel direction="s" handleClass="customHandle" borderClass="customResizeBorder">
                <div className='body'>
                    <div className='header panel container' style={{height: '33vh'}}>
                        <CoursesDash things={{ courseName, sections, setSectionChange }} />
                    </div>
                </div>
            </ResizePanel>
            <div className='body fill-bottom'>
                <Col xs={4}>
                    <div className='content panel right-border'>
                        <FilesList files={files} setPreviewChange={setPreviewChange} sectionName={sectionName} />
                    </div>
                </Col>
                <Col>
                    <div className='content panel right-border'>
                        <Preview preview={preview} />
                    </div>
                </Col>
                <Col className="preview-render">
                    <div className='content panel preview-render'>
                        <PreviewRender preview={preview} />
                    </div>
                </Col>
            </div>
        </div>
    </>)
}

export default UserCourses;