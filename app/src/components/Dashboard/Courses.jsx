import React, {useContext} from "react";
import UserContext from "../../context/UserContext.js";
import AdminCourses from "../AdminDash/AdminCourses.jsx";
import UserCourses from "../UserDash/UserCourses.jsx";

const Courses = (props) => {
    const { userData, setUserData } = useContext(UserContext);

    return (<>
        {userData.user.admin ? (
            <AdminCourses />
        ) : (
            <UserCourses />
        )}
    </>)
}

export default Courses;