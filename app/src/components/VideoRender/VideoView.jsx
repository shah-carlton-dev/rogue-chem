import React from 'react';

import {Card} from 'react-bootstrap';
const VideoView = (props) => {
    return(
        <>
        <Card style={{ width: '20vw' }}>
            <Card.Body>
                <Card.Title>{props.video.title}</Card.Title>
                <Card.Text>
                <iframe src={props.video.url} width="640" height="480" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                <p>{props.video.description}</p>
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
    
    
}

export default VideoView;