import React, { useEffect, useState, useContext } from "react";
import { Form, Container, Button } from "react-bootstrap";
import "../../styles/Login.scss";
import Axios from "axios";
import UserContext from '../../context/UserContext.js';
import { useHistory } from "react-router-dom";
import { API_URL } from '../../utils/constants';

const Login = (props) => {

    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    useEffect(() => (userData.user == null || Object.keys(userData.user).length > 0)? history.push("/home") : history.push("/login"), [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = { username, password };
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
            console.log(err);
        }
    }

    return (
        <>
            <h3 className="text-center pt-2">Sign in to your account here</h3>
            <Container className="login pt-2 col-md-6">
                <Form onSubmit={(event) => handleSubmit(event)} className="pt-3">
                    <Form.Group size="lg" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="md" variant="outline-dark" type="submit" disabled={!validateForm()}>
                        Sign in
                    </Button>
                </Form>
            </Container>
        </>
    )
};

export default Login;