import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Container, Row, Col } from 'react-bootstrap';
import VideoView from './VideoView';
import PDFView from './PDFView';
import { API_URL } from '../../utils/constants';

const SampleRender = (props) => {
    const [videos, setVideos] =  useState([]);
    const [files, setFiles] = useState([]);
    useEffect( () => {
        fetchVideos();
    }, [])
    useEffect( () => {
        fetchFiles();
    }, [])
    async function fetchVideos() {
        const result = await axios.get(`${API_URL}/getAllVideos`);
        const data = result.data;
        setVideos(data);
        console.log(data);
    }
    async function fetchFiles() {
        const result = await axios.get(`${API_URL}/getAllFiles`);
        const data = result.data;
        setFiles(data);
        console.log(data);
    }

    async function getFile(id) {
        try {
            const result = await axios.get(`${API_URL}/getFile/${id}`);
            // console.log(result.data);
            return result.data;
        } catch (error) {

        }
        

    }
    return(
        <>
        <Container>
            <Row>
                {videos.map(video => <VideoView key={video._id} video={video}/>)}
            </Row>
        </Container>
        <Container>
            <Row>
                {files.map(file => <PDFView key={file._id} file={getFile(file._id)}/>)}
            </Row>
        </Container>
        </>
    );
}

export default SampleRender; 