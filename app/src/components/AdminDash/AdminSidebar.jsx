
import React, { useContext, useEffect, useState } from "react";
import { Navigation } from 'react-minimal-side-navigation';
import '../../styles/Sidebar.css';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext.js";
import ListsContext from "../../context/ListsContext.js";
import { Button, Row, Col, Container } from 'react-bootstrap';
import { API_URL } from '../../utils/constants.js';
import Axios from 'axios';
import { getFilenameFromUrl } from "pdfjs-dist";

const AdminSidebar = (props) => {
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    const { queue, setQueue, recents, setRecents } = useContext(ListsContext);
    const [queueFiles, setQueueFiles] = useState([]);
    const [queueFileIds, setQueueFileIds] = useState([]);
    const [queueSections, setQueueSections] = useState([]);
    const [queueSectionIds, setQueueSectionIds] = useState([]);
    const [showList, setShowList] = useState("qfiles");

    useEffect(() => {
        if (queue !== undefined && queue.files !== null && queue.files !== undefined)
            setQueueFileIds(queue.files);
        if (queue !== undefined && queue.sections !== null && queue.sections !== undefined)
            setQueueSectionIds(queue.sections);
    }, [...Object.values(queue)]);

    useEffect(() => {
        const qFiles = [];
        for (const id in queueFileIds) {
            const file = getFile(queueFileIds[id]);
            qFiles.unshift(file);
        }
        setQueueFiles(qFiles);
        console.log("file sections: ");
        console.log(queueFiles);
    }, [queueFileIds]);

    useEffect(() => {
        const qSections = [];
        for (const id in queueSectionIds) {
            const section = getSection(queueSectionIds[id]);
            qSections.unshift(section);
        }
        setQueueSections(qSections);
        console.log("queue sections: ");
        console.log(queueSections);
    }, [queueSectionIds]);

    const getFile = async (id) => {
        try {
            const { data } = await Axios.get(API_URL + "/getFile/" + id);
            return data;
        } catch (error) {
            return { error: "unable to load file" };
        }
    }
    const getSection = async (id) => {
        try {
            const { data } = await Axios.get(API_URL + "/courses/section/" + id);
            return data;
        } catch (error) {
            return { error: "unable to load section" };
        }
    }
    const items =
        [ //admin items
            {
                title: 'Home',
                itemId: '/home',
            },
            {
                title: 'Messages',
                itemId: '/home/messages'
            },
            {
                title: 'Management',
                subNav: [
                    {
                        title: 'Files',
                        itemId: '/home/management/files',
                    },
                    {
                        title: 'Videos',
                        itemId: '/home/management/videos',
                    },
                    {
                        title: 'Courses',
                        itemId: '/home/management/courses',
                    },
                ],
            },
            {
                title: 'Usage',
                itemId: '#',
                subNav: [
                    {
                        title: 'Progress',
                        itemId: '/home/usage/progress',
                    },
                    {
                        title: 'Statistics',
                        itemId: '/home/usage/stats',
                    },
                ],
            },
            {
                title: 'Sample Render',
                itemId: '/home/sample'
            },
        ];

    return (<>
        <Navigation
            activeItemId="/home"
            onSelect={({ itemId }) => {
                history.push(itemId);
            }}
            items={items}
        />
        <hr />

    </>)
}

export default AdminSidebar;