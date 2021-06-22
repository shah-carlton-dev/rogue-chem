import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import '../../../../styles/SectionCard.css';
import Axios from "axios";
import ListsContext from '../../../../context/ListsContext.js';
import UserContext from '../../../../context/UserContext.js';
import { API_URL } from '../../../../utils/constants';

const SectionCard = (props) => {
    const { section, setSectionChange } = props;
    const { userData, setUserData } = useContext(UserContext);
    const { queue, setQueue, recents, setRecents } = useContext(ListsContext);

    const handleAddToQueue = async (folderId) => {
        if (queue.sections.includes(folderId)) {
            console.log("Folder already in queue: " + folderId);
        } else {
            await Axios.post(
                API_URL + "/users/addToQueue",
                { folderId, userId: userData.user._id }
            ).then(
                setQueue({ ...queue, sections: [...queue.sections, folderId] })
            );
        }
    }

    return (
        <Card className="h-100" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{section.name}</Card.Title>
                <Card.Text>
                    {section.description}
                </Card.Text>

                <Button variant="link" onClick={() => setSectionChange(section._id)}>View Files</Button>
        &nbsp;&nbsp;
        <Button variant="link" onClick={() => handleAddToQueue(section._id)}>Add to Queue</Button>

            </Card.Body>
        </Card>)
}

export default SectionCard;