import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import UserContext from "../../context/UserContext.js";
import AdminCourses from "../AdminDash/AdminCourses.jsx";
import UserCourses from "../UserDash/Courses/UserCourses.jsx";
import Select from 'react-dropdown-select';
import { API_URL } from '../../utils/constants.js';
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Home = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const [courseData, setCourseData] = useState([]);
    const [selected, setSelected] = useState({});
    let course, folder, file = "";
    const [done, setDone] = useState(false);

    const history = useHistory();
    sessionStorage.clear();
    sessionStorage.setItem("last-route", history.location.pathname);

    useEffect(() => {
        getCourseData();
        // getMostRecent();
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
                    setCourseData(res.data);
                    setSelected(res.data[0]);
                }
            });
        } catch {
            console.log("error in courses.jsx getCourseData fn")
        }
    }

    const getMostRecent = async () => {
        try {
            await Axios.get(API_URL + '/users/lastState/' + userData.user._id).then(res => {
                course = (res.data.course);
                folder = (res.data.folder);
                file = (res.data.file.title);
                setSelected((courseData.filter(c => c.name === course))[0]);
                setDone(true);
            })
        } catch (e) {
            console.log(e)
        }
    }
    console.log(selected);
    return (<>

        <Row className="top-nav py-1">
            <Col lg={3}>
                <Select
                    options={courseData}
                    valueField="_id"
                    disabled={false}
                    onChange={(val) => { setSelected(val[0]) }}
                    labelField="name"
                    placeholder={selected.name}
                    separator={true}
                    dropdownHandleRenderer={({ state }) => (
                        <span className="pl-1">{state.dropdown ? " –" : " +"}</span>
                    )}
                    closeOnSelect={true}
                    backspaceDelete={false}
                />
            </Col>
            <Col lg={8} className="">
                <p className="text-center">dashboard nav links, search, etc will be here</p>
            </Col>
        </Row>
        {userData.user.admin ? (
            <AdminCourses course={selected} />
        ) : (
            <UserCourses course={selected} />
        )}
    </>)
}

export default Home;