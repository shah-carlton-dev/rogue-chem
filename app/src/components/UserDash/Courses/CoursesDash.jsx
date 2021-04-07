import React from "react";
import CourseCard from "./CourseCard.jsx";
import {Row, Col} from "react-bootstrap";

const CoursesDash = (props) => {
    const {retrieving, isError, courseData, setCourseChange} = props.things;
    
    return (<>
        {retrieving
            ? (<div className="dash-loader"></div>)
            : isError > 0 
                ? (isError===1 
                        ? (<div className="coursedata-error italicize text-center pt-3">Error retrieving courses. Try again later.</div>)
                        : (<div className="coursedata-message italicize text-center pt-3">You don't have any courses. Start by purchasing one!</div>))
                : (<Row className="pt-3">{courseData.map(course => 
                    <Col><CourseCard course={course} setCourseChange={setCourseChange}/></Col>
                )}</Row>)
        }
    </>)
}

export default CoursesDash