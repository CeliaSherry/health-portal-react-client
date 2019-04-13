import React from 'react'
import TopNav from "./TopNav";

class LandingPage extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <TopNav/>
                <h1>
                    Landing Page
                </h1>
            </div>
        )
    }
}

export default LandingPage;
