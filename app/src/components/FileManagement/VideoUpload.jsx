import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import download from 'downloadjs';
import { API_URL } from '../../utils/constants';
import '../../styles/FileManagement.scss';
import { useHistory } from "react-router-dom";

const VideoUpload = (props) => {
  const history = useHistory();
  sessionStorage.clear();
  sessionStorage.setItem("last-route", history.location.pathname);

  const [state, setState] = useState({
    utl: '',
    title: '',
    description: ''
  });
  const [keywords, setKeywords] = useState([]);
  const [keyword, setkeyword] = useState('');
  const [videosList, setVideosList] = useState([]);
  const [errorMsgTwo, setErrorMsgTwo] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getVideosList();
  }, []);

  const getVideosList = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/getAllVideos`);
      setErrorMsgTwo('');
      setVideosList(data);
    } catch (error) {
      error.response && setErrorMsgTwo(error.response.data);
    }
  };

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { url, title, description } = state;
      if (title.trim() !== '' && description.trim() !== '' && url.trim() !== '') {
        const formData = {
          url,
          title,
          description,
          keywords
        }
        setErrorMsg('');
        await axios.post(`${API_URL}/uploadVideo`, formData);
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
    setState({
      url: '',
      title: '',
      description: ''
    });
    setKeywords([]);
    await getVideosList();
  };

  const deleteOneVideo = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`${API_URL}/deleteOneVideo/${id}`);
      setErrorMsgTwo('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('Error while deleting video. Try again later');
      }
    }
    await getVideosList();
  };

  const deleteAllVideos = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${API_URL}/deleteAllVideos`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('error deleting all videos');
      }
    }
    await getVideosList();
  };

  const deleteKeyword = (index) => {
    var newKeywords = keywords;
    if (index > -1) {
      newKeywords.splice(index, 1);
    }
    setKeywords(newKeywords);
  }

  const addKeyword = (e) => {
    e.preventDefault();
    var newKeywordList = keywords;
    newKeywordList.push(keyword);
    setKeywords(newKeywordList);
    console.log(keywords);
    document.getElementById("keywordInput").value = '';
    setkeyword('');
  }

  const handleKeywordInput = (event) => {
    setkeyword(event.target.value);
  }

  return (
    <React.Fragment>
      <div className="container">
        <h1>Video Upload</h1>

        {/* <div className="header">
          <nav>
            <NavLink activeClassName="active" to="/fileUpload">
              File Upload
             </NavLink>
            <NavLink activeClassName="active" to="/videoUpload">
              Video Upload
             </NavLink>
          </nav>
        </div> */}
        {/* <Row>
          <h1>Video Upload</h1>
        </Row> */}
        <Form className="search-form " onSubmit={handleOnSubmit}>
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Control
                  type="text"
                  name="url"
                  value={state.url || ''}
                  placeholder="Enter url"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Control
                  type="text"
                  name="title"
                  value={state.title || ''}
                  placeholder="Enter title"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="description">
                <Form.Control
                  type="text"
                  name="description"
                  value={state.description || ''}
                  placeholder="Enter description"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="keywords">
                <Form.Control
                  id="keywordInput"
                  type="text"
                  name="keywords"
                  //value={''}
                  placeholder="Type a keyword/phrase"
                  onChange={(e) => handleKeywordInput(e)}
                />
              </Form.Group>
              <ul className="keyword-list">
                {keywords.map((keywrd, index) => (
                  <li key={index}>{keywrd}<a href="#/" onClick={() => deleteKeyword(index)}>(x)</a></li>
                ))}
              </ul>
              <Button type="submit" className="btn btn-primary mb-2" onClick={(e) => addKeyword(e)}>add keyword</Button>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Submit
         </Button>
        </Form>
        <div className="files-container">
          {errorMsgTwo && <p className="errorMsg">{errorMsgTwo}</p>}
          <table className="files-table">
            <thead>
              <tr>
                <th>URL</th>
                <th>Title</th>
                <th>Description</th>
                <th>Delete File</th>
              </tr>
            </thead>
            <tbody>
              {videosList.length > 0 ? (
                videosList.map(
                  ({ _id, url, title, description }) => (
                    <tr key={_id}>
                      <td className="file-url">{url}</td>
                      <td className="file-title">{title}</td>
                      <td className="file-description">{description}</td>
                      <td>
                        <a
                          href="#/"
                          onClick={(e) =>
                            deleteOneVideo(e, _id)
                          }
                        >
                          Delete
                   </a>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={5} style={{ fontWeight: '300' }}>
                    No videos found. Please add some.
             </td>
                </tr>
              )}
            </tbody>
          </table>
          <Form className="search-form" onSubmit={e => deleteAllVideos(e)}>
            <Button variant="danger" type="submit">
              Delete all videos
       </Button>
          </Form>
        </div>
      </div>
    </React.Fragment >
  );
};

export default VideoUpload;