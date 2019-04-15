import React from 'react'
import TopNav from "../components/TopNav";
import UserService from "../services/UserService";
import ArticleService from "../services/ArticleService";

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
        if(this.state.loggedIn == false) {
            this.loggedIn();
        }
    }
   //     this.loggedIn();


    loggedIn = () =>
        this.userService.loggedIn()
            .then(boolean =>
                this.setState ({
                    loggedIn: boolean
                }))


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
