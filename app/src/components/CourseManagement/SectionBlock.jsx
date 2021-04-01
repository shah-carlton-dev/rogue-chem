import React from "react";
import { Card, Button } from "react-bootstrap";

const SectionBlock = (props) => {
    return (
        <Card style={{ width: '20rem' }} key={props.section._id}>
            <Card.Body>
                <Card.Title>{props.section.name}</Card.Title>
                <Card.Text>
                    {props.section.description}
                </Card.Text>
                <div className="section-buttons text-center">
                    <Button className="mr-2" variant="outline-dark" onClick={() => props.clickHandler(props.section._id)}>Manage</Button>
                    <Button className="mr-2" variant="outline-warning" onClick={() => props.removeHandler(props.section._id)}>Remove</Button>
                    <Button className="" variant="outline-danger" onClick={() => props.deleteHandler(props.section._id)}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SectionBlock;