import React, { useContext } from 'react';
import UserContext from "../context/UserContext.js";

const Home = (props) => {
    const { userData, setUserData } = useContext(UserContext);

    return (
        <>
            <h1> Home </h1>
            <p className="text-center"> Welcome, {" " + userData.user.fname} </p>
        </>
    );
};

export default Home;