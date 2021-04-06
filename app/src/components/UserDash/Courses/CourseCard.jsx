import React from "react";
import { Card } from "react-bootstrap";

const CourseCard = (props) => {
    const { course, isSelected, index } = props;
    return (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{course.name}</Card.Title>
      <Card.Text>
        {course.description}
      </Card.Text>
      <Card.Link href="#" onClick={()=>isSelected(index)}>View Folders ({index})</Card.Link>
    </Card.Body>
  </Card>)
}

export default CourseCard;