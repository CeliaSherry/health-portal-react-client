import React from 'react'
import TopNav from "../components/TopNav";
import ArticleService from "../services/ArticleService";
import {Link} from "react-router-dom";
import UserService from "../services/UserService";
import CustomerService from "../services/CustomerService";
import ProviderService from "../services/ProviderService";

class Article extends React.Component {

    constructor(props) {
        super(props);
        this.articleService = ArticleService.getInstance();
        this.userService = UserService.getInstance();
        this.customerService = CustomerService.getInstance();
        this.providerService = ProviderService.getInstance();
        this.state = {
            articleId: this.props.match.params.articleId,
            loggedIn: false
        }
    }

    componentDidMount = () =>
        this.findArticleById();

    componentDidUpdate = () => {
        if (this.state.loggedIn == false) {
            this.loggedIn();
        }
    }

    favoriteArticle = () => {
        const customerId = this.state.user.id;
        const articleId = this.state.articleId;
        this.customerService
            .favorite(customerId, articleId)
    }

    loggedInUser = () => {
        if (this.state.loggedIn == true) {
            this.userService.loggedInUser()
                .then(user =>
                    this.setState({
                        user: user,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        city: user.city,
                        usState: user.state
                    }))
                .then(() => this.getRole(this.state.user.id))
        }
    }

    getRole = (userId) => {
        this.userService.findRoleByUserId(userId)
            .then(role =>
                this.setState({
                    role: role
                }))
            .then(() => {
                if (this.state.role == 'CUS') {
                    this.getFavoritedArticles()
                } else if (this.state.role == 'PRO') {
                    this.getAuthoredArticles()
                }
            })
    }


    getFavoritedArticles = () => {
        const userId = this.state.user.id;
        this.customerService.findFavoritedArticles(userId)
            .then(articles =>
                this.setState({
                    articles: articles
                }))
    }

    getAuthoredArticles = () => {
        const providerId = this.state.user.id;
        this.articleService.findArticlesForProvider(providerId)
            .then(articles =>
                this.setState({
                    articles: articles
                }))
    }


    loggedIn = () =>
        this.userService.loggedIn()
            .then(boolean =>
                this.setState({
                    loggedIn: boolean
                }))
            .then(() => this.loggedInUser())


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

    renderRoleData() {
        if (this.state.role == 'CUS') {
            return (
                <div>
                    <a onClick={() => this.favoriteArticle()}>
                        Favorite: &nbsp;
                        <i className="fa fa-thumbs-up fa-4x">&nbsp;</i>
                    </a>
                </div>
            )
        } else if (this.state.role == 'PRO') {
            return (
                <div>
                    Provider
                </div>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <TopNav/>
                {this.renderData()}
                {this.renderRoleData()}
            </div>
        )
    }
}

export default Article;
