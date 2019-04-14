import React from 'react'
import TopNav from "../components/TopNav";

class PersonalProfile extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <TopNav/>
                <h1>
                    Personal Profile
                </h1>
            </div>
        )
    }
}

export default PersonalProfile;
