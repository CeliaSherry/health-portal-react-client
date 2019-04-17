import React from 'react'
import TopNav from "../components/TopNav";
import {Link} from "react-router-dom";
import CustomerService from "../services/CustomerService";
import ProviderService from "../services/ProviderService";
import UserService from "../services/UserService";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.customerService = CustomerService.getInstance();
        this.providerService = ProviderService.getInstance();
        this.userService = UserService.getInstance();
        this.state = {
            username: '',
            password: '',
            verifyPassword: '',
            firstName: '',
            lastName: '',
            email: '',
            city: '',
            usState: '',
            role: 'CUS',
            user: {
                username: ''
            }
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.verifyPasswordChange = this.verifyPasswordChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailNameChange = this.handleEmailNameChange.bind(this);
        this.handleCityNameChange = this.handleCityNameChange.bind(this);
        this.handleStateNameChange = this.handleStateNameChange.bind(this);
    }

    handleUsernameChange(event) {
        this.setState(
            {
                username: event.target.value
            }
        );
    }

    handleRoleChange(event) {
        this.setState(
            {
                role: event.target.value
            }
        );
    }

    handlePasswordChange(event) {
        this.setState(
            {
                password: event.target.value
            }
        );
    }

    verifyPasswordChange = (event) => {
        this.setState(
            {
                verifyPassword: event.target.value
            });
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

    register = () => {
        const username = this.state.username;
        const password = this.state.password;
        const verifyPassword = this.state.verifyPassword;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const email = this.state.email;
        const city = this.state.city;
        const usState = this.state.usState;
        const role = this.state.role;
        if(password == verifyPassword) {
            let newUser = {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                city: city,
                state: usState

            }
            if(role == 'CUS'){
                 this.customerService
                     .register(newUser)
                     .then(user =>
                         this.setState({
                             user: user,
                             firstName: user.firstName,
                             lastName: user.lastName,
                             email: user.email,
                             city: user.city,
                             usState: user.state
                         })
                     );
            } else {
                this.providerService
                    .register(newUser)
                    .then(user =>
                        this.setState({user: user})
                    );
            }
        } else {
            alert("Passwords Don't Match- Not Logged In")
        }
    }


    render() {
        return (
            <div className="container-fluid">
                <TopNav loggedIn={false} user={this.state.user}/>
                <div id="backColor">
                <h1>
                    Register
                </h1>
                <form>
                    <div className="form-group row">
                        <label htmlFor="username"
                               className="col-sm-2">
                            Username
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   id="username"
                                   placeholder="Alice"
                                   value={this.state.username}
                                   onChange={this.handleUsernameChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password"
                               className="col-sm-2">
                            Password
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   id="password"
                                   placeholder="!@#$QWERzxc"
                                   value={this.state.password}
                                   onChange={this.handlePasswordChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="verifyPassword"
                               className="col-sm-2">
                            Verify Password
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   id="verifyPassword"
                                   placeholder="!@#$QWERzxc"
                                   value={this.state.verifyPassword}
                                   onChange={this.verifyPasswordChange}/>
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
                                   id="firstName"
                                   placeholder="First Name"/>
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
                                   id="lastName"
                                   placeholder="Last Name"/>
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
                                   id="email"
                                   placeholder="Email@gmail.com"/>
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
                                   id="city"
                                   placeholder="City"/>
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
                                   id="usState"
                                   placeholder="State"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="userType"
                               className="col-sm-2">
                            User Type
                        </label>
                        <div className="col-sm-10">
                            <select value={this.state.role}
                                    onChange={this.handleRoleChange}
                                    id="userType">
                                <option value="CUS">Customer</option>
                                <option value="PRO">Provider</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2"></label>
                        <div className="col-sm-10">
                            <Link onClick={() => this.register()} to={`/login`}>
                                <button type="button" className="btn btn-primary">
                                    Sign Up
                                </button>
                            </Link>
                            <button type="button" className="btn btn-secondary">
                                Cancel
                            </button>
                            <div className="form-group row">
                                <label htmlFor="login"
                                       className="col-sm-0">
                                </label>
                                <Link to="/" style={{color: 'black'}}>
                                    <Link to={'/login'}
                                          className="btn btn-link">
                                        Login
                                    </Link>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}

export default Register;
