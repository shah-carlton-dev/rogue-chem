import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, ListGroup } from "react-bootstrap";
import UserContext from "../../context/UserContext.js";
import DashContext from "../../context/DashContext.js";
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
            onFocus={() => setShowSearch(true)}
            onBlur={() => setShowSearch(false)}
        />
    )
}

const SearchResults = ({ results, showSearch, handleSearchSelection }) => {
    return (
        <div className="search-results">
            <Card show={showSearch}>
                <ListGroup>
                    {
                        results.length > 0 ?
                            (results.map((data, index) => {
                                <>
                                    <ListGroup.Item onClick={e => handleSearchSelection(e)}>yeah</ListGroup.Item>
                                </>
                            })) : <ListGroup.Item >no matches</ListGroup.Item>

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
    const [searchableList, setSearchableList] = useState({});
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        getCourseData();
    }, []);

    useEffect(() => {
        // effect for searching
        console.log(search)
    }, [search])

    const makeSearchable = (data) => {
        return ( // TODO: decide how tf we gonna do this
            {
                sections: data.map(c =>
                    c.sections.map(s => {
                        return {
                            _id: s._id,
                            name: s.name,
                            description: s.description
                        }
                    })).flat(),
                files: data.map(c =>
                    c.sections.map(s =>
                        s.files.map(f => {
                            return {
                                _id: f._id,
                                title: f.title,
                                description: f.description,
                                keywords: f.keywords
                            }
                        })
                    )).flat(),
                videos: data.map(c =>
                    c.sections.map(s =>
                        s.videos.map(v => {
                            return {
                                _id: v._id,
                                title: v.title,
                                description: v.description,
                                keywords: v.keywords
                            }
                        })
                    )).flat()
            }
        )
    }

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
                    console.log(makeSearchable(res.data))
                }
            });
        } catch {
            console.log("Could not collect course data")
        }
    }

    const handleSearchSelection = (e) => {
        e.preventDefault();
        console.log(e.target.value)
    }

    return (<>
        <Form>
            <Row className="top-nav pt-3 control-height">
                <Col lg={3} >
                    <Form.Group controlId="select-course" className="course-selection">
                        <Form.Control as="select" onChange={e => setSelected(courseData.filter(c => c._id === e.target.value)[0])} >
                            {courseData.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={4} >
                    <SearchBar search={search} setSearch={setSearch} setShowSearch={setShowSearch} />
                    {showSearch && <SearchResults results={results} showSearch={showSearch} handleSearchSelection={handleSearchSelection} />}
                </Col>
            </Row>
            <hr className="m-0" />
        </Form>
        {userData.user.admin ? (
            <AdminCourses course={selected} />
        ) : (
            <UserCourses course={selected} />
        )}
    </>
    )
}

export default Home;