import React from 'react'
import TopNav from "../components/TopNav";
import UserService from "../services/UserService";
import ArticleService from "../services/ArticleService";
import {Link} from "react-router-dom";

class PersonalProfile extends React.Component {

    /*constructor(props) {
        super(props);
        console.log(this.props.location.state.loggedIn)
    }*/

    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.state = {
            test: false,
            loggedIn: false
        }
    }


    componentDidMount = () =>
        this.loggedIn();

    componentDidUpdate = () => {
        if (this.state.loggedIn == false) {
            this.loggedIn();
        }
    }
    //     this.loggedIn();

    loggedInUser = () => {
        if(this.state.loggedIn == true) {
            this.userService.loggedInUser()
                .then(user =>
                    this.setState({
                        user: user
                    }))
        }
    }


    loggedIn = () =>
        this.userService.loggedIn()
            .then(boolean =>
                this.setState({
                    loggedIn: boolean
                }))
            .then(() => this.loggedInUser())
          //  .then(() => this.userService.loggedInUser()
          //      .then(user =>
          //          this.setState({
          //              user: user
          //          })))


    renderData() {
        if (this.state.user) {
            return (
                <div>
                   <h1>
                        {this.state.user.username}
                    </h1>
                </div>
            )
        }
        if (!(this.state.user)) {
            return (
                <div></div>
            )
        }

    }

    render() {
        return (
            <div className="container-fluid">
                <TopNav/>
                <h1>
                    Personal Profile
                </h1>
                {this.renderData()}
            </div>
        )
    }
}

export default PersonalProfile;
