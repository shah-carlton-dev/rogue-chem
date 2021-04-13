import React from "react";
import SectionCard from "./SectionCard.jsx";
import { Row, Col, CardDeck } from "react-bootstrap";
import '../../../styles/CoursesDash.css';

const CoursesDash = (props) => {
    const { courseName, sections, setSectionChange } = props.things;
    return (
        <div className="topdash-wrapper" >
            <h5 className="ml-3 pt-3">{courseName}</h5>
            <Row className="pt-3">
                <CardDeck className="center-contents">{sections.map(section =>
                    <Col key={section._id}><SectionCard section={section} setSectionChange={setSectionChange} /></Col>
                )}</CardDeck>
            </Row>
        </div>
        )
}

export default CoursesDash;