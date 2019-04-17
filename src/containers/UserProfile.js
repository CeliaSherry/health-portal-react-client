import React from 'react'
import TopNav from "../components/TopNav";
import ArticleService from "../services/ArticleService";
import UserService from "../services/UserService";
import CustomerService from "../services/CustomerService";
import ProviderService from "../services/ProviderService";
import {Link} from "react-router-dom";

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.userService = UserService.getInstance();
        this.customerService = CustomerService.getInstance();
        this.providerService = ProviderService.getInstance();
        this.articleService = ArticleService.getInstance();
        this.state = {
            user: '',
            specialArticles: []
        }
    }

    componentDidMount = () =>
        this.findUserById();


    findUserById = () => {
        var userId = this.props.match.params.profileId;
        this.userService.findUserById(userId)
            .then(user =>
                this.setState({
                    user: user
                }))
            .then(() => this.getRole(userId))
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
                    specialArticles: articles
                }))
    }

    renderData() {
        if (this.state.user) {
            return (
        <div>
            <h1>
                {this.state.user.firstName + ' ' + this.state.user.lastName}
            </h1>
        </div>
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
                <h1>
                    Profile
                </h1>
                {this.renderData()}
                {this.renderRoleData()}
            </div>
        )
    }
}

export default UserProfile;
