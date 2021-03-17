import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import FileManagement from '../components/FileManagement/FileManagement';
import Header from '../components/Header';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route component={Home} path="/" exact={true} />
                <Route component={Login} path="/login" exact={true} />
                <Route component={FileManagement} path="/file-management" exact={true} />
            </Switch>
        </BrowserRouter>
    ); 
};

export default AppRouter;