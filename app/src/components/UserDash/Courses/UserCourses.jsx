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

const UserCourses = (props) => {
    // const history = useHistory();
    // sessionStorage.clear();
    // sessionStorage.setItem("last-route", history.location.pathname); doesn't work, forces all reloads to end up here

    const { userData, setUserData } = useContext(UserContext);
    const [courseData, setCourseData] = useState([]);
    const [retrieving, setRetrieving] = useState(true);
    const [isError, setIsError] = useState(0);
    const [courseChange, setCourseChange] = useState(0);
    const [sections, setSections] = useState([]);
    const [sectionChange, setSectionChange] = useState(0);
    const [files, setFiles] = useState([]);
    const [previewChange, setPreviewChange] = useState(0);
    const [preview, setPreview] = useState({});

    useEffect(() => {
        getCourseData();
    }, []);

    useEffect(() => {
        getSectionData(courseChange);
    }, [courseChange]);

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
        } catch {}
        
    }

    const getFileData = async (id) => {
        const url = API_URL + '/courses/files/' + id;
        try {
            await Axios.get(url).then((res) => {
                setFiles(res.data);
                setPreviewChange(res.data[0]._id);
            })
        } catch {}
        
    }

    const getSectionData = async (id) => {
        const url = API_URL + '/courses/sections/' + id;
        await Axios.get(url).then((res) => {
            setSections(res.data);
            setSectionChange(res.data[0]._id);
        })
    }

    const getCourseData = async () => {
        const url = API_URL + '/courses/allData';
        try {
            await Axios.post(url, { ids: userData.user.courses }).then((res) => {
                console.log('course data');
                setRetrieving(false);
                if (res === 1) {
                    console.log("Error: " + res.data);
                    setIsError(2);
                }
                else if (res === 0) {
                    console.log("Error: user has no courses");
                    setIsError(1);
                } else {
                    console.log(res.data);
                    setCourseData(res.data);
                    setCourseChange(res.data[0]._id);
                }
            });
        } catch {
            setRetrieving(false);
            setIsError(2);
        }
        
    }
    // TODO: Handle no courses available!

    return (<>
        <div className='container'>
            <ResizePanel direction="s" handleClass="customHandle" borderClass="customResizeBorder">
                <div className='body'>
                    <div className='header panel'>
                        <CoursesDash things={{ retrieving, isError, courseData, setCourseChange }} />
                    </div>
                </div>
            </ResizePanel>
            <div className='body fill-bottom'>
                <Col xs={4}>
                    <div className='content panel right-border'>
                        <FoldersList data={sections} setSectionChange={setSectionChange} />
                    </div>
                </Col>
                <Col>
                    <div className='content panel right-border'>
                        <FilesList files={files} setPreviewChange={setPreviewChange} />
                    </div>
                </Col>
                <Col>
                    <div className='content panel'>
                        <Preview preview={preview} />
                    </div>
                </Col>
            </div>
        </div>
    </>)
}

export default UserCourses;