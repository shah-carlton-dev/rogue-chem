import React, { useState, useRef, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import download from 'downloadjs';
import { API_URL } from '../../utils/constants';
import '../../styles/FileManagement.scss';
import { NavLink } from 'react-router-dom';
const FileUpload = (props) => {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [keywords, setKeywords] = useState([]);
  const [keyword, setkeyword] = useState('');
  const [filesList, setFilesList] = useState([]);
  const [errorMsgTwo, setErrorMsgTwo] = useState('');
  const [deleteFileMsg, setDeleteFileMsg] = useState(''); // TODO: add delete file message tehe
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  useEffect(() => {
    getFilesList();
  }, []);

  const getFilesList = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/getAllFiles`);
      setErrorMsgTwo('');
      setFilesList(data);
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



  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };
  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '4px dashed #e9ebeb';
    }
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);
          formData.append('keywords', keywords);
          console.log(keywords);
          console.log(formData);
          setErrorMsg('');
          await axios.post(`${API_URL}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
    setState({
      title: '',
      description: ''
    });
    setKeywords([]);
    setFile(null);
    setPreviewSrc('');
    await getFilesList();
  };

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsgTwo('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsgTwo('Error while downloading file. Try again later');
      }
    }
  };

  const deleteOneFile = async (e, id) => {
    e.preventDefault();
    try {

      await axios.delete(`${API_URL}/deleteOneFile/${id}`);
      setErrorMsgTwo('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsgTwo('Error while deleting file. Try again later');
      }
    }
    await getFilesList();
  };

  const deleteAllFiles = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${API_URL}/deleteAllFiles`);
      setDeleteFileMsg('Successfully deleted all files.');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setDeleteFileMsg('Error while deleting all files. Please try again later.');
      }
    }
    await getFilesList();
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
        <h1>File Upload</h1>

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
          <h1>File Upload</h1>
        </Row> */}
        <Form className="search-form " onSubmit={handleOnSubmit}>
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
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
          <div className="upload-section">
            <Dropzone
              onDrop={onDrop}
              onDragEnter={() => updateBorder('over')}
              onDragLeave={() => updateBorder('leave')}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                  <input {...getInputProps()} />
                  <p>Drag and drop a file OR click here to select a file</p>
                  {file && (
                    <div>
                      <strong>Selected file:</strong> {file.name}
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
            {previewSrc ? (
              isPreviewAvailable ? (
                <div className="image-preview">
                  <img className="preview-image" src={previewSrc} alt="Preview" />
                </div>
              ) : (
                <div className="preview-message">
                  <p>Image preview will be shown here after selection</p>
                </div>
              )):<></>}
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="files-container">
          {errorMsgTwo && <p className="errorMsg">{errorMsgTwo}</p>}
          <table className="files-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>File type</th>
                <th>Download File</th>
                <th>Delete File</th>
              </tr>
            </thead>
            <tbody>
              {filesList.length > 0 ? (
                filesList.map(
                  ({ _id, title, description, file_path, file_mimetype }) => (
                    <tr key={_id}>
                      <td className="file-title">{title}</td>
                      <td className="file-description">{description}</td>
                      <td className="file-mimetype">{file_mimetype}</td>
                      <td>
                        <a
                          href="#/"
                          onClick={() =>
                            downloadFile(_id, file_path, file_mimetype)
                          }
                        >
                          Download
                    </a>
                      </td>
                      <td>
                        <a
                          href="#/"
                          onClick={(e) =>
                            deleteOneFile(e, _id)
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
                    No files found. Please add some.
              </td>
                </tr>
              )}
            </tbody>
          </table>
          <Form className="search-form" onSubmit={e => deleteAllFiles(e)}>
            <Button variant="danger" type="submit">
              Delete all files
        </Button>
          </Form>

        </div>
      </div>
    </React.Fragment >
  );
};

export default FileUpload;