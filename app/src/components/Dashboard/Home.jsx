import React, { useContext } from 'react';
import UserContext from "../../context/UserContext.js";
import { Row, Col } from "react-bootstrap";
import { Switch, Route } from 'react-router-dom';
import Sidebar from "./Sidebar.jsx"
import "../../styles/Home.css";
import CourseManagement from '../../components/CourseManagement/CourseManagement';
import SampleRender from '../../components/VideoRender/SampleRender';
import FileUpload from '../../components/FileManagement/FileUpload';
import VideoUpload from '../../components/FileManagement/VideoUpload';
import Courses from '../Dashboard/Courses.jsx';
import ProfileManagement from '../UserDash/ProfileManagement.jsx';
import UserProgress from '../UserDash/UserProgress.jsx';
import AdminProgress from '../AdminDash/AdminProgress.jsx';
import AdminStats from '../AdminDash/AdminStats.jsx';
import Messages from './Messages.jsx';

const Home = (props) => {
    const { userData, setUserData } = useContext(UserContext);

    return (<>
        <div className="home-wrapper">
            <Row className="fill-homepage">
                <Col xs={2} className="ml-2 sidebar">
                    <Sidebar />
                </Col>
                <Col>
                    <Row className="top-nav">
                        <Col xs={3}>
                            <p>Welcome, {userData.user.fname}</p>
                        </Col>
                        <Col>
                            <p>dashboard nav links, search, etc will be here</p>
                        </Col>
                    </Row>
                    <Switch>
                        <Route component={Courses} exact path="/home" />
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

    </>);
};
export default Home;