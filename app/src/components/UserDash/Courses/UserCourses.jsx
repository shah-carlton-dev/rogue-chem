import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../../context/UserContext.js";
import { useHistory } from "react-router-dom";
import ResizePanel from "react-resize-panel";
import '../../../styles/UserCourses.css';
import CoursesDash from './CoursesDash.jsx';
import FoldersList from './FoldersList.jsx';
import { API_URL } from '../../../utils/constants.js';
import Axios from "axios";

const UserCourses = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const [courseData, setCourseData] = useState([]);
    const [retrieving, setRetrieving] = useState(true);
    const [isError, setIsError] = useState(0);
    const [selected, isSelected] = useState(0);

    useEffect(() => {
        getCourseData();
    }, []);

    const getCourseData = async () => {
        const url = API_URL + '/courses/allData';
        await Axios.post(url, { ids: userData.user.courses }).then((res) => {
            setRetrieving(false);
            if (res === 1) {
                console.log("Error: " + res.data);
                setIsError(2);
            }
            else if (res === 0) {
                console.log("Error: user has no courses");
                setIsError(1);
            } else {
                console.log(res.data);
                setCourseData(res.data);
            }
        });
    }

    return (<>
        <div className='container'>
            <ResizePanel direction="s" handleClass="customHandle" borderClass="customResizeBorder" >
                <div className='body'>
                    <div className='header panel'>
                        <CoursesDash things={{retrieving, isError, courseData, isSelected}}/>
                    </div>
                </div>
            </ResizePanel>
            <div className='body fill-bottom'>
                <div className='content panel right-border'>
                    <FoldersList data={courseData} selected={selected}/>
                </div>
                <div className='content panel right-border'>
                    content 2
                </div>
                <div className='content panel'>
                    content  3
                </div>
            </div>
        </div>
    </>)
}

export default UserCourses;