import React from "react";
import { Card } from "react-bootstrap";

const CourseCard = (props) => {
    const { course } = props;
    return (<>
        {course.name}
    </>)
}

export default CourseCard;