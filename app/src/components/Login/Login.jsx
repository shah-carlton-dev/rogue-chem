import React, { useEffect, useState, useContext } from "react";
import { Form, Container, Button } from "react-bootstrap";
import "../../styles/Login.scss";

const Login = (props) => {
    const { handleLogin, setSignup, signupSuccess } = props.things;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    return (
        < Container className="login pt-2 col-md-6">
            <h3 className="text-center pt-2">Sign in to your account here</h3>
            {
                signupSuccess ? (
                    <p>Successfully created an account! Log in using your credentials.</p>
                ) : (<></>)
            }
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
            <br/>
            <div className="donthaveanaccount">
                {"Don't have an account? "}
                <span onClick={() => setSignup(true)}>
                    <a href="#">
                        Sign up here.
                                </a>
                </span>
            </div>
        </Container>
    )
}

export default Login;