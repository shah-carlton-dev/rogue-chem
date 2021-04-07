import React, { useContext } from "react";
import {Row, Col} from "react-bootstrap";
import UserContext from "../../context/UserContext.js";
import AdminCourses from "../AdminDash/AdminCourses.jsx";
import UserCourses from "../UserDash/Courses/UserCourses.jsx";

const Courses = (props) => {
    const { userData, setUserData } = useContext(UserContext);

    return (<>
        <Row className="top-nav">
            <Col className="p-0 text-center">
                <p>dashboard nav links, search, etc will be here</p>
            </Col>
        </Row>
        {userData.user.admin ? (
            <AdminCourses />
        ) : (
            <UserCourses />
        )}
    </>)
}

export default Courses;