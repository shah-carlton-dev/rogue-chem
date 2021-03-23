import React, { useState, useEffect } from 'react';
import Axios from "axios";
import CourseBlock from "./CourseBlock.jsx";
import SectionBlock from "./SectionBlock.jsx";
import { Container, Row, Col, Button } from "react-bootstrap";
import { API_URL } from '../../utils/constants';

const CourseManagement = (props) => {
    const [courses, setCourses] = useState([]);
    const [showCourseList, setShowCourseList] = useState(true);
    const [showSectionList, setShowSectionList] = useState(false);
    const [showFileList, setShowFileList] = useState(false);
    const [activeCourse, setActiveCourse] = useState({});
    const [activeSection, setActiveSection] = useState({});
    const [sections, setSections] = useState([]);

    useEffect(() => {
        getCoursesList();
    }, []);

    const getCoursesList = async () => {
        await Axios.get(API_URL + "/courses/").then((res) => setCourses(res.data));
    }

    const showSections = async (id) => {
        setActiveCourse(courses.filter(c => c._id === id)[0]);
        await Axios.get(API_URL + "/courses/sections/"+id).then(res => setSections(res.data));
        setShowCourseList(false);
        setShowSectionList(true);
    }

    const showFiles = async (id) => {
        setActiveSection(sections.filter(s => s._id === id));
        const sectionId = activeCourse.sections.filter(s => s === id);
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
        setActiveCourse({});
        setActiveSection({});
    }

    return (
        <>
            <h1>Course Management</h1>
            <Container>
                {
                    (showSectionList) ?
                        <Button variant="link" onClick={backToCourses}>back</Button> :
                        <></>
                }
                {
                    (showCourseList) ?
                        <Row>
                            {courses.map(c => <Col key={c._id}><CourseBlock course={c} clickHandler={showSections} /></Col>)}
                        </Row> :
                        <></>
                }
                {
                    (showSectionList) ?
                        <Row>
                            {sections.map(s => <Col key={s._id}><SectionBlock section={s} clickHandler={showFiles} /></Col>)}
                        </Row> :
                        <></>
                }

            </Container>
        </>
    );
};

export default CourseManagement;