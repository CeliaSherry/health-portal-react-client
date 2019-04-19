import React from "react";
import {Link} from "react-router-dom";

class AuthorProfileItem extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <h4 id="provider">
                <Link to={`/profile/${this.props.author.id}`}>
                    Provider: &nbsp;
                    <i className="fa fa-user">&nbsp;</i>
                    {this.props.author.firstName} {this.props.author.lastName}
                </Link>
                <i className="fa fa-trash float-right" id="trash" onClick={() => this.props.unsaveProvider()}> &nbsp;
                </i>
            </h4>
        )
    }

}

export default AuthorProfileItem;
