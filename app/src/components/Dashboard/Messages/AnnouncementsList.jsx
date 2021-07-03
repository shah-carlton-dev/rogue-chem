import React, { useEffect, useContext, useState } from "react";
import Axios from "axios";
import Announcement from "./Announcement.jsx";
import UserContext from "../../../context/UserContext.js";
import { API_URL } from '../../../utils/constants.js';


const AnnouncementsList = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const [meta, setMeta] = useState([]);
    const [aList, setAList] = useState([]);

    useEffect(() => {
        getAnnouncementsList(userData.user._id);
    }, []);

    const getAnnouncementsList = async (id) => {
        console.log(id);
        try {
            await Axios.get(API_URL + "/msg/metaDoc").then(res => setMeta(res.data));
            await Axios.get(API_URL + "/msg/announcements/" + id).then(res => setAList(res.data));
        } catch (err) {
            console.log("error in getAnnouncementsList \n" + err);
        }
    }

    return (
        <div className="announcements-list" >
            {
                aList.map(a => (<>
                    <Announcement announcement={a} meta={meta} />
                </>))
            }
        </div>
    )
}

export default AnnouncementsList;