import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import CourseBlock from "./CourseBlock.jsx";
import SectionBlock from "./SectionBlock.jsx";
import FileDisplay from "./FileDisplay.jsx"
import CourseCreateModal from "./CourseCreateModal";
import SectionCreateModal from "./SectionCreateModal";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
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
    const [showCreateCourse, setShowCreateCourse] = useState(false);
    const [showCreateSection, setShowCreateSection] = useState(false);
    const [courseUpdate, setCourseUpdate] = useState(false);
    const [sectionUpdate, setSectionUpdate] = useState(false);

    useEffect(() => {
        getCourses();
    }, [courseUpdate]);

    useEffect(() => {
        getSections();
    }, [sectionUpdate]);

    const getCourses = async () => {
        await Axios.get(API_URL + "/courses/").then((res) => {
            setCourses(res.data);
        });
    }

    const getSections = async () => {
        await Axios.get(API_URL + "/courses/sections/" + activeCourse._id).then(res => {
            setSections(res.data);
        });

    }

    const showSections = async (id) => {
        setSectionUpdate(!sectionUpdate);
        setActiveCourse(courses.filter(c => c._id === id)[0]);
        setShowCourseList(false);
        setShowSectionList(true);
    }

    const showFiles = async (id) => {
        setActiveSection(sections.filter(s => s._id === id)[0]);
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

    const handleCourseClose = async (save, data) => {
        if (save) {
            await Axios.post(API_URL + "/courses/create", data).then(res => {
                setCourses(res.data);
                setCourseUpdate(!courseUpdate);
            });
        };
        setShowCreateCourse(false);
    }

    const handleSectionClose = async (save, data) => {
        if (save) {
            const { name, description } = data;
            data = {
                "course_id": activeCourse._id,
                name,
                description
            }
            await Axios.post(API_URL + "/courses/addSection", data).then(res => {
                setSections(res.data.filter(d => d.course_id === activeCourse._id));
                setSectionUpdate(!sectionUpdate);
            });
        };
        setShowCreateSection(false);
    }

    const deleteCourse = async (id) => {
        await Axios.delete(API_URL + "/courses/delete/" + id).then(res => {
            setCourses(res.data);
            setCourseUpdate(!courseUpdate);
        });
    }

    const deleteSection = async (id) => {
        await Axios.delete(API_URL + "/courses/deleteSection/" + id).then(res => {
            setCourses(res.data);
            setSections(courses.filter(c => c._id == activeCourse._id)[0].sections);
            setSectionUpdate(!sectionUpdate);
            setCourseUpdate(!courseUpdate);
        });
    }

    return (<>
        <Container>
            <h1>Course Management</h1>
            {
                (showCourseList) ? <>
                    <Button variant="link" onClick={() => setShowCreateCourse(true)}>create new course</Button>
                    <h4>Courses</h4>
                    <h6>Be careful deleting courses. It is permanent and they will not be recoverable.</h6>
                    <Row>
                        {courses.map(c => <Col className="py-2" key={c._id}><CourseBlock course={c} clickHandler={showSections} deleteHandler={deleteCourse} /></Col>)}
                    </Row> </> :
                    <></>
            }
            {
                (showSectionList) ? <>
                    <Button variant="link" onClick={backToCourses}>back to courses</Button> / <Button variant="link" onClick={() => setShowCreateSection(true)}>create new core folder</Button>
                    <h4 className="">{activeCourse.name + " / "}Core Folders</h4>
                    <Row>
                        {sections.length === 0 ? <p>No existing core folders</p> : sections.map(s => <Col className="py-2" key={s._id}><SectionBlock section={s} clickHandler={showFiles} deleteHandler={deleteSection} /></Col>)}
                    </Row> </> :
                    <></>
            }
            {
                (showFileList) ? <>
                    <Button variant="link" onClick={backToSections}>back to core folders</Button>
                    <h4>{activeCourse.name + " / " + activeSection.name + " / "}Files</h4>
                    <FileDisplay course={activeCourse} section={activeSection} ></FileDisplay>
                </> :
                    <></>
            }
        </Container>
        <Modal show={showCreateCourse}>
            <CourseCreateModal handleClose={handleCourseClose} />
        </Modal>
        <Modal show={showCreateSection}>
            <SectionCreateModal handleClose={handleSectionClose} course={activeCourse} />
        </Modal>
    </>
    );
};

export default CourseManagement;