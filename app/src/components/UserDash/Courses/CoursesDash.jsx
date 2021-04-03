import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../../context/UserContext.js";
import { API_URL } from '../../../utils/constants.js';
import Axios from "axios";
import CourseCard from "./CourseCard.jsx";

const CoursesDash = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const [courseData, setCourseData] = useState([]);
    const [retrieving, setRetrieving] = useState(true);
    const [isError, setIsError] = useState(0);

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
                console.log("user has no courses");
                setIsError(1);
            } else {
                console.log(res.data);
                setCourseData(res.data);
            }
        });
    }

    return (<>
        {retrieving
            ? (<div className="dash-loader"></div>)
            : isError > 0 
                ? (isError===1 
                        ? (<div className="coursedata-error italicize">Error retrieving courses. Try again later.</div>)
                        : (<div className="coursedata-message italicize">You don't have any courses. Start by purchasing one!</div>))
                : (<>{courseData.map(course => <CourseCard course={course}/>)}</>)
        }
    </>)
}

export default CoursesDash