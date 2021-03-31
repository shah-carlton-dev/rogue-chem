import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const SectionsList = (props) => {

    const { sections, handler, course } = props;

    const filterSections = () => {
        return sections.filter(s => !course.sections.includes(s._id));
    }

    return (
        <Container>
            <Row>
                {filterSections().map(section => (
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
                ))}
            </Row>
        </Container>)
}

export default SectionsList;