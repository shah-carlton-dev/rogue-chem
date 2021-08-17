import React, { useContext } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "../../../../styles/SectionCard.css";
import Axios from "axios";
import ListsContext from "../../../../context/ListsContext.js";
import UserContext from "../../../../context/UserContext.js";
import { API_URL } from "../../../../utils/constants";

const SectionCard = (props) => {
  const { section, setSectionChange, selected } = props;
  const { userData, setUserData } = useContext(UserContext);
  const { queue, setQueue, recents, setRecents } = useContext(ListsContext);

  const handleAddToQueue = async (folderId) => {
    if (queue.sections.includes(folderId)) {
      console.log("Folder already in queue: " + folderId);
    } else {
      await Axios.post(API_URL + "/users/addToQueue", {
        folderId,
        userId: userData.user._id,
      }).then(setQueue({ ...queue, sections: [...queue.sections, folderId] }));
    }
  };

  return (
    <Card
      className="h-100"
      style={{ width: "14rem" }}
      bg={selected ? "light-grey" : "none"}
    >
      <Card.Body className="p-2">
        <Container className="px-1">
          <Row className="height-2">
            <Col
              xs={12}
              sm={9}
              onClick={() => setSectionChange(section._id)}
              className="card-title m-0"
            >
              <Card.Title>
                <h5 className="my-1">{section.name}</h5>
              </Card.Title>
            </Col>
            <Col xs={12} sm={3} className="pl-auto pr-0">
              <Button
                size="sm"
                variant="outline-dark"
                onClick={() => handleAddToQueue(section._id)}
              >
                +
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SectionCard;
