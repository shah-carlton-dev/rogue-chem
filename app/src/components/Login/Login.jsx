import React, { useState, useContext } from "react";
import { Form, Container, Button } from "react-bootstrap";
import "../../styles/Login.scss";
import Axios from "axios";
import UserContext from '../../context/UserContext.js';
import { useHistory } from "react-router-dom";
import { API_URL } from '../../utils/constants';

const Login = (props) => {

    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUserData } = useContext(UserContext);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const loginUser = { username, password };
        const url = API_URL + "/users/login";
        try {
            const loginRes = await Axios.post(url, loginUser);
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            localStorage.setItem("auth-token", loginRes.data.token);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <h3 className="text-center pt-2">Sign in to your account here</h3>
            <Container className="login pt-2 col-md-6">
                <Form onSubmit={handleSubmit} className="pt-3">
                    <Form.Group size="lg" controlId="email">
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="md" type="submit" disabled={!validateForm()}>
                        Sign in
                    </Button>
                </Form>
            </Container> </>
    )
};

export default Login;