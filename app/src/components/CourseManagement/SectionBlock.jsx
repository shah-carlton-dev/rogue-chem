import React from "react";
import { Card, Button } from "react-bootstrap";

const SectionBlock = (props) => {
    return (
        <Card style={{ width: '18rem' }} key={props.section._id}>
            {console.log(props)}
            <Card.Body>
                <Card.Title>{props.section.name}</Card.Title>
                <Card.Text>
                    {props.section.description}
                </Card.Text>
                <Button variant="outline-dark" onClick={() => props.clickHandler(props.section._id)}>Manage</Button>
            </Card.Body>
        </Card>
    )
}

export default SectionBlock;