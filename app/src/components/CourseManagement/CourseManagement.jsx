import React, { useState, useEffect } from 'react';
import Axios from "axios";
import CourseBlock from "./CourseBlock.jsx";
import SectionBlock from "./SectionBlock.jsx";
import FileDisplay from "./FileDisplay.jsx"
import CourseCreateModal from "./CourseCreateModal";
import SectionCreateModal from "./SectionCreateModal";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { API_URL } from '../../utils/constants';
import "../../styles/CourseManagement.css";
import {useHistory} from "react-router-dom";

const CourseManagement = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

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
        try {
            await Axios.get(API_URL + "/courses/sections/" + activeCourse._id).then(res => {
                setSections(res.data);
            });
        } catch (err) { }
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
            await Axios.post(API_URL + "/courses/createSection", data).then(res => {
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
            setSections(courses.filter(c => c._id === activeCourse._id)[0].sections);
            setSectionUpdate(!sectionUpdate);
            setCourseUpdate(!courseUpdate);
        });
    }

    const removeSection = async (id) => {
        const data = {
            "section_id": id,
            "course_id": activeCourse._id
        }
        const url = API_URL + "/courses/removeSection";
        await Axios.put(url, data).then(res => setSections(res.data));
        setSectionUpdate(!sectionUpdate);
        setCourseUpdate(!courseUpdate);
    }

    const addExisting = async (section_id) => {
        const data = {
            "section_id": section_id,
            "course_id": activeCourse._id
        }
        const url = API_URL + "/courses/addSection";
        await Axios.put(url, data).then(res => setSections(res.data)).then(() => {
            setSectionUpdate(!sectionUpdate);
            setCourseUpdate(!courseUpdate);
        });
        setShowCreateSection(false);
    }

    return (<>
        <Container>
            <h1>Course Management</h1>
            {
                (showCourseList) ? <>
                    <Button variant="link" onClick={() => setShowCreateCourse(true)}>create new course</Button>
                    <h4>Courses</h4>
                    <hr/>
                    <p>Be careful deleting courses. This action is permanent and they will not be recoverable.</p>
                    <Row>
                        {
                            courses.length === 0 ? (<>
                                <Col className="text-center mt-5">
                                    <p className="italicize">No courses here. Start by creating one!</p>
                                </Col>
                            </>) : (<>
                                {courses.map(c => <Col className="py-2" key={c._id}><CourseBlock course={c} clickHandler={showSections} deleteHandler={deleteCourse} /></Col>)}
                            </>)
                        }
                    </Row>

                </> : <></>
            }
            {
                (showSectionList) ? <>
                    <Button variant="link" onClick={backToCourses}>back to courses</Button> / <Button variant="link" onClick={() => setShowCreateSection(true)}>add a core folder</Button>
                    <h4 className="">{activeCourse.name + " / "}Core Folders</h4>
                    <hr/>
                    <p>Be careful deleting folders - it will be permanently deleted across all courses. Use the remove button to unassociate it from the current course.</p>
                    <Row>
                        {sections.length === 0 ? <Col className="text-center mt-5"><p className="italicize">No existing core folders. Go ahead and create one!</p> </Col> : sections.map(s => <Col className="py-2" key={s._id} xs={4}><SectionBlock section={s} clickHandler={showFiles} deleteHandler={deleteSection} removeHandler={removeSection} /></Col>)}
                    </Row> </> :
                    <></>
            }
            {
                (showFileList) ? <>
                    <Button variant="link" onClick={backToSections}>back to core folders</Button>
                    <h4>{activeCourse.name + " / " + activeSection.name + " / "}Files</h4>
                    <hr/>
                    <FileDisplay section={activeSection} ></FileDisplay>
                </> :
                    <></>
            }
        </Container>
        <Modal show={showCreateCourse}>
            <CourseCreateModal handleClose={handleCourseClose} />
        </Modal>
        <Modal show={showCreateSection}>
            <SectionCreateModal handleClose={handleSectionClose} sections={sections} addHandler={addExisting} />
        </Modal>
    </>
    );
};

export default CourseManagement;