import React from 'react'
import TopNav from "../components/TopNav";
import ArticleService from "../services/ArticleService";
import UserService from "../services/UserService";

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.state = {
            user: ''
        }
    }

    componentDidMount = () =>
        this.findUserById();


    findUserById = () => {
        var userId = this.props.match.params.profileId;
        this.userService.findUserById(userId)
            .then(user =>
                this.setState({
                    user: user
                }))
            .then(() => console.log(this.state.user))
    }


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
