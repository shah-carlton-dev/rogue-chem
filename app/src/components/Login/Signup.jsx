import React, { useEffect, useState, useContext } from "react";
import { Form, Col, Button, Container } from "react-bootstrap";
import "../../styles/LoginSignup.css";

const Signup = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordC, setPasswordC] = useState("");
    const [email, setEmail] = useState("");
    const [lname, setLname] = useState("");
    const [fname, setFname] = useState("");
    const { handleSignup, setSignup } = props.things;

    function validateForm() {
        return username.length > 0 && password.length > 0 && passwordC.length > 0 && checkEmail() && checkPassword();
    }

    const checkEmail = () => {
        let isValid = true;
        if (email === "") {
            isValid = false;
        } else if (typeof email !== "undefined") {
            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                isValid = false;
            }
        }
        return isValid;
    }

    const checkPassword = () => {
        return password === passwordC;
    }

    return (
        <Container className="signup pt-2 pb-5 col-md-8">
            <Button variant="link" onClick={() => setSignup(false)}>back to login</Button>
            <h3 className="text-center pt-2">Create an account here</h3>
            <p className="text-center">Making an account here does not give you access to a Rogue Chem course. You'll need to purchase access on the main website at <a href="https://www.roguechem.com" target="_blank" rel="noreferrer">roguechem.com </a>. You can then enter your access code and begin learning!</p>
            <Form onSubmit={(e) => handleSignup(e, { username, password, email, fname, lname })} className="pt-3">
                <h5>Account Info</h5>
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
                <Form.Group size="lg" controlId="passwordConf">
                    <Form.Label>Password confirmation</Form.Label>
                    <Form.Control
                        type="password"
                        autoComplete="current-password"
                        value={passwordC}
                        onChange={(e) => setPasswordC(e.target.value)}
                    />
                </Form.Group>
                <h5>Profile Info</h5>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Row>
                    <Col>
                        <Form.Group className="flname" size="lg" controlId="password">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="current-password"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="flname" size="lg" controlId="passwordConf">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="current-password"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Button block size="md" variant="outline-dark" type="submit" disabled={!validateForm()}>
                    Create account
                            </Button>
            </Form>
        </Container>
    )
}

export default Signup;