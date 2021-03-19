import React, { useState, useEffect } from 'react';
import {AccordionCollapse, Button, Form} from 'react-bootstrap';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const FileLibrary = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [deleteFileMsg, setDeleteFileMsg] = useState(''); // TODO: add delete file message tehe
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  const deleteOneFile = async (id) => {
    try {

      await axios.delete(`${API_URL}/deleteOneFile/${id}`);
      setErrorMsg('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while deleting file. Try again later');
      }
    }
  };

  const deleteAllFiles = async () => {
    try {
      await axios.delete(`${API_URL}/deleteAllFiles`);
      setDeleteFileMsg('Successfully deleted all files.');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setDeleteFileMsg('Error while deleting all files. Please try again later.');
      }
    }
  };

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
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
                      onClick={() =>
                        deleteOneFile(_id)
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
      <Form className="search-form" onSubmit={deleteAllFiles}>
        <Button variant="danger" type="submit">
              Delete all files
        </Button>
      </Form>
      
    </div>
  );
};

export default FileLibrary;