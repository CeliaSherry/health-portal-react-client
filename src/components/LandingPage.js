import React from 'react'
import TopNav from "./TopNav";
import {Link} from "react-router-dom";
import ArticleService from "../services/ArticleService";
import CustomerService from "../services/CustomerService";
import UserService from "../services/UserService";
import "./LandingPage.css";
import ArticleItem from "./ArticleItem";
import ArticleCard from "./ArticleCard";

class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.articleService = ArticleService.getInstance();
        this.customerService = CustomerService.getInstance();
        this.userService = UserService.getInstance();
        this.state = {
            articles: [],
            loggedIn: false,
            specialArticles: [],
            user: {
                username: ''
            }
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
                this.setState({
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
                    specialArticles: articles
                }))
    }

    getAuthoredArticles = () => {
        const providerId = this.state.user.id;
        this.articleService.findArticlesForProvider(providerId)
            .then(articles =>
                this.setState({
                    specialArticles: articles
                }))
    }


    renderData() {
        var articles;
        if (this.state.articles) {
            articles = this.state.articles
                .map(function (item, index) {
                    return <ArticleCard id={item.id}
                        title={item.title}
                        text={item.text}/>
                });
        }
        if (this.state.articles) {
            return (
                <div>
                    <h4>Popular Articles</h4>
                    <div className="card-deck">
                        {articles}
                    </div>
                    <div>&nbsp;</div>
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
                    return <ArticleItem key={index}
                                        id={item.id}
                                        title={item.title}/>
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
            items = this.state.specialArticles
                .map(function (item, index) {
                    return <ArticleItem key={index}
                                        id={item.id}
                                        title={item.title}/>
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
                <TopNav loggedIn={this.state.loggedIn} user={this.state.user}/>
                <div id="backColor">
                <h1 className="d-flex justify-content-center" id="title">
                    Health Portal
                </h1>
                <p id="intro" className="d-flex justify-content-center">
                    This website is devoted to giving you the most accurate information about your health care questions
                    available.  Providers write articles about their specialties that you can read and favorite to view
                    at your convenience.  Search for practices in your area and view articles written by providers in these
                    practices.  Contact information is provided to make booking an appointment easy.  View a provider's
                    profile to see other articles they have written and a user's profile to see other articles they have liked.
                    Our goal is to provide clarity in the confusing field of health care.
                </p>
                {this.renderData()}
                {this.renderRoleData()}
            </div>
            </div>
        )
    }
}

export default LandingPage;
