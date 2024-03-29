import React from 'react'
import TopNav from "../components/TopNav";
import UserService from "../services/UserService";
import ArticleService from "../services/ArticleService";
import {Link} from "react-router-dom";
import CustomerService from "../services/CustomerService";
import "./PersonalProfile.css"
import ArticleItem from "../components/ArticleItem";
import FavoritedArticleItem from "../components/FavoritedArticleItem";
import ArticleCard from "../components/LandingPage";
import ProviderProfileItem from "../components/ProviderProfileItem";


class PersonalProfile extends React.Component {

    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.customerService = CustomerService.getInstance();
        this.articleService = ArticleService.getInstance();
        this.state = {
            loggedIn: false,
            tempUsername: '',
            tempPassword: '',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            city: '',
            usState: '',
            role: '',
            articles: [],
            user: {
                username: ''
            }
        }

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailNameChange = this.handleEmailNameChange.bind(this);
        this.handleCityNameChange = this.handleCityNameChange.bind(this);
        this.handleStateNameChange = this.handleStateNameChange.bind(this);
    }


    componentDidMount = () =>
        this.loggedIn();

    componentDidUpdate = () => {
        if (this.state.loggedIn == false) {
            this.loggedIn();
        }
    }

    loggedInUser = () => {
        if (this.state.loggedIn == true) {
            this.userService.loggedInUser()
                .then(user =>
                    this.setState({
                        user: user,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        city: user.city,
                        usState: user.state,
                        tempUsername: user.username,
                        tempPassword: user.password
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
            .then(() => this.getProvider())
    }

    getProvider = () => {
        const userId = this.state.user.id;
        this.customerService.findProviderForCustomer(userId)
            .then(provider =>
            this.setState({
                provider: provider
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

    login = () => {
        const username = this.state.tempUsername;
        const password = this.state.tempPassword;
        let newUser = {
            username: username,
            password: password
        }
        this.userService
            .login(newUser)
            .then(user =>
                this.setState(
                    {
                        user: user,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        city: user.city,
                        usState: user.state
                    }))
            .then(() => this.setState({
                loggedIn: true
            }))
    }

    unfavoriteArticle = (articleId) => {
         const customerId = this.state.user.id;
         this.customerService
             .unfavorite(customerId, articleId)
             .then(() => this.getFavoritedArticles())
    }

    unsaveProvider = () => {
        const customerId = this.state.user.id;
        this.customerService
            .unsaveProvider(customerId)
            .then(() => this.setState({
                provider: null
            }))
    }


    loggedIn = () =>
        this.userService.loggedIn()
            .then(boolean =>
                this.setState({
                    loggedIn: boolean
                }))
            .then(() => this.loggedInUser())


    addArticle = () => {
        const providerId = this.state.user.id;
        let newArticle = {
            title: 'New Article',
            text: 'New Text'
        }
        this.articleService
            .createArticle(providerId, newArticle)
            .then(() =>
                this.getAuthoredArticles());
    }


    updateUser = () => {
        const username = this.state.user.username;
        const password = this.state.user.password;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const email = this.state.email;
        const city = this.state.city;
        const usState = this.state.usState;
        const userId = this.state.user.id
        let newUser = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            city: city,
            state: usState
        }

        this.userService.updateUser(userId, newUser)
            .then(user =>
                this.setState({
                    user: user,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    city: user.city,
                    usState: user.state
                })
            )
            .then(() => this.logout())
            .then(() => this.login())

    }

    logout = () => {
        this.userService.logout()
            .then(() =>
                this.setState({
                    user: {
                        username: ''
                    },
                    username: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    city: '',
                    usState: '',
                    loggedIn: false
                })
            );
    }

    handleFirstNameChange(event) {
        this.setState(
            {
                firstName: event.target.value
            }
        );
    }

    handleLastNameChange(event) {
        this.setState(
            {
                lastName: event.target.value
            }
        );
    }

    handleEmailNameChange(event) {
        this.setState(
            {
                email: event.target.value
            }
        );
    }

    handleCityNameChange(event) {
        this.setState(
            {
                city: event.target.value
            }
        );
    }

    handleStateNameChange(event) {
        this.setState(
            {
                usState: event.target.value
            }
        );
    }


    renderData() {
        if (this.state.username != '') {
            return (
                <div>
                    <h1>Profile</h1>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="username"
                                   className="col-sm-2">
                                Username
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       readOnly
                                       value={this.state.user.username}
                                       id="username"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="firstName"
                                   className="col-sm-2">
                                First Name
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       value={this.state.firstName}
                                       onChange={this.handleFirstNameChange}
                                       id="firstName"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="lastName"
                                   className="col-sm-2">
                                Last Name
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       value={this.state.lastName}
                                       onChange={this.handleLastNameChange}
                                       id="lastName"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email"
                                   className="col-sm-2">
                                Email
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       type="email"
                                       value={this.state.email}
                                       onChange={this.handleEmailNameChange}
                                       id="email"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="city"
                                   className="col-sm-2">
                                City
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       value={this.state.city}
                                       onChange={this.handleCityNameChange}
                                       id="city"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="usState"
                                   className="col-sm-2">
                                State
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control"
                                       value={this.state.usState}
                                       onChange={this.handleStateNameChange}
                                       id="usState"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2"></label>
                            <div className="col-sm-10">
                                <button type="button" className="btn btn-success btn-block"
                                        onClick={() => this.updateUser()}
                                        role="button">
                                    Update
                                </button>
                                <Link onClick={() => this.logout()} to="/">
                                    <button type="button" className="btn btn-danger btn-block">
                                        Logout
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
        if (this.state.username == '') {
            return (
                <h1>
                    Log in to See Profile.
                </h1>
            )
        }
    }

    renderCustomerProviderData() {
        if (this.state.provider) {
            return <div>
                <ProviderProfileItem
                author={this.state.provider}
                unsaveProvider={this.unsaveProvider}/>
            </div>
        }
    }


    renderRoleData() {
        if (this.state.role == 'CUS') {
            var items;
            items = this.state.articles
                .map(function (item, index) {
                    return <div>
                        <tr key={item.index}>
                            <td>
                                <button className="btn btn-success btn-sm pull-right"
                                        type="button"
                                        onClick={() => this.unfavoriteArticle(item.id)}>
                                    Unfavorite
                                </button>
                            </td>
                            <td>
                                <Link to={`/article/${item.id}`}>
                                    <i className="fa fa-file">&nbsp;</i>
                                    {item.title}
                                </Link>
                            </td>
                        </tr>
                    </div>

                }, this);

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
            items = this.state.articles
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
                    <div className="col-1" id="greycolor">
                        <a onClick={() => this.addArticle()}>
                    <span className="fa-stack fa-2x wd-bottom-right" id="plusicon">
	                    <i className="fa fa-circle fa-stack-2x"></i>
	                    <i className="fa fa-plus fa-stack-1x fa-inverse"></i>
                    </span>
                        </a>
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
                    {this.renderData()}
                    <div>&nbsp;</div>
                    {this.renderCustomerProviderData()}
                    {this.renderRoleData()}
                </div>
            </div>
        )
    }
}

export default PersonalProfile;
