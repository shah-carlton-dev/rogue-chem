import React, { useContext, useState, useEffect } from "react";
import DirectMessage from "./DirectMessage.jsx";
import Axios from "axios";
import UserContext from "../../../context/UserContext.js";
import { API_URL } from '../../../utils/constants.js';

const DMList = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {
        getMessagesList(userData.user._id);
    }, []);

    const getMessagesList = async (id) => {
        console.log(id);
        try {
            // await Axios.get(API_URL + "/msg/messages/" + id).then(res => setMessagesList(res.data));
        } catch (err) {
            console.log("error in getMessagesList \n" + err);
        }
    }


    return (
        <div className="dms-list" >
            {
                messagesList.map(d => (<>
                    <DirectMessage dm={d} />
                </>))
            }
        </div>
    )
}

export default DMList;