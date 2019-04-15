import React from 'react'
import TopNav from "../components/TopNav";
import UserService from "../services/UserService";
import {Link} from "react-router-dom";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.state = {
            username: '',
            password: '',
            verifyPassword: ''
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.verifyPasswordChange = this.verifyPasswordChange.bind(this);
    }

    handleUsernameChange(event) {
        this.setState(
            {
                username: event.target.value
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

    register = () => {
        const username = this.state.username;
        const password = this.state.password;
        const verifyPassword = this.state.verifyPassword;
        if(password == verifyPassword) {
            let newUser = {
                username: username,
                password: password

            }
            this.userService
                .register(newUser)
                .then(user =>
                    this.setState({user: user})
                );
        } else {
            alert("Passwords Don't Match- Not Logged In")
        }
    }


    render() {
        return (
            <div className="container-fluid">
                <TopNav/>
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
                        <label htmlFor="verifypassword"
                               className="col-sm-2">
                            Verify Password
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   id="password"
                                   placeholder="!@#$QWERzxc"
                                   value={this.state.verifyPassword}
                                   onChange={this.verifyPasswordChange}/>
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
        )
    }
}

export default Register;
