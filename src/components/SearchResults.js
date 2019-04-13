import React, {Component} from 'react';

class SearchResults extends Component {

    constructor(props) {
        super(props);
    }

    renderDoctors() {
        var items;
        if (this.props.doctors) {
            items = this.props.doctors.data
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
            <div>
                <h2>
                    Results
                </h2>
                {this.renderDoctors()}
            </div>
        )
    }

}

export default SearchResults;
