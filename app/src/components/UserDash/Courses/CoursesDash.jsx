import React from "react";
import CourseCard from "./CourseCard.jsx";
import {Row, Col} from "react-bootstrap";

const CoursesDash = (props) => {
    const {retrieving, isError, courseData, isSelected} = props.things;
    let index = 0;
    return (<>
        {retrieving
            ? (<div className="dash-loader"></div>)
            : isError > 0 
                ? (isError===1 
                        ? (<div className="coursedata-error italicize">Error retrieving courses. Try again later.</div>)
                        : (<div className="coursedata-message italicize">You don't have any courses. Start by purchasing one!</div>))
                : (<Row>{courseData.map(course => 
                    <Col><CourseCard course={course} isSelected={isSelected} index={index++}/></Col>
                )}</Row>)
        }
    </>)
}

export default CoursesDash