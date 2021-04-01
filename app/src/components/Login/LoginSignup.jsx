import React, { useEffect, useState, useContext } from "react";
import "../../styles/LoginSignup.css";
import Axios from "axios";
import UserContext from '../../context/UserContext.js';
import { useHistory } from "react-router-dom";
import { API_URL } from '../../utils/constants';
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

const LoginSignup = (props) => {
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    const [signup, setSignup] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [loginError, setLoginError] = useState("");


    useEffect(() => {
        (userData.user !== null || Object.keys(userData.user).length > 0) ?
            history.push("/home") : history.push("/login")
    }, [])

    useEffect(() => {
        setLoginError("");
    },[signup]);

    const handleLogin = async (e, loginInfo) => {
        e.preventDefault();
        const user = loginInfo;
        const url = API_URL + "/users/login";
        try {
            await Axios.post(url, user).then((res) => {
                delete res.data.existing.password;
                setUserData({
                    token: res.data.token,
                    user: res.data.existing
                });
                localStorage.setItem("auth-token", res.data.token);
                history.push('/home');
            });
        } catch (err) {
            if (err.response != undefined) {
                setLoginError(err.response.data);
            }
        }
    }

    const handleSignup = async (e, signupInfo) => {
        e.preventDefault();
        const user = signupInfo;
        const url = API_URL + "/users/studentCreate";
        try {
            await Axios.post(url, user).then((res) => {
                setSignupSuccess(true);
                setSignup(false);
            });
        } catch (err) {
            if (err.response != undefined) {
                alert(err.response.data);
                // set up err handling based on index of email or username to show on front
            }
        }
    }

    const loginProps = {
        handleLogin, setSignup, signupSuccess, loginError
    }

    const signupProps = {
        handleSignup, setSignup
    }

    return (
        <>
            {
                signup ? <>
                    <Signup things={signupProps}></Signup>
                </> : <>
                    <Login things={loginProps}></Login>
                </>
            }
        </>
    )
};

export default LoginSignup;