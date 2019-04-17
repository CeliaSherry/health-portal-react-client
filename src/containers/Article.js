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
            loggedIn: false,
            editMode: false,
            title: '',
            text: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    componentDidMount = () =>
        this.findArticleById();

    componentDidUpdate = () => {
        if (this.state.loggedIn == false) {
            this.loggedIn();
        }
    }

    handleTitleChange(event) {
        this.setState(
            {
                title: event.target.value
            }
        );
    }

    handleTextChange(event) {
        this.setState(
            {
                text: event.target.value
            }
        );
    }

    favoriteArticle = () => {
        const customerId = this.state.user.id;
        const articleId = this.state.articleId;
        this.customerService
            .favorite(customerId, articleId)
            .then(() => this.findArticleById())
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

    findAuthor = () => {
        const aid = this.state.articleId;
        this.articleService.findAuthor(aid)
            .then(author =>
                this.setState({
                    author: author
                }))
            .then(() => console.log(this.state.author))
    }


    findArticleById = () => {
        var aid = this.state.articleId;
        this.articleService.findArticleById(aid)
            .then(article =>
                this.setState({
                    article: article,
                    title: article.title,
                    text: article.text
                }))
            .then(() => this.articleService.findFavoritedCustomers(aid)
                .then(customers =>
                    this.setState({
                        customers: customers
                    })))
            .then(() => this.findAuthor())
    }

    editMode = () => {
        this.setState({
            editMode: true
        })
    }

    updateArticle = () => {
        const title = this.state.title;
        const text = this.state.text;
        const articleId = this.state.articleId
        let newArticle = {
            title: title,
            text: text
        }

        this.articleService.updateArticle(articleId, newArticle)
            .then(article =>
                this.setState({
                    article: article,
                    title: article.title,
                    text: article.text,
                    editMode: false
                })
            )
            .then(() => this.findArticleById())


    }


    deleteArticle = () => {
        const articleId = this.state.articleId;
        this.articleService
            .removeArticle(articleId)
            .then(() =>
                this.getAuthoredArticles());
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

    renderEditData() {
        if (this.state.customers) {
            return (
                <div>
                    <h1>
                        Edit Article
                    </h1>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="title"
                                   className="col-sm-2">
                                Title
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       value={this.state.title}
                                       onChange={this.handleTitleChange}
                                       id="title"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="text"
                                   className="col-sm-2">
                                Article Text
                            </label>
                            <div className="col-sm-10">
                                <textarea className="form-control"
                                       value={this.state.text}
                                       onChange={this.handleTextChange}
                                       rows="4"
                                       id="text">
                                </textarea>

                            </div>
                        </div>
                    </form>
                    <a onClick={() => this.updateArticle()}>
                        <button className="btn btn-success">Save</button>
                    </a>


                </div>
            )
        }
        if (!(this.state.article)) {
            return (
                <div></div>
            )
        }
    }

    renderCustomerData() {
        if (this.state.role == 'CUS' && this.state.author) {
            return (
                <div>
                    <a onClick={() => this.favoriteArticle()}>
                        Favorite: &nbsp;
                        <i className="fa fa-thumbs-up fa-4x">&nbsp;</i>
                    </a>
                    <div>
                   <Link to={`/profile/${this.state.author.id}`}>
                       Author: &nbsp;
                            <i className="fa fa-user">&nbsp;</i>
                            {this.state.author.firstName} {this.state.author.lastName}
                    </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    }


    renderProviderData() {
        if (this.state.role == 'PRO') {
            return (
                <div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <a onClick={() => this.editMode()}>
                            <button type="button" className="btn btn-primary">Edit</button>
                        </a>
                        <Link onClick={() => this.deleteArticle()} to="/profile">
                            <button type="button" className="btn btn-danger">Delete</button>
                        </Link>
                    </div>
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
                {!this.state.editMode && this.renderData()}
                {this.state.editMode && this.renderEditData()}
                {!this.state.editMode && this.renderProviderData()}
                {this.renderCustomerData()}
            </div>
        )
    }
}

export default Article;
