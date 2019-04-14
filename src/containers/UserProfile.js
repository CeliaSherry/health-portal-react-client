import React from 'react'
import TopNav from "../components/TopNav";

class UserProfile extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <TopNav/>
                <h1>
                    Profile
                </h1>
            </div>
        )
    }
}

export default UserProfile;
