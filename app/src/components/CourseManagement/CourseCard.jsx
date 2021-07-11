import React, { useState } from 'react';
import { Card, Button, Form } from "react-bootstrap";
import Axios from "axios";
import { API_URL } from "../../utils/constants.js";

const CourseCard = (props) => {
    const [publish, setPublish] = useState(props.course.published)

    const togglePublish = async (e) => {
        setPublish(!publish);
        Axios.post(API_URL + "/courses/publish/" + props.course._id).then(
            res => console.log(res)
        )
    }

    return (
        <Card style={{ width: '18rem' }} key={props.course._id}>
            <Card.Body>
                <Card.Title>{props.course.name}</Card.Title>

                <Card.Text>
                    {props.course.description}
                </Card.Text>
                <Form>
                    <Form.Group>
                        <Form.Check
                            label="Published"
                            defaultChecked={props.course.published}
                            onChange={e => togglePublish(e)}
                            checked={publish}
                        />
                    </Form.Group>
                </Form>
                <div className="course-buttons text-center">
                    <Button className="mr-5" variant="outline-dark" onClick={() => props.clickHandler(props.course._id)}>Manage</Button>
                    <Button className="" variant="outline-danger" onClick={() => props.deleteHandler(props.course._id)}>Delete</Button>
                </div>

            </Card.Body>
        </Card>
    );
};

export default CourseCard;