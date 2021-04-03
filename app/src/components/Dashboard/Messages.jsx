import React from "react";
import {useHistory} from "react-router-dom";

const Messages = (props) => {
    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    return (<>
        Messages list here
    </>)
}

export default Messages;