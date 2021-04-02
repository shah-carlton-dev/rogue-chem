import React, { useContext } from "react";
import { Navigation } from 'react-minimal-side-navigation';
import '../../styles/Sidebar.css';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext.js";

const Sidebar = () => {
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);

    const items = userData.user.admin ? (
        [ //admin items
            {
                title: 'Home',
                itemId: '/home',
            },
            {
                title: 'Management',
                //itemId: '/management',
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
        ]
    ) : (
        [// user items
            {
                title: 'Home',
                itemId: '/home',
            }, {
                title: 'Progress',
                itemId: '/home/progress',
            }, {
                title: 'Profile',
                itemId: '/home/profile'
            }]
    );


    return (
        <Navigation
            activeItemId="/home"
            onSelect={({ itemId }) => {
                history.push(itemId);
            }}
            items={items}
        />
    )
}

export default Sidebar;