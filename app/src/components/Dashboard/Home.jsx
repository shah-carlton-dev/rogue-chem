import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import UserContext from "../../context/UserContext.js";
import AdminCourses from "./AdminDash/AdminCourses.jsx";
import UserCourses from "./UserDash/Courses/UserCourses.jsx";
import Select from 'react-dropdown-select';
import { API_URL } from '../../utils/constants.js';
import Axios from "axios";

const Home = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const [courseData, setCourseData] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        getCourseData();
    }, []);

    const getCourseData = async () => {
        const url = API_URL + '/courses/allData';
        try {
            await Axios.post(url, { ids: userData.user.courses }).then((res) => {
                console.log('course data');
                if (res === 1)
                    console.log("Error: " + res.data);
                else if (res === 0)
                    console.log("Error: user has no courses");
                else {
                    console.log(res.data);
                    setCourseData(res.data);
                    setSelected(res.data[0]);
                }
            });
        } catch {
            console.log("error in \'courses.jsx\' getCourseData fn")
        }
    }

    return (<>
        {/* <Container>  */}
        {/* refactor the top bar as a form */}
        <Form >
            <Row className="top-nav">
                {/* <Col lg={3}>
                <Select
                    options={courseData}
                    valueField="_id"
                    disabled={false}
                    onChange={(val) => { console.log(val); setSelected(val[0]); }}
                    labelField="name"
                    placeholder={selected.name}
                    separator={true}
                    dropdownHandleRenderer={({ state }) => (
                        <span className="pl-1">{state.dropdown ? " –" : " +"}</span>
                    )}
                    closeOnSelect={true}
                    backspaceDelete={false}
                />
            </Col> */}
                <Col lg={3} className="pt-3">

                    <Form.Group controlId="select-course" >
                        <Form.Control as="select" onChange={e => setSelected(courseData.filter(c => c._id === e.target.value)[0])} defaultValue={"hi"}>
                            {courseData.map(c => <option value={c._id}>{c.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={5} className="pt-3">
                    <Form.Group controlId="select-course" >
                        <Form.Control as="select" onChange={e => setSelected(courseData.filter(c => c._id === e.target.value)[0])} defaultValue={"hi"}>
                            {courseData.map(c => <option value={c._id}>{c.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        {userData.user.admin ? (
            <AdminCourses course={selected} />
        ) : (
            <UserCourses course={selected} />
        )}
        {/* </Container> */}
    </>
    )
}

export default Home;