import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login/Login';
import FileManagement from '../components/FileManagement/FileManagement';
import CourseManagement from '../components/CourseManagement/CourseManagement';
import Header from '../components/Header';
import UserContext from "../context/UserContext.js";
import Axios from "axios";
import { API_URL } from '../utils/constants';
import { useHistory } from "react-router-dom";
import "../styles/AppRouter.css";

const AppRouter = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData({
            token: 0,
            user: {}
        });
        const checkToken = async () => {
            try {
                let token = localStorage.getItem("auth-token");
                if (token == null) return;
                let url = API_URL + "/users/validateToken";
                return Axios.post(url, null, {
                    headers: { "auth-token": token }
                }).then((tokenRes) => {
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
                            token: 0,
                            user: {}
                        })
                        return;
                    }
                });
            } catch (err) {
                console.log(err);
            }
        };
        checkToken();
    }, []);

    return (
        // !userData.user ? <div className="loader"></div> : 
        <UserContext.Provider value={{ userData, setUserData }} >
            <BrowserRouter>
                <Header />
                <Switch>
                    {userData.user && Object.keys(userData.user).length > 0 ?
                        <>
                            <Route component={Login} path="/login" />
                            <Route component={Home} path="/home" />
                            <Route component={FileManagement} path="/file-management" />
                            <Route component={CourseManagement} path="/course-management" />
                        </> :
                        <>
                            <Route component={Login} path={"/login" | "/home" | "/file-management"} />
                        </>
                    }
                    <Route component={Login} path="/" exact={true} />
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>

    );
};

export default AppRouter;