import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../../context/UserContext.js";
import { useHistory } from "react-router-dom";
import ResizePanel from "react-resize-panel";
import '../../../styles/UserCourses.css';
import CoursesDash from './CoursesDash.jsx';
import FoldersList from './FoldersList.jsx';
import FilesList from './FilesList.jsx';
import Preview from './Preview.jsx';
import { API_URL } from '../../../utils/constants.js';
import Axios from "axios";
import { Col } from "react-bootstrap";

const UserCourses = ({ course }) => {
    // const history = useHistory();
    // sessionStorage.clear();
    // sessionStorage.setItem("last-route", history.location.pathname); doesn't work, forces all reloads to end up here

    const { userData, setUserData } = useContext(UserContext);
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
        try {
            await Axios.get(url).then((res) => {
                setPreview(res.data);
            })
        } catch { }
    }

    const getFileData = async (id) => {
        const url = API_URL + '/courses/files/' + id;
        try {
            if (sections !== undefined) setSectionName(sections.filter(s => s._id === id)[0].name);
        } catch { }
        try {
            await Axios.get(url).then((res) => {
                setFiles(res.data);
                setPreviewChange(res.data[0]._id);
            })
        } catch { }
    }

    const getSectionData = async (id) => {
        console.log(id);
        const url = API_URL + '/courses/sections/' + id;
        try {
            await Axios.get(url).then((res) => {
                // console.log(res); res is good, need to show folders and update file list acccordingly a
                setSections(res.data);
                setSectionChange(res.data[0]._id);
            })
        } catch { }
    }

    return (<>
        <div className='container'>
            <ResizePanel direction="s" handleClass="customHandle" borderClass="customResizeBorder">
                <div className='body'>
                    <div className='header panel'>
                        <CoursesDash things={{ courseName, sections, setSectionChange }} />
                    </div>
                </div>
            </ResizePanel>
            <div className='body fill-bottom'>
                <Col xs={4}>
                    <div className='content panel right-border'>
                        {console.log(sections)}
                        <FilesList files={files} setPreviewChange={setPreviewChange} sectionName={sectionName} />
                    </div>
                </Col>
                <Col>
                    <div className='content panel right-border'>
                        <Preview preview={preview} />
                    </div>
                </Col>
                <Col>
                    <div className='content panel'>
                        description whatnot
                    </div>
                </Col>
            </div>
        </div>
    </>)
}

export default UserCourses;