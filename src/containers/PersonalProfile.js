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
            loggedIn: false,
            firstName: '',
            lastName: '',
            email: '',
            city: '',
            usState: '',
            role: ''
        }

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailNameChange = this.handleEmailNameChange.bind(this);
        this.handleCityNameChange = this.handleCityNameChange.bind(this);
        this.handleStateNameChange = this.handleStateNameChange.bind(this);
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
        if (this.state.loggedIn == true) {
            this.userService.loggedInUser()
                .then(user =>
                    this.setState({
                        user: user,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        city: user.city,
                        usState: user.state
                    }))
                .then(() => this.getRole(this.state.user.id))
        }
    }

    getRole = (userId) => {
            console.log(userId);
            this.userService.findRoleByUserId(userId)
                .then(role =>
                    this.setState({
                        role: role
                    }))
                .then(() => console.log(this.state.role))

    }


    loggedIn = () =>
        this.userService.loggedIn()
            .then(boolean =>
                this.setState({
                    loggedIn: boolean
                }))
            .then(() => this.loggedInUser())




    updateUser = () => {
        const username = this.state.user.username;
        const password = this.state.user.password;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const email = this.state.email;
        const city = this.state.city;
        const usState = this.state.usState;
        const userId = this.state.user.id
        let newUser = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            city: city,
            state: usState
        }

        this.userService.updateUser(userId,newUser)
            .then(user =>
                this.setState({
                    user: user,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    city: user.city,
                    usState: user.state
                })
            )

    }

    logout = () => {
        this.userService.logout()
            .then(() =>
                this.setState({
                    user: null,
                    firstName: '',
                    lastName: '',
                    email: '',
                    city: '',
                    usState: ''
                })
            );
    }

    handleFirstNameChange(event) {
        this.setState(
            {
                firstName: event.target.value
            }
        );
    }

    handleLastNameChange(event) {
        this.setState(
            {
                lastName: event.target.value
            }
        );
    }

    handleEmailNameChange(event) {
        this.setState(
            {
                email: event.target.value
            }
        );
    }

    handleCityNameChange(event) {
        this.setState(
            {
                city: event.target.value
            }
        );
    }

    handleStateNameChange(event) {
        this.setState(
            {
                usState: event.target.value
            }
        );
    }


    renderData() {
        if (this.state.user) {
            return (
                <div>
                    <h1>
                        {this.state.user.id}
                    </h1>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="username"
                                   className="col-sm-2">
                                Username
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       readOnly
                                       value={this.state.user.username}
                                       id="username"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="firstName"
                                   className="col-sm-2">
                                First Name
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       value={this.state.firstName}
                                       onChange={this.handleFirstNameChange}
                                       id="firstName"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="lastName"
                                   className="col-sm-2">
                                Last Name
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       value={this.state.lastName}
                                       onChange={this.handleLastNameChange}
                                       id="lastName"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email"
                                   className="col-sm-2">
                                Email
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       type="email"
                                       value={this.state.email}
                                       onChange={this.handleEmailNameChange}
                                       id="email"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="city"
                                   className="col-sm-2">
                                City
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       value={this.state.city}
                                       onChange={this.handleCityNameChange}
                                       id="city"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="usState"
                                   className="col-sm-2">
                                State
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       value={this.state.usState}
                                       onChange={this.handleStateNameChange}
                                       id="usState"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2"></label>
                            <div className="col-sm-10">
                                <button type="button" className="btn btn-success btn-block"
                                        onClick={() => this.updateUser()}
                                        role="button">
                                    Update
                                </button>
                                <Link onClick={() => this.logout()} to="/">
                                    <button type="button" className="btn btn-danger btn-block">
                                        Logout
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
        if (!(this.state.user)) {
            return (
                <div>

                </div>
            )
        }
    }

    renderRoleData() {
                if (this.state.role == 'PRO') {
                    return (
                        <div>
                            Provider
                        </div>
                    )
                } else if (this.state.role == 'CUS') {
                    return (
                        <div>
                            Customer
                        </div>
                    )
                } else {
                    return (
                        <div>
                            None
                        </div>
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
                {this.renderRoleData()}
            </div>
        )
    }
}

export default PersonalProfile;
