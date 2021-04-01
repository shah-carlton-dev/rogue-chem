import React, { useContext } from 'react';
import UserContext from "../../context/UserContext.js";
import { Container, Row, Col, Card, Form, Icon } from "react-bootstrap";
import Sidebar from "./Sidebar.jsx"
import "../../styles/Home.css";

const Home = (props) => {
    const { userData, setUserData } = useContext(UserContext);

    return (
        <div className="home-wrapper">
            {/* <Container className="ml-0 mr-0 p-0"> */}
            <Row className="top-nav">
                <Col>
                   <pre>Welcome, {userData.user.fname}         also will have the dashboard nav items here</pre>

                    </Col>
            </Row>
            <Row className="fill-homepage">
                <Col xs={2} className="ml-2 sidebar">
                    <Sidebar />
                </Col>
                <Col>
                    <p className="text-center"></p>

                </Col>
            </Row>


            {/* </Container> */}
        </div>
    );
};
export default Home;