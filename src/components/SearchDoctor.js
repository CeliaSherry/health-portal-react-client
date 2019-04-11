import React, {Component} from 'react';

class SearchDoctor extends Component {

    constructor() {
        super();
        this.state = {
            keyword: '',
            doctors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('https://api.betterdoctor.com/2016-03-01/doctors?location=ma-somerville&skip=0&limit=10&user_key=79e466f7a9238673f5bc113d0cab3177&practice_uid=7fe4e3005427fe2ae050fe42c14482cd')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    doctors: json
                })
            })
            .then(() => console.log(this.state.doctors.data[0].profile));
    }

    handleChange(event) {
        this.setState(
            {
                keyword: event.target.value
            }
        );
    }

    handleSubmit(event) {
        var api_key = '79e466f7a9238673f5bc113d0cab3177';
        var location = 'ma-somerville'

        var url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=';
        //url += this.state.keyword;
        url += location
        url += '&skip=0&limit=10&user_key='
        url += api_key
        console.log(url)
        // url += '&s=' + this.state.keyword;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({doctors: json.search});
            })
    }

    renderDoctors() {
   /*     var items;
        if(this.state.doctors) {
            items = this.state.doctors
                .map(function(item, index) {
                    return <li className="list-group-item"
                               key={index}>
                        {item.meta}
                    </li>
                });
        }
        return (
            <ul className="list-group">
                {items}
            </ul>
        )*/
    }


    render() {
        return (
            <div>
                <h1>
                    Test 2
                </h1>
                <div className="input-group">
                    <input className="form-control"
                           placeholder="keyword"
                           value={this.state.keyword}
                           onChange={this.handleChange}/>
                    <div className="input-group-append">
                            <button onClick={this.handleSubmit}>Search</button>
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

export default SearchDoctor;
