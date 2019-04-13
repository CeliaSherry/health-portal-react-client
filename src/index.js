import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Home from './components/Home';
import DoctorAPI from './components/DoctorAPI'

ReactDOM.render(
    <div className="container-fluid">
        {/*<Home/>*/}
        <Home/>
    </div>,
    document.getElementById("root")
)
