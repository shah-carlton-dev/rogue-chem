import React from "react";
import { Card, Button } from "react-bootstrap";

const SectionBlock = (props) => {
    return (
        <Card style={{ width: '18rem' }} key={props.section._id}>
            <Card.Body>
                <Card.Title>{props.section.name}</Card.Title>
                <Card.Text>
                    {props.section.description}
                </Card.Text>
                <div className="section-buttons">
                    <Button className="mr-5" variant="outline-dark" onClick={() => props.clickHandler(props.section._id)}>Manage</Button>
                    <Button className="" variant="outline-danger" onClick={() => props.deleteHandler(props.section._id)}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SectionBlock;