import React from 'react'
import TopNav from "./TopNav";
import {Link} from "react-router-dom";
import ArticleService from "../services/ArticleService";
import CustomerService from "../services/CustomerService";

class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.articleService = ArticleService.getInstance();
        this.customerService = CustomerService.getInstance();
        this.state = {
            articles: []
        }
    }

    componentDidMount = () =>
        this.findAllArticles();

    findAllArticles = () =>
        this.articleService.findAllArticles()
            .then(articles =>
                this.setState ({
                    articles: articles
                }))
            .then(() => this.customerService.findFavoritedArticles(42)
                .then(favoritedArticles =>
                this.setState({
                    favoritedArticles: favoritedArticles
                })))


    renderData() {
        var articles;
        var items;
        if (this.state.favoritedArticles) {
            items = this.state.favoritedArticles
                .map(function (item, index) {
                    return <tr key={index}>
                        <Link to={`/article/${item.id}`}>
                            <td>
                                <i className="fa fa-thumbs-up">&nbsp;</i>
                                {item.title}
                            </td>
                        </Link>
                    </tr>
                });
        }
        if (this.state.articles) {
            articles = this.state.articles
                .map(function (item, index) {
                        return <tr key={index}>
                            <td>
                                <Link to={`/article/${item.id}`}>
                                    <i className="fa fa-file">&nbsp;</i>
                                    {item.title}
                                </Link>
                            </td>
                        </tr>

                });
        }
        if (this.state.articles) {
            return (
                <div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Articles Favorited By Me</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items}
                            </tbody>
                        </table>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Popular Articles</th>
                            </tr>
                            </thead>
                            <tbody>
                            {articles}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        if (!(this.state.articles)) {
            return (
                <div></div>
            )
        }

    }



    render() {
        return (
            <div className="container-fluid">
                <TopNav/>
                <h1 className="d-flex justify-content-center">
                    Health Portal
                </h1>
                <p className="d-flex justify-content-center">
                    This website is devoted to giving you the most accurate information about your health care questions available.
                    Search for providers and view articles they have authored.  Read and save articles for later reference.  Our goal
                    is to provide clarity in the confusing field of healthcare.
                </p>
                {this.renderData()}
            </div>
        )
    }
}

export default LandingPage;
