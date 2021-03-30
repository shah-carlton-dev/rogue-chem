import React from 'react';

import {Card} from 'react-bootstrap';
const VideoView = (props) => {
    return(
        <>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.video.title}</Card.Title>
                <Card.Text>
                    {props.video.description}
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
    
    
}

export default VideoView;