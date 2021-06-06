import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import UserContext from "../../context/UserContext.js";
import AdminCourses from "../AdminDash/AdminCourses.jsx";
import UserCourses from "../UserDash/Courses/UserCourses.jsx";
import Select from 'react-dropdown-select';
import { API_URL } from '../../utils/constants.js';
import Axios from "axios";
import DisplayContext from "../../context/DisplayContext.js";
import { useHistory } from "react-router-dom";

let currCourse = { id: null, name: "" };
let currFolder = { id: null, name: "" };
let currFile = { id: null, name: "" };
// let currState = { currCourse, currFolder, currFile };

const Home = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const [courseData, setCourseData] = useState([]); // info on the courses that the user is enrolled in
    const [lastState, setLastState] = useState({}); // prev state from last session, updated on session end
    const [currState, setCurrState] = useState({ currCourse, currFolder, currFile })

    // const history = useHistory();
    // sessionStorage.clear();
    // sessionStorage.setItem("last-route", history.location.pathname);

    useEffect(() => {
        console.log("use effect")
        getCourseData(); // get up to date course data when component mounts
        getLastState(); // get info on initial state on first mount
        // return async function cleanup() {
            // updateLastState(); // update last state when component unmounts -- need to handle tab closure/refresh
        // }
    }, [])

    const getCourseData = async () => {
        try {
            await Axios.get(API_URL + '/users/courseInfo/' + userData.user._id).then(res => {
                if (res.status === 204)
                    console.log("User does not have any courses");
                else if (res.status !== 200)
                    console.log("Error retrieving user's courses");
                else {
                    setCourseData(res.data);
                    console.log(res)
                    setCurrCourse(res.data[0].id, res.data[0].name);
                }
            });
        } catch {
            console.log("Error: courses.jsx -> getCourseData")
        }
    }

    const getLastState = async () => {
        if (courseData !== {}) {
            try {
                await Axios.get(API_URL + '/users/lastState/' + userData.user._id).then(res => {
                    setLastState(res.data);
                    console.log(res.data)
                    setCurrState({ currCourse: res.data.course, currFolder: res.data.folder, currFile: res.data.file });
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    const updateLastState = async () => {
        await Axios.post(
            API_URL + "/users/lastState",
            { userId: userData.user._id, recent: currState }
        ).then(res => {
            if (res.data) {
                // successful update
            } else {
                // update failed
            }
        });
    }

    const setCurrCourse = (id, name) => {
        currCourse = { id, name };
        setCurrState({currCourse, currFolder, currFile})
    }
    const setCurrFolder = (id, name) => currFolder = { id, name };
    const setCurrFile = (id, name) => currFile = { id, name };
    // const setCurrState = (currCourse, currFolder, currFile) => currState = { currCourse, currFolder, currFile };

    return (<>
        <Row className="top-nav py-1">
            <Col lg={3}>
                {console.log(courseData)}
                <Select
                    options={courseData}
                    valueField="id"
                    disabled={false}
                    onChange={(val) => { setCurrCourse(val[0].id, val[0].name); console.log(currState) }}
                    labelField="name"
                    separator={true}
                    dropdownHandleRenderer={({ state }) => (
                        <span className="pl-1">{state.dropdown ? " –" : " +"}</span>
                    )}
                    closeOnSelect={true}
                    placeholder={"Switch course"}
                    backspaceDelete={false}
                />
            </Col>
            <Col lg={8} className="">
                <p className="text-center">dashboard nav links, search, etc will be here</p>
            </Col>
        </Row>
        {userData.user.admin ? (
            <AdminCourses props={lastState} />
        ) : (<>
            <UserCourses currState={currState} setCurrCourse={setCurrCourse} setCurrFolder={setCurrFolder} setCurrFile={setCurrFile} lastState={lastState} />
        </>
        )}
    </>)
}

export default Home;