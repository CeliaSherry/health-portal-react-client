import React from "react";
import {Link} from "react-router-dom";

class ArticleCard extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p className="card-text">
                            {this.props.text}
                        </p>
                        <Link to={`/article/${this.props.id}`}>
                            <button className="btn btn-primary">See Article</button>
                        </Link>
                    </div>
                </div>
                <div>&nbsp;</div>
            </div>
        )
    }

}

export default ArticleCard;
