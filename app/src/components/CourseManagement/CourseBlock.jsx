import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { Card, Button} from "react-bootstrap";

const CourseBlock = (props) => {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.course.name}</Card.Title>
                <Card.Text>
                    {props.course.description}
                </Card.Text>
                <Button variant="primary">Manage</Button>
            </Card.Body>
        </Card>
    );
};

export default CourseBlock;