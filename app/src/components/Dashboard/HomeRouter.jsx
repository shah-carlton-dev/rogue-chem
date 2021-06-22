import React, { useContext, useState } from 'react';
import UserContext from "../../context/UserContext.js";
import { Row, Col } from "react-bootstrap";
import { Switch, Route } from 'react-router-dom';
import Sidebar from "./Sidebar.jsx"
import "../../styles/Home.css";
import CourseManagement from '../CourseManagement/CourseManagement';
import SampleRender from '../VideoRender/SampleRender';
import FileUpload from '../FileManagement/FileUpload';
import VideoUpload from '../FileManagement/VideoUpload';
import Home from './Home.jsx';
import ProfileManagement from './UserDash/ProfileManagement.jsx';
import UserProgress from './UserDash/UserProgress.jsx';
import AdminProgress from './AdminDash/AdminProgress.jsx';
import AdminStats from './AdminDash/AdminStats.jsx';
import Messages from './Messages.jsx';
import ListsContext from "../../context/ListsContext.js";


const HomeRouter = (props) => {
    const { userData, setUserData } = useContext(UserContext);

    const [queue, setQueue] = useState({files: userData.user.starredFiles, sections: userData.user.starredSections});
    const [recents, setRecents] = useState(userData.user.recentFiles);

    return (
        <ListsContext.Provider value={{ queue, setQueue, recents, setRecents }}>
            <div className="home-wrapper">
                <Row className="fill-homepage">
                    <Col xs={2} className="ml-2 sidebar">
                        {
                            userData.user.admin ? (
                                <Sidebar />
                            ) : (
                                <Sidebar />
                            )
                        }
                    </Col>
                    <Col className="fill-width">
                        <Switch>
                            <Route component={Home} exact path="/home" />
                            <Route component={Messages} path="/home/messages" />
                            {userData.user.admin ?
                                <> {/* admin routes */}
                                    <Route component={CourseManagement} path="/home/management/courses" />
                                    <Route component={FileUpload} path="/home/management/files" />
                                    <Route component={VideoUpload} path="/home/management/videos" />
                                    <Route component={SampleRender} path="/home/sample" />
                                    <Route component={AdminProgress} path="/home/usage/progress" />
                                    <Route component={AdminStats} path="/home/usage/stats" />
                                </> :
                                <> {/* user routes */}
                                    <Route component={ProfileManagement} path="/home/profile" />
                                    <Route component={UserProgress} path="/home/progress" />
                                </>
                            }
                        </Switch>
                    </Col>
                </Row>
            </div>
        </ListsContext.Provider>);
};
export default HomeRouter;