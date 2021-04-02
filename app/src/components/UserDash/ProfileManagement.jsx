import React from "react";
import { useHistory } from "react-router-dom";

const ProfileManagement = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    return (<>
        change password, other profile things ?
    </>)
}

export default ProfileManagement;