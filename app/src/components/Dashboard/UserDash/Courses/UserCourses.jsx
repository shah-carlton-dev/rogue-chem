import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import ResizePanel from "react-resize-panel";
import "../../../../styles/UserCourses.css";
import CourseInfo from "./CourseInfo.jsx";
import FolderInfo from "./FolderInfo.jsx";
import FileInfo from "./FileInfo.jsx";
import PreviewRender from "./PreviewRender.jsx";
import { API_URL } from "../../../../utils/constants.js";
import Axios from "axios";
import { Col } from "react-bootstrap";
import DashContext from "../../../../context/DashContext.js";

// component containing entire use dashboard (minus dashboard nav)

const UserCourses = () => {
  const history = useHistory();
  sessionStorage.clear();
  sessionStorage.setItem("last-route", history.location.pathname); //doesn't work, forces all reloads to end up here

  const { course, data } = useContext(DashContext);
  let loading = false;
  if (data[0] === undefined) loading = true;

  const [sections, setSections] = useState([]);
  const [sectionChange, setSectionChange] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [previewChange, setPreviewChange] = useState(undefined);
  const [preview, setPreview] = useState({});
  const [section, setSection] = useState("");

  const getPreview = async (id) => {
    const url = API_URL + "/getFile/" + id;
    try {
      if (id !== 0 && id !== undefined) {
        await Axios.get(url).then((res) => {
          setPreview(res.data);
        });
      }
    } catch {}
  };

  const getFileData = async (id) => {
    const url = API_URL + "/courses/files/" + id;
    const vURL = API_URL + "/courses/videos/" + id;
    try {
      if (sections !== undefined) {
        setSection(sections.filter((s) => s._id === id)[0]);
      }
    } catch {}
    try {
      if (id !== 0) {
        await Axios.get(url).then((res) => {
          setFiles(res.data);
          if (res.data[0]) setPreviewChange(res.data[0]._id);
        });
      }
    } catch {}
    // now, we yoink the video data
    try {
      if (id !== 0) {
        await Axios.get(vURL).then((res) => {
          setVideos(res.data);
          if (res.data[0] && previewChange !== 0)
            // if there is a video, and preview isn't a PDF set video as preview
            setPreviewChange(res.data[0].id);
        });
      }
    } catch {}
  };

  const getSectionData = async (id) => {
    const url = API_URL + "/courses/sections/" + id;
    try {
      if (id !== undefined) {
        await Axios.get(url).then((res) => {
          setSections(res.data);
          setSectionChange(res.data[0]._id);
        });
      }
    } catch {}
  };

  useEffect(() => {
    if (!loading) {
      const sections_temp = data.filter((c) => c._id === course._id)[0]
        .sections;
      setSections(sections_temp === undefined ? null : sections_temp);
      setSectionChange(
        data.filter((c) => c._id === course._id)[0].sections[0]._id
      );
    }
  }, [course]);

  useEffect(() => {
    if (sectionChange !== undefined) getFileData(sectionChange);
  }, [sectionChange]);

  useEffect(() => {
    if (previewChange !== undefined) getPreview(previewChange);
  }, [previewChange]);

  if (data[0] === undefined) return <>loading</>;

  return (
    <>
      <div className="usercourses-container">
        <ResizePanel
          direction="s"
          handleClass="customHandle"
          borderClass="customResizeBorder"
          style={{ height: "20vh" }}
        >
          <div className="content-area">
            <div className="header panel container">
              <CourseInfo
                things={{
                  courseName: course.name,
                  sections,
                  setSectionChange,
                  sectionChange,
                }}
              />
            </div>
          </div>
        </ResizePanel>
        <div className="content-area">
          <Col xs={4}>
            <div className="content panel right-border">
              <FolderInfo
                files={files}
                setPreviewChange={setPreviewChange}
                section={section}
              />
            </div>
          </Col>
          <Col xs={5} className="preview-render right-border">
            <div className="content panel preview-render">
              <PreviewRender preview={preview} />
            </div>
          </Col>
          <Col xs={3}>
            <div className="content panel ">
              <FileInfo preview={preview} />
            </div>
          </Col>
        </div>
      </div>
    </>
  );
};

export default UserCourses;
