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
                        itemId: '/management/files',
                    },
                    {
                        title: 'Courses',
                        itemId: '/management/courses',
                    },
                ],
            },
            {
                title: 'Usage',
                itemId: '#',
                subNav: [
                    {
                        title: 'Progress',
                        itemId: '/usage/progress',
                    },
                    {
                        title: 'Statistics',
                        itemId: '/usage/stats',
                    },
                ],
            },
        ]
    ) : (
        [// user items
            {
                title: 'Home',
                itemId: '/home',
            }, {
                title: 'Progress',
                itemId: '/progress',
            }, {
                title: 'Profile',
                itemId: '/profile'
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