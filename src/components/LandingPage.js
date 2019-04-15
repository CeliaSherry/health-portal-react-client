import React from 'react'
import TopNav from "./TopNav";
import {Link} from "react-router-dom";

class LandingPage extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <TopNav/>
                <h1 className="d-flex justify-content-center">
                    Health Portal
                </h1>
                <p className="d-flex justify-content-center">
                    This website is devoted to giving you the most accurate information about your health care questions available.
                    Search for providers and view articles they have authored.  Read and save articles for later reference.  Our goal
                    is to provide clarity in the confusing field of healthcare.
                </p>
            </div>
        )
    }
}

export default LandingPage;
