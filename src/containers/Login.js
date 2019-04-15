import React from 'react'
import TopNav from "../components/TopNav";
import {Link} from "react-router-dom";
import UserService from "../services/UserService";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.state = {
            username: '',
            password: ''
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

    login = () => {
        const username = this.state.username;
        const password = this.state.password;
        let newUser = {
            username: username,
            password: password
        }
        this.userService
            .login(newUser)
            .then(user =>
                this.setState(
                    {
                        user: user,
                    }))
            .then(() => console.log(this.state.user))
    }


    render() {
        return (
            <div className="container-fluid">
                <TopNav/>
                <h1>
                    Login
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
                        <label className="col-sm-2"></label>
                        <div className="col-sm-10">
                            <Link onClick={() => this.login()} to={`/profile`}>
                                <button type="button" className="btn btn-primary">
                                    Sign In
                                </button>
                            </Link>
                            <Link to={`/`}>
                            <button className="btn btn-secondary">
                                Cancel
                            </button>
                            </Link>
                            <div className="form-group row">
                                <label htmlFor="login"
                                       className="col-sm-0">
                                </label>
                                <Link to="/register"
                                      className="btn btn-link">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;
