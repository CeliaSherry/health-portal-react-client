import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const TopNav = ({}) =>
    <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
                <a className="navbar-brand" href="#">
                    Health Portal
                </a>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Profile
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Search
                        </a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0 d-sm-none d-md-block">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-success my-2 my-sm-0" type="submit">
                            Search
                        </button>
                </form>
            </div>
        </nav>

    </div>
export default TopNav;
