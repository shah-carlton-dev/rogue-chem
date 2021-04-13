import React, { useContext } from "react";
import { Navigation } from 'react-minimal-side-navigation';
import '../../styles/Sidebar.css';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext.js";
import ListsContext from "../../context/ListsContext.js";


const Sidebar = (props) => {
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    const { queue, setQueue, recents, setRecents } = useContext(ListsContext);

    const items = userData.user.admin ? (
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
        ]
    ) : (
        [// user items
            {
                title: 'Home',
                itemId: '/home',
            }, {
                title: 'Messages',
                itemId: '/home/messages',
            }, {
                title: 'Progress',
                itemId: '/home/progress',
            }, {
                title: 'Profile',
                itemId: '/home/profile'
            }]
    );

    return (<>
        <Navigation
            activeItemId="/home"
            onSelect={({ itemId }) => {
                history.push(itemId);
            }}
            items={items}
        />
        <hr />
        {
            queue.files.map(q => (<div style={{ padding: '0px 12px' }}>
                <h6 style={{ color: '#374151' }}>{q}</h6>
            </div>))
        }
        <hr />
        {
            queue.sections.map(q => (<div style={{ padding: '0px 12px' }}>
                <h6 style={{ color: '#374151' }}>{q}</h6>
            </div>))
        }
    </>)
}

export default Sidebar;