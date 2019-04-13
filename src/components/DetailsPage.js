import React, {Component} from 'react';
import TopNav from "./TopNav";
import {Link} from "react-router-dom";

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: ''
        };
        this.renderData = this.renderData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () =>
        this.handleSubmit();


    handleSubmit(event) {
        var api_key = '79e466f7a9238673f5bc113d0cab3177';
        var url = 'https://api.betterdoctor.com/2016-03-01/doctors?practice_uid=';
        var location = this.props.match.params.location;
        var practiceId = this.props.match.params.practiceId;
        url += practiceId;
        url += '&location=';
        url += location
        // url += location
        url += '&skip=0&limit=10&user_key='
        url += api_key

        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({doctors: json, location: this.props.match.params.location});
            })
    }

    renderData() {
        var items;
        var details;
        if (this.state.doctors) {
            items = this.state.doctors.data
                .map(function (item, index) {
                    return <tr key={index}>
                        <td>
                            <i className="fa fa-stethoscope">&nbsp;</i>
                            {item.profile.first_name} {item.profile.last_name}
                        </td>
                    </tr>
                });
        }
        if (this.state.doctors) {
            return (
                <div>
                    <h1>
                        {this.state.doctors.data[0].practices[0].visit_address.street}
                    </h1>
                    <h1>
                        {this.state.doctors.data[0].practices[0].visit_address.city}, {this.state.doctors.data[0].practices[0].visit_address.state}
                    </h1>
                    <h3>
                        {this.state.doctors.data[0].specialties[0].name}: {this.state.doctors.data[0].specialties[0].description}
                    </h3>
                    <div>&nbsp;</div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Providers</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        if (!(this.state.doctors)) {
            return (
                <div></div>
            )
        }

    }

    render() {
        return (
            <div className="container-fluid">
                <TopNav/>
                <div> &nbsp;
                </div>
                <h2>
                    Details
                    <Link to={`/search/${this.state.location}`}>
                        <button className="btn btn-primary pull-right" type="button">
                            Back to Results
                        </button>
                    </Link>
                </h2>
                {this.renderData()}
            </div>
        )
    }

}

export default Details;
