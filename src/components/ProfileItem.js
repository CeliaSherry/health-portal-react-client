import React from "react";
import {Link} from "react-router-dom";

class ProfileItem extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <tr key={this.props.index}>
                <Link to={`/profile/${this.props.id}`}>
                    <td>
                        <i className="fa fa-thumbs-up">&nbsp;</i>
                        {this.props.username} in {this.props.city}, {this.props.state}
                    </td>
                </Link>
            </tr>
        )
    }

}

export default ProfileItem;
