import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import ArticleService from "../services/ArticleService";
import TopNav from "./TopNav";
import './Home.css';
import Login from "../containers/Login";
import Register from "../containers/Register";
import ResultsPage from "./ResultsPage";
import SearchDoctor from "./SearchDoctor";
import DetailsPage from "./DetailsPage";
import LandingPage from "./LandingPage";
import UserProfile from "../containers/UserProfile";
import PersonalProfile from "../containers/PersonalProfile";
import Article from "../containers/Article";
import UserService from "../services/UserService";




/*
TODO:
-Modularize everything
-Still redirected if incorrect username/password, still redirected if passwords don't match
-Should profile have provider's practice? ability to set practice?
 */


class Home extends Component {
    constructor(props) {
        super(props);
        this.articleService = ArticleService.getInstance();
        this.userService = UserService.getInstance();
        this.state = {
            articles: []
        }
    }

   // componentDidMount = () =>
   //     this.findAllArticles();

  //  componentDidUpdate = () =>
   //     this.findAllArticles();


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
                        <Route path='/login' exact
                               component={Login} />
                        <Route path='/register' exact
                               component={Register} />
                    </div>
                </Router>
            </div>
        )
    }
}
export default Home;

























