import React from "react";
import { Navigation } from 'react-minimal-side-navigation';
import '../../styles/Sidebar.css';
import {useHistory} from "react-router-dom";

const Sidebar = () => {
    const history = useHistory();
    return (
        <Navigation
                // you can use your own router's api to get pathname
                activeItemId="/home"
                onSelect={({ itemId }) => {
                    history.push(itemId);
                }}
                items={[
                    {
                        title: 'Home',
                        itemId: '/home',
                        // you can use your own custom Icon component as well
                        // icon is optional
                        // elemBefore: () => <Icon name="inbox" />,
                    },
                    {
                        title: 'Management',
                        //itemId: '/management',
                        // elemBefore: () => <Icon name="users" />,
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
                        itemId: '/usage',
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
                ]}
            />
    )
}

export default Sidebar;