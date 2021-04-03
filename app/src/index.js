import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from './router/AppRouter';

ReactDOM.render(<>
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
</>, document.getElementById('root'));
