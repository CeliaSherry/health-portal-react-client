import React, {Component} from 'react';
import SearchResults from "./SearchResults";

class SearchDoctor extends Component {

    constructor() {
        super();
        this.state = {
            usState: '',
            usCity: ''
        };
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleStateChange(event) {
        this.setState(
            {
                usState: event.target.value
            }
        );
    }

    handleCityChange(event) {
        this.setState (
            {
                usCity: event.target.value
            }
        )
    }

    handleSubmit(event) {
        var api_key = '79e466f7a9238673f5bc113d0cab3177';
        var url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=';
        url += this.state.usState;
        url += '-';
        url += this.state.usCity;
       // url += location
        url += '&skip=0&limit=10&user_key='
        url += api_key

        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({doctors: json});
            })
    }


    render() {
        return (
            <div>
                <h1>
                    Test 2
                </h1>
                <div className="input-group">
                    <input className="form-control"
                           placeholder="state"
                           value={this.state.usState}
                           onChange={this.handleStateChange}/>
                    <input className="form-control"
                           placeholder="city"
                           value={this.state.usCity}
                           onChange={this.handleCityChange}/>
                    <div className="input-group-append">
                            <button onClick={this.handleSubmit}>Search</button>
                    </div>
                </div>
                <SearchResults doctors={this.state.doctors}/>
            </div>
        )
    }


}

export default SearchDoctor;
