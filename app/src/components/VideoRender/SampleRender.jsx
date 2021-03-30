import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Container, Row, Col } from 'react-bootstrap';
import VideoView from './VideoView';
import { API_URL } from '../../utils/constants';

const SampleRender = (props) => {
    const [videos, setVideos] =  useState([]);
    useEffect( () => {
        fetchData();
    }, [])
    async function fetchData() {
        const result = await axios.get(`${API_URL}/getAllVideos`);
        const data = result.data;
        setVideos(data);
        console.log(data);
    }

    return(
        <>
        <Container>
            <Row>
                {videos.map(video => <VideoView video={video}/>)}
            </Row>
        </Container>
        </>
    );
}

export default SampleRender;