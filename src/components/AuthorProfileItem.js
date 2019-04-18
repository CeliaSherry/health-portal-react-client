import React from "react";
import {Link} from "react-router-dom";

class AuthorProfileItem extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Link to={`/profile/${this.props.author.id}`}>
                    <i className="fa fa-user">&nbsp;</i>
                    {this.props.author.firstName} {this.props.author.lastName}
                </Link>
            </div>
        )
    }

}

export default AuthorProfileItem;
