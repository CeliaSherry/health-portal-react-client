import React, {Component} from 'react';
import TopNav from "./TopNav";
import {Link} from "react-router-dom";
import UserService from "../services/UserService";

class ResultsPage extends Component {

    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
            this.state = {
                location: '',
                loggedIn: false,
                user: {
                    username: ''
                }
            };
            this.renderDoctors = this.renderDoctors.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () =>
        this.handleSubmit();

    componentDidUpdate = () => {
        if (this.state.loggedIn == false) {
            this.loggedIn();
        }
    }

    loggedIn = () =>
        this.userService.loggedIn()
            .then(boolean =>
                this.setState({
                    loggedIn: boolean
                }))
            .then(() => this.loggedInUser())

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
        }
    }

        handleSubmit(event) {
            var api_key = '79e466f7a9238673f5bc113d0cab3177';
            var url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=';
            var newLocation = this.props.match.params.criteria;
            this.location = newLocation
            url += newLocation
            // url += location
            url += '&skip=0&limit=10&user_key='
            url += api_key

            fetch(url)
                .then(res => res.json())
                .then(json => {
                    this.setState({doctors: json, location: newLocation});
                })
        }

    renderDoctors() {
        var items;
       /* this.handleSubmit();*/
        if (this.state.doctors) {
            if(this.state.location) {
                var newLoc = this.state.location
                items = this.state.doctors.data
                    .map(function (item, index) {
                        return <tr key={index}>
                            <td>
                                <i className="fa fa-stethoscope">&nbsp;</i>
                                {item.profile.first_name} {item.profile.last_name}
                            </td>
                            <td className="d-none d-sm-table-cell">
                                {item.profile.title}
                            </td>
                            <td className="d-none d-sm-table-cell">
                                {item.specialties[0].name}
                            </td>
                            <td>
                                <Link to={`/details/${newLoc}/practice/${item.practices[0].uid}`}>
                                {/*<Link to={'/details'}>*/}
                                    <button className="btn btn-success pull-right" type="button">
                                        Details
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    });
            }
        }
        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th className="d-none d-sm-table-cell">Title</th>
                        <th className="d-none d-sm-table-cell">Specialty</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <div className="container-fluid">
                <TopNav loggedIn={this.state.loggedIn} user={this.state.user}/>
                <div id="backColor">
                <div> &nbsp;
                </div>
                <h2>
                    Results
                    <Link to={'/search'}>
                    <button className="btn btn-primary pull-right" type="button">
                        Back to Search
                    </button>
                    </Link>
                </h2>
                {this.renderDoctors()}
            </div>
            </div>
        )
    }

}

export default ResultsPage;
