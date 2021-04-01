import React from 'react';
import { Card, Button } from "react-bootstrap";

const CourseBlock = (props) => {


    return (
        <Card style={{ width: '18rem' }} key={props.course._id}>
            <Card.Body>
                <Card.Title>{props.course.name}</Card.Title>
                <Card.Text>
                    {props.course.description}
                </Card.Text>
                <div className="course-buttons text-center">
                    <Button className="mr-5" variant="outline-dark" onClick={() => props.clickHandler(props.course._id)}>Manage</Button>
                    <Button className="" variant="outline-danger" onClick={() => props.deleteHandler(props.course._id)}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CourseBlock;