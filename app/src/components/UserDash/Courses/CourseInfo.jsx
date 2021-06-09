import React from "react";
import FolderCard from "./FolderCard.jsx";
import { Row, Col, CardDeck } from "react-bootstrap";
import '../../../styles/CoursesDash.css';

const CourseInfo = (props) => {
    const {folders, currState, setCurrFolder} = props;

    return (
        <div className="topdash-wrapper" >
            <h5 className="ml-3 pt-3">{currState.currCourse.name}</h5>
            <Row className="pt-3">
                <CardDeck className="center-contents">{folders.map(folder =>
                    <Col key={folder._id}><FolderCard folder={folder} setCurrFolder={setCurrFolder} /></Col>
                )}</CardDeck>
            </Row>
        </div>
    )
}

export default CourseInfo;