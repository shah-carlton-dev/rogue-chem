import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../components/App.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const AppRouter = () => (
  <BrowserRouter>
      <Header />
      <div className="main-content">
        <Switch>
          <Route component={} path="/" />
        </Switch>
      </div>
      <Footer />
  </BrowserRouter>
);

export default AppRouter;