import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const SectionsList = (props) => {

    const { allSections, handler, sections } = props;
    const [existingNotShown, setExistingNotShown] = useState([])

    useEffect(() => {
        setExistingNotShown(filterSections());
    }, [])

    const filterSections = () => {
        return allSections.filter(s => !sections.map(s => s._id).includes(s._id));
    }

    return (
        <Container>
            <Row>
                {
                    filterSections().length === 0 ? (
                        <Col className="text-center mt-3">
                            <p className="italicize">No folders yet. You can make one!</p>
                        </Col>
                    ) :
                        filterSections().map(section => (
                            <Col xs={4} key={section._id}>
                                <Card className="my-2">
                                    <Card.Body>
                                        <Card.Title>{section.name}</Card.Title>
                                        <Card.Subtitle>{section.description}</Card.Subtitle>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                        <Card.Link href="#" onClick={() => handler(section._id)}>add to course</Card.Link>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                }

            </Row>
        </Container>
    )
}

export default SectionsList;