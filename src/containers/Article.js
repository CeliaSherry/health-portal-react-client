import React from 'react'
import TopNav from "../components/TopNav";
import ArticleService from "../services/ArticleService";
import {Link} from "react-router-dom";

class Article extends React.Component {

    constructor(props) {
        super(props);
        this.articleService = ArticleService.getInstance();
        this.state = {
            articleId: this.props.match.params.articleId
        }
    }

    componentDidMount = () =>
        this.findArticleById();


    findArticleById = () => {
        var aid = this.state.articleId;
        this.articleService.findArticleById(aid)
            .then(article =>
                this.setState({
                    article: article
                }))
            .then(() => this.articleService.findFavoritedCustomers(aid)
                .then(customers =>
                    this.setState({
                        customers: customers
                    })))
            .then(() => console.log(this.state.customers))
    }

    renderData() {
        var items;
        if (this.state.customers) {
            items = this.state.customers
                .map(function (item, index) {
                    return <tr key={index}>
                        <Link to={`/profile/${item.id}`}>
                            <td>
                                <i className="fa fa-thumbs-up">&nbsp;</i>
                                {item.username} in {item.city}, {item.state}
                            </td>
                        </Link>
                    </tr>
                });
        }
        if (this.state.customers) {
            return (
                <div>
                    <h1>
                        {this.state.article.title}
                    </h1>
                    <h4>
                        {this.state.article.date}
                    </h4>
                    <p>
                        {this.state.article.text}
                    </p>
                    <div>&nbsp;</div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Article Liked By:</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        if (!(this.state.article)) {
            return (
                <div></div>
            )
        }

    }

    render() {
        return (
            <div className="container-fluid">
                <TopNav/>
                {this.renderData()}
            </div>
        )
    }
}

export default Article;
