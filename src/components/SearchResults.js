import React, {Component} from 'react';

class SearchResults extends Component {

    constructor(props) {
        super(props);
    }

    renderDoctors() {
        var items;
        if(this.props.doctors) {
            items = this.props.doctors.data
                .map(function(item, index) {
                    return <li className="list-group-item"
                               key={index}>
                        {item.profile.first_name}
                    </li>
                });
        }
        return (
            <ul className="list-group">
                {items}
            </ul>
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
