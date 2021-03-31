import React, { useEffect, useState, useContext } from "react";
import { Form, Container, Button } from "react-bootstrap";
import "../../styles/Login.scss";

const Login = (props) => {
    const { handleLogin, setSignup } = props.things;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    return (
        <>
            <h3 className="text-center pt-2">Sign in to your account here</h3>

            <Form onSubmit={(e) => handleLogin(e, {username, password})} className="pt-3">
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
            <div className="donthaveanaccount">
                {"Don't have an account? "}
                <span onClick={() => setSignup(true)}>
                    <a href="#">
                        Sign up.
                                </a>
                </span>
            </div>
        </>
    )
}

export default Login;