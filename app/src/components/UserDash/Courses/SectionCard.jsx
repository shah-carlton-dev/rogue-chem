import React from "react";
import { Card } from "react-bootstrap";
import '../../../styles/SectionCard.css';
const SectionCard = (props) => {
  const { section, setSectionChange } = props;
  return (
    <Card className="h-100 ml-4" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{section.name}</Card.Title>
        <Card.Text>
          {section.description}
        </Card.Text>
        <Card.Link href="#" onClick={() => setSectionChange(section._id)}>View Files</Card.Link>
      </Card.Body>
    </Card>)
}

export default SectionCard;