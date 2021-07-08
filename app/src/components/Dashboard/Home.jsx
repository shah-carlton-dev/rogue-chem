import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import UserContext from "../../context/UserContext.js";
import AdminCourses from "./AdminDash/AdminCourses.jsx";
import UserCourses from "./UserDash/Courses/UserCourses.jsx";
import { API_URL } from '../../utils/constants.js';
import Axios from "axios";

const SearchBar = ({ search, setSearch, setShowSearch }) => {
    return (
        <input
            className="search-bar"
            key="random1"
            value={search}
            placeholder={"search folders and files"}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowSearch("true")}
            onBlur={() => setShowSearch("false")}
        />
    )
}

const SearchResults = ({ results, showSearch }) => {
    return (
        <div className="search-results">
            <Card show={showSearch}>
                <ListGroup>
                    {
                        results.length > 0 ?
                            (results.map((data, index) => {
                                <>
                                    <ListGroup.Item onClick={e => console.log(e)}>yeah</ListGroup.Item>
                                </>
                            })) : <ListGroup.Item onClick={() => console.log(document.activeElement)}>no matches</ListGroup.Item>

                    }
                </ListGroup>
            </Card>
        </div>
    )
}

const Home = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const [courseData, setCourseData] = useState([]);
    const [selected, setSelected] = useState({});
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [notFilteredList, setNotFilteredList] = useState([]);
    const [showSearch, setShowSearch] = useState("false");

    useEffect(() => {
        getCourseData();
    }, []);

    useEffect(() => {

    })

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
        <Form>
            <Row className="top-nav">
                <Col lg={3} className="pt-3">

                    <Form.Group controlId="select-course" >
                        <Form.Control as="select" onChange={e => setSelected(courseData.filter(c => c._id === e.target.value)[0])} >
                            {courseData.map(c => <option value={c._id}>{c.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={5} className="pt-3">
                    <div>
                        <SearchBar onClick={() => console.log(document.activeElement)} search={search} setSearch={setSearch} setShowSearch={setShowSearch} />
                    </div>
                    <SearchResults results={results} showSearch={showSearch} />
                </Col>
            </Row>
            <hr className="m-0"/>
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