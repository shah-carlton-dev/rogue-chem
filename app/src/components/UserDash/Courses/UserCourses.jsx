import React from "react";
import { useHistory } from "react-router-dom";
import ResizePanel from "react-resize-panel";
import '../../../styles/UserCourses.css';
import CoursesDash from './CoursesDash.jsx';

const UserCourses = (props) => {
    return (<>
        <div className='container'>
            <ResizePanel direction="s" handleClass="customHandle" borderClass="customResizeBorder" >
                <div className='body'>

                    <div className='header panel'>
                        <CoursesDash/>
                    </div>

                </div>

            </ResizePanel>
            <div className='body'>

                <div className='content panel'>
                    content
            </div>

            </div>

        </div>
    </>)
}

export default UserCourses;