import React, { useEffect, useState, useContext } from "react";
import { Form, Container, Button } from "react-bootstrap";
import "../../styles/Login.scss";
import Axios from "axios";
import UserContext from '../../context/UserContext.js';
import { useHistory, Link } from "react-router-dom";
import { API_URL } from '../../utils/constants';
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

const LoginSignup = (props) => {
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    const [signup, setSignup] = useState(false);

    useEffect(() => {
        (userData.user !== null || Object.keys(userData.user).length > 0) ?
            history.push("/home") : history.push("/login")
    }, [])

    const handleLogin = async (e, loginInfo) => {
        e.preventDefault();
        const user = loginInfo;
        const url = API_URL + "/users/login";
        try {
            await Axios.post(url, user).then((res) => {
                console.log(res);
                setUserData({
                    token: res.data.token,
                    user: res.data.existing
                });
                localStorage.setItem("auth-token", res.data.token);
                history.push('/home');
            });
        } catch (err) {
            if (err.response != undefined) {
                console.log(err.response.data);
            }
        }
    }

    const handleSignup = async (e, signupInfo) => {
        e.preventDefault();
        const user = signupInfo;
        const url = API_URL + "/users/studentCreate";
        try {
            await Axios.post(url, user).then((res) => {
                // setUserData({
                //     token: res.data.token,
                //     user: res.data.existing
                // });
                console.log(res);
                setSignup(false);
            });
        } catch (err) {
            if (err.response != undefined) {
                console.log(err.response.data);
            }
        }
    }

    const loginProps = {
        handleLogin, setSignup
    }

    const signupProps = {
        handleSignup, setSignup
    }

    return (
        <>
            <Container className="login pt-2 col-md-6">
                {
                    signup ? <>
                        <Signup things={signupProps}></Signup>
                    </> : <>
                        <Login things={loginProps}></Login>
                    </>
                }

            </Container>
        </>
    )
};

export default LoginSignup;