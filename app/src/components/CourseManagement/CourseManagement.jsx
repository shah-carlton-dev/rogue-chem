import React, { useState, useEffect } from 'react';
import Axios from "axios";
import CourseBlock from "./CourseBlock.jsx";
import { Container, Row, Col } from "react-bootstrap";

const CourseManagement = (props) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCoursesList();
    }, []);

    const getCoursesList = async () => {
        await Axios.get("http://localhost:3030/courses/").then((res) => setCourses(res.data));
    }

    return (
        <>
            <h1>Course Management</h1>
            <Container>
                <Row>
                    {courses.map(c => <Col><CourseBlock course={c} /></Col>)}
                </Row>
            </Container>
        </>
    );
};

export default CourseManagement;