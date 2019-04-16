import React from 'react'
import TopNav from "./TopNav";
import {Link} from "react-router-dom";
import ArticleService from "../services/ArticleService";
import CustomerService from "../services/CustomerService";
import UserService from "../services/UserService";

class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.articleService = ArticleService.getInstance();
        this.customerService = CustomerService.getInstance();
        this.userService = UserService.getInstance();
        this.state = {
            articles: [],
            loggedIn: false,
            specialArticles: []
        }
    }

    componentDidMount = () =>
        this.findAllArticles();

    componentDidUpdate = () => {
        if (this.state.loggedIn == false) {
            this.loggedIn();
        }
    }

    findAllArticles = () =>
        this.articleService.findAllArticles()
            .then(articles =>
                this.setState ({
                    articles: articles
                }))


    loggedIn = () =>
        this.userService.loggedIn()
            .then(boolean =>
                this.setState({
                    loggedIn: boolean
                }))
            .then(() => this.loggedInUser())

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
            .then(() =>{
                if(this.state.role == 'CUS') {
                    this.getFavoritedArticles()
                } else if(this.state.role == 'PRO'){
                    this.getAuthoredArticles()
                }
            })
    }

    getFavoritedArticles = () => {
        const userId = this.state.user.id;
        this.customerService.findFavoritedArticles(userId)
            .then(articles =>
                this.setState({
                    specialArticles: articles
                }))
    }

    getAuthoredArticles = () => {
        const providerId = this.state.user.id;
        this.articleService.findArticlesForProvider(providerId)
            .then(articles =>
                this.setState({
                    spacialArticles: articles
                }))
    }


    renderData() {
        var articles;
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

    renderRoleData() {
        if (this.state.role == 'CUS') {
            var items;
            items = this.state.specialArticles
                .map(function (item, index) {
                    return <tr key={index}>
                        <td>
                            <Link to={`/article/${item.id}`}>
                                <i className="fa fa-file">&nbsp;</i>
                                {item.title}
                            </Link>
                        </td>
                    </tr>
                })

            return (
                <div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Favorited Articles</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else if (this.state.role == 'PRO') {
            var items;
            items = this.state.spacialArticles
                .map(function (item, index) {
                    return <tr key={index}>
                        <td>
                            <Link to={`/article/${item.id}`}>
                                <i className="fa fa-file">&nbsp;</i>
                                {item.title}
                            </Link>
                        </td>
                    </tr>
                })

            return (
                <div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Authored Articles</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items}
                            </tbody>
                        </table>
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
                <h1 className="d-flex justify-content-center">
                    Health Portal
                </h1>
                <p className="d-flex justify-content-center">
                    This website is devoted to giving you the most accurate information about your health care questions available.
                    Search for providers and view articles they have authored.  Read and save articles for later reference.  Our goal
                    is to provide clarity in the confusing field of healthcare.
                </p>
                {this.renderData()}
                {this.renderRoleData()}
            </div>
        )
    }
}

export default LandingPage;
