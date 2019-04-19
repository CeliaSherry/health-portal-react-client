import React from "react";
import {Link} from "react-router-dom";

class ArticleItem extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <tr key={this.props.index}>
                <td>
                    <button className="btn btn-success btn-sm pull-right"
                            type="button"
                            onClick={this.props.unfavorite()}>
                        Unfavorite
                    </button>
                </td>
                <td>
                    <Link to={`/article/${this.props.id}`}>
                        <i className="fa fa-file">&nbsp;</i>
                        {this.props.title}
                    </Link>
                </td>
            </tr>
        )
    }

}

export default ArticleItem;
