import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import UserContext from "../../context/UserContext.js";
import DashContext from "../../context/DashContext.js";
import AdminCourses from "./AdminDash/AdminCourses.jsx";
import UserCourses from "./UserDash/Courses/UserCourses.jsx";
import SearchResults from "../Search/SearchResults.jsx";
import SearchBar from "../Search/SearchBar.jsx";
import Search from "../../utils/search.js";
import { API_URL } from "../../utils/constants.js";
import Axios from "axios";

const Home = (props) => {
  const { userData, setUserData } = useContext(UserContext);
  const [courseData, setCourseData] = useState([]);
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchableList, setSearchableList] = useState({});
  const [showSearch, setShowSearch] = useState(false);

  const getCourseData = async () => {
    const url = API_URL + "/courses/allData";
    try {
      await Axios.post(url, { ids: userData.user.courses }).then((res) => {
        if (res === 1) console.log("Error: " + res.data);
        else if (res === 0) console.log("Error: user has no courses");
        else {
          setCourseData(res.data);
          setSelected(res.data[0]);
          setSearchableList(Search.makeSearchable(res.data));
        }
      });
    } catch {
      console.log("Could not collect course data");
    }
  };

  const handleSearchSelection = (e) => {
    // e.preventDefault();
    if (showSearch) console.log("hey");
  };

  useEffect(() => {
    getCourseData();
  }, []);

  useEffect(() => {
    if (search !== "") {
      const searchResults = Search.searchAll(search, searchableList);
      console.log(searchResults)
      setResults([]);
    }
  }, [search]);

  return (
    <>
      <Form>
        <Row className="top-nav pt-3 control-height">
          <Col lg={3}>
            <Form.Group controlId="select-course" className="course-selection">
              <Form.Control
                as="select"
                onChange={(e) =>
                  setSelected(
                    courseData.filter((c) => c._id === e.target.value)[0]
                  )
                }
              >
                {courseData.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <SearchBar
              search={search}
              setSearch={setSearch}
              setShowSearch={setShowSearch}
            />
            {showSearch && (
              <SearchResults
                results={[{ title: "yes" }, { title: "result" }]}
                handleSearchSelection={handleSearchSelection}
              />
            )}
          </Col>
        </Row>
        <hr className="m-0" />
      </Form>

      <DashContext.Provider value={{ course: selected, data: courseData }}>
        {courseData !== undefined && (
          <>{userData.user.admin ? <AdminCourses /> : <UserCourses />}</>
        )}
      </DashContext.Provider>
    </>
  );
};

export default Home;
