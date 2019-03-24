import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>
                    Home Page
                </h1>
            </div>
        )
    }
}
export default Home;
