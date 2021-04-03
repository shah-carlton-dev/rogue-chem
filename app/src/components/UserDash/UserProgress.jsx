import React from "react";
import {useHistory} from "react-router-dom";

const UserProgress = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    return (<>
        information on progress through courses, etc
    </>)
}

export default UserProgress;