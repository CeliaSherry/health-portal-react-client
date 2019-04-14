import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import ArticleService from "../services/ArticleService";
import TopNav from "./TopNav";
import './Home.css';
import Login from "../containers/Login";
import ResultsPage from "./ResultsPage";
import SearchDoctor from "./SearchDoctor";
import DetailsPage from "./DetailsPage";
import LandingPage from "./LandingPage";
import UserProfile from "../containers/UserProfile";
import PersonalProfile from "../containers/PersonalProfile";
import Article from "../containers/Article";

class Home extends Component {
    constructor(props) {
        super(props);
        this.articleService = ArticleService.getInstance();
        this.state = {
            articles: []
        }
    }

    componentDidMount = () =>
        this.findAllArticles();

    componentDidUpdate = () =>
        this.findAllArticles();

    findAllArticles = () =>
        this.articleService.findAllArticles()
            .then(articles =>
            this.setState ({
                articles: articles
            }))


    render() {
        return (
            <div className="container-fluid">
                <Router>
                    <div>
                        <Route path='/' exact
                               render={() =>
                                   <LandingPage/>
                               }/>
                        <Route path='/search' exact
                               render={() =>
                               <SearchDoctor/>
                               }/>
                        <Route path='/search/:criteria' exact
                               component={ResultsPage} />
                        <Route path='/details/:location/practice/:practiceId' exact
                               component={DetailsPage} />
                        <Route path='/profile/:profileId' exact
                               component={UserProfile} />
                        <Route path='/profile' exact
                               component={PersonalProfile} />
                        <Route path='/article/:articleId' exact
                               component={Article} />
                    </div>
                </Router>
            </div>
        )
    }
}
export default Home;

























