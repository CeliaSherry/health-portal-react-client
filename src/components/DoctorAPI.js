import React, {Component} from 'react';
import SearchDoctor from "./SearchDoctor";
import TopNav from "./TopNav";

class DoctorAPI extends Component {
    render() {
        return (
            <div>
                <TopNav/>
                <h1>
                    Test
                </h1>
                <SearchDoctor/>
            </div>
        )
    }
}

export default DoctorAPI;

