import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login/Login';
import FileManagement from '../components/FileManagement/FileManagement';
import Header from '../components/Header';
import UserContext from "../context/UserContext.js";

const AppRouter = () => {

    return (
        <UserContext.Provider value={{ "user":"Rushil" }} >
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route component={Home} path="/" exact={true} />
                    <Route component={Login} path="/login" exact={true} />
                    <Route component={FileManagement} path="/file-management" exact={true} />
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>

    );
};

export default AppRouter;