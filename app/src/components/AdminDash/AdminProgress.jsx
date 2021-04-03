import React from "react";
import {useHistory} from "react-router-dom";

const AdminProgress = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    return (<>
        information on all users' progress through courses
    </>)
}

export default AdminProgress;