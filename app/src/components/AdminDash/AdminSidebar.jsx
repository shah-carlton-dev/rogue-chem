
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

    const items = [ //admin items
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