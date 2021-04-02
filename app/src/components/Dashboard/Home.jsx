import React, { useContext } from 'react';
import UserContext from "../../context/UserContext.js";
import { Container, Row, Col, Card, Form, Icon } from "react-bootstrap";
import Sidebar from "./Sidebar.jsx"
import "../../styles/Home.css";

const Home = (props) => {
    const { userData, setUserData } = useContext(UserContext);

    return (
        <div className="home-wrapper">
            <Row className="fill-homepage">
                <Col xs={2} className="ml-2 sidebar">
                    <Sidebar />
                </Col>
                <Col>
                    <Row className="top-nav">
                        <Col xs={3}>
                            <p>Welcome, {userData.user.fname}</p>
                        </Col>
                        <Col>
                            <p>dashboard nav links, search, etc will be here</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
export default Home;