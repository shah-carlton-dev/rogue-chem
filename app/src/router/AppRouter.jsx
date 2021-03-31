import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import LoginSignup from '../components/Login/LoginSignup';
import Signup from '../components/Login/LoginSignup';
import FileManagement from '../components/FileManagement/FileManagement';
import CourseManagement from '../components/CourseManagement/CourseManagement';
import Header from '../components/Header';
import UserContext from "../context/UserContext.js";
import Axios from "axios";
import FileUpload from '../components/FileManagement/FileUpload';
import VideoUpload from '../components/FileManagement/VideoUpload';
import SampleRender from '../components/VideoRender/SampleRender';
import { API_URL } from '../utils/constants';
import { useHistory } from "react-router-dom";
import "../styles/AppRouter.css";

const AppRouter = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        // setUserData({
        //     token: 0,
        //     user: {}
        // });
        checkToken();
    }, []);

    const checkToken = async () => {
        try {
            let token = localStorage.getItem("auth-token");
            if (token == null) return;
            let url = API_URL + "/users/validateToken";
            return Axios.post(url, { "auth-token": token }).then((tokenRes) => {
                if (!tokenRes) {
                    console.log("Error :(");
                }
                if (tokenRes.data.valid) {
                    setUserData({
                        token: tokenRes.data.token,
                        user: tokenRes.data.user,
                    });
                } else {
                    setUserData({
                        token: 1,
                        user: {}
                    })
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <UserContext.Provider value={{ userData, setUserData }} >
            {/* {userData.token === 0 ? <div className="loader"></div> : <> */}
            <BrowserRouter>
                <Header />
                <Switch>
                    {userData.user && Object.keys(userData.user).length > 0 ?
                        <>
                            <Route component={LoginSignup} path="/login" />
                            <Route component={Home} path="/home" />
                            <Route component={FileManagement} path="/file-management" />
                            <Route component={CourseManagement} path="/course-management" />
                            <Route component={FileUpload} path="/fileUpload" />
                            <Route component={VideoUpload} path="/videoUpload" />
                            <Route component={SampleRender} path="/sampleRender" />
                        </> :
                        <>
                            <Route component={Signup} path="/signup"/>
                            <Route component={LoginSignup} path={"/login" | "/home"} />
                        </>
                    }
                    <Route component={LoginSignup} path="/" exact={true} />
                </Switch>
            </BrowserRouter>
            {/* </>} */}
        </UserContext.Provider>
    );
};

export default AppRouter;