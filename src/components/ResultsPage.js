import React, {Component} from 'react';
import TopNav from "./DoctorAPI";
import {Link} from "react-router-dom";

class ResultsPage extends Component {

    constructor(props) {
        super(props);
            this.state = {
                location: ''
            };
            this.renderDoctors = this.renderDoctors.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }

        handleSubmit(event) {
            var api_key = '79e466f7a9238673f5bc113d0cab3177';
            var url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=';
            var location = this.props.match.params.criteria
            url += location
            // url += location
            url += '&skip=0&limit=10&user_key='
            url += api_key

            fetch(url)
                .then(res => res.json())
                .then(json => {
                    this.setState({doctors: json});
                })
        }

    renderDoctors() {
        var items;
        this.handleSubmit();
        if (this.state.doctors) {
            items = this.state.doctors.data
                .map(function (item, index) {
                    return <tr key={index}>
                        <td>
                            <i className="fa fa-stethoscope">&nbsp;</i>
                            {item.profile.first_name} {item.profile.last_name}
                        </td>
                        <td>
                            {item.profile.title}
                        </td>
                        <td>
                            {item.specialties[0].name}
                        </td>
                    </tr>
                });
        }
        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Specialty</th>
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
                <div> &nbsp;
                </div>
                <div className="form-group row">
                    <label className="col-sm-0"></label>
                    <div className="col-sm-10">
                        <Link to={`/search`}>
                            <button
                                type="button"
                                className="btn btn-primary">
                                Back to Search
                            </button>
                        </Link>
                    </div>
                </div>
                <h2>
                    Results
                </h2>
                {this.renderDoctors()}
            </div>
        )
    }

}

export default ResultsPage;
