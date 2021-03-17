import React, {useState, useRef} from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const FileUpload = (props) => {
    const [file, setFile] = useState(null); // state for storing actual image
    const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
    const [state, setState] = useState({
      title: '',
      description: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
    const dropRef = useRef(); // React ref for managing the hover state of droppable area
  
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
    
            setErrorMsg('');
            await axios.post(`${API_URL}/upload`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            props.history.push('/list');
          } else {
            setErrorMsg('Please select a file to add.');
          }
        } else {
          setErrorMsg('Please enter all the field values.');
        }
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
  
    return (
      <React.Fragment>
        
      </React.Fragment>
    );
  };

  export default FileUpload;