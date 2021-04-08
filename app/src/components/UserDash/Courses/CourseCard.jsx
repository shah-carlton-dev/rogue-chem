import React from "react";
import { Card } from "react-bootstrap";
import '../../../styles/CourseCard.css';
const CourseCard = (props) => {
  const { course, setCourseChange } = props;
  return (
    <Card className="h-100" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{course.name}</Card.Title>
        <Card.Text>
          {course.description}
        </Card.Text>
        <Card.Link href="#" onClick={() => setCourseChange(course._id)}>View Folders</Card.Link>
      </Card.Body>
    </Card>)
}

export default CourseCard;