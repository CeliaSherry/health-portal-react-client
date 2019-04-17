import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import "./TopNav.css"

const TopNav = ({loggedIn, user}) =>
    <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
                <a className="navbar-brand" href="/">
                    Health Portal
                </a>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/profile">
                            Profile
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/search">
                            Search
                        </a>
                    </li>
                </ul>
                <Link to={`/login`} style={{display: loggedIn ? 'none' : 'block'}}>
                    <button className="btn btn-primary pull-right" type="button">
                        Login
                    </button>
                </Link>
                <li id="navText" style={{display: loggedIn ? 'block' : 'none'}} className="nav-item pull-right">
                    Hello {user.username}
                </li>
            </div>
        </nav>

    </div>
export default TopNav;
