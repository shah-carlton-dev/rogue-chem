import React from "react";
import {useHistory} from "react-router-dom";

const AdminStats = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    return (<>
        show statistics for courses, folders, files, etc
    </>)
}

export default AdminStats;