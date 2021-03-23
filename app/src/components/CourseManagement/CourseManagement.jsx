import React, { useState, useEffect } from 'react';
import Axios from "axios";
import CourseBlock from "./CourseBlock.jsx";
import SectionBlock from "./SectionBlock.jsx";
import FileDisplay from "./FileDisplay.jsx"
import { Container, Row, Col, Button } from "react-bootstrap";
import { API_URL } from '../../utils/constants';
import "../../styles/CourseManagement.css";

const CourseManagement = (props) => {
    const [courses, setCourses] = useState([]);
    const [showCourseList, setShowCourseList] = useState(true);
    const [showSectionList, setShowSectionList] = useState(false);
    const [showFileList, setShowFileList] = useState(false);
    const [activeCourse, setActiveCourse] = useState({});
    const [activeSection, setActiveSection] = useState({});
    const [sections, setSections] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getCoursesList();
    }, []);

    const getCoursesList = async () => {
        await Axios.get(API_URL + "/courses/").then((res) => setCourses(res.data));
    }

    const showSections = async (id) => {
        setActiveCourse(courses.filter(c => c._id === id)[0]);
        await Axios.get(API_URL + "/courses/sections/" + id).then(res => setSections(res.data));
        setShowCourseList(false);
        setShowSectionList(true);
    }

    const showFiles = async (id) => {
        setActiveSection(sections.filter(s => s._id === id)[0]);
        await Axios.get(API_URL + "/courses/files/" + id).then(res => setFiles(res.data));
        setShowSectionList(false);
        setShowFileList(true);
    }

    const backToCourses = () => {
        setShowCourseList(true);
        setShowSectionList(false);
        setShowFileList(false);
        setActiveCourse({});
        setActiveSection({});
    }

    const backToSections = () => {
        setShowCourseList(false);
        setShowSectionList(true);
        setShowFileList(false);
        setActiveSection({});
    }

    return (
        <Container>
            <h1>Course Management</h1>
            {
                (showCourseList) ? <>
                    <h4>Courses</h4>
                    <Row>
                        {courses.map(c => <Col className="pb-2" key={c._id}><CourseBlock course={c} clickHandler={showSections} /></Col>)}
                    </Row> </> :
                    <></>
            }
            {
                (showSectionList) ? <>
                    <Button variant="link" onClick={backToCourses}>back to courses</Button>
                    <h4>Core Folders</h4>
                    <Row>
                        {sections.length === 0 ? <p>No existing core folders</p> : <></>}
                        {sections.map(s => <Col className="pb-2" key={s._id}><SectionBlock section={s} clickHandler={showFiles} /></Col>)}
                    </Row> </> :
                    <></>
            }
            {
                (showFileList) ? <>
                    <Button variant="link" onClick={backToSections}>back to core folders</Button>
                    <h4>Files</h4>
                    <FileDisplay course={activeCourse} section={activeSection} files={files} setFiles={setFiles}></FileDisplay>
                </> :
                    <></>
            }

        </Container>
    );
};

export default CourseManagement;