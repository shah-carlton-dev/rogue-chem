import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeRouter from '../components/Dashboard/HomeRouter';
import LoginSignup from '../components/Login/LoginSignup';
import Signup from '../components/Login/LoginSignup';
import Header from '../components/Header';
import UserContext from "../context/UserContext.js";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { API_URL } from '../utils/constants';
import "../styles/AppRouter.css";

// login info:
// admin = rfarrell / RogueChem1
// user = rshah / thisIsPassword!

const AppRouter = () => {
    const [userData, setUserData] = useState({});
    const history = useHistory();

    useEffect(() => {
        setUserData({
            token: 0,
            user: {}
        });
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
                    if (sessionStorage.getItem("last-route") !== null) {
                        history.push(sessionStorage.getItem("last-route"));
                    }
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
                <Header />
                <Switch>
                    {userData.user && Object.keys(userData.user).length > 0 ?
                        <>
                            <Route component={LoginSignup} path="/login" />
                            <Route component={HomeRouter} path="/home" />
                        </> :
                        <>
                            <Route component={Signup} path="/signup" />
                            <Route component={LoginSignup} path={"/login" | "/home"} />
                        </>
                    }
                    <Route component={LoginSignup} path="/" exact={true} />
                </Switch>
            {/* </>} */}
        </UserContext.Provider>
    );
};

export default AppRouter;