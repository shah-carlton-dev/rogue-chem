import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login/Login';
import FileManagement from '../components/FileManagement/FileManagement';
import Header from '../components/Header';
import UserContext from "../context/UserContext.js";
import Axios from "axios";
import { API_URL } from '../utils/constants';

const AppRouter = () => {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const checkToken = async () => {
            try {
                let token = localStorage.getItem("auth-token");
                if (token == null) return;
                let url = API_URL + "/users/validateToken";
                const tokenRes = await Axios.post(url, null, {
                    headers: { "auth-token": token }
                });
                if (tokenRes.data.valid) {
                    setUserData({
                        token: tokenRes.data.token,
                        userInfo: tokenRes.data.user,
                    });
                } else {
                    return;
                }
            } catch (err) {
                console.log(err);
            }
        };
        checkToken();
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData }} >
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route component={Login} path="/login" />
                    <Route component={Login} path="/" exact={true} />
                    <Route component={Home} path="/home" />
                    <Route component={FileManagement} path="/file-management" />
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>

    );
};

export default AppRouter;