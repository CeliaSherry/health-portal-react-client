import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import ArticleService from "../services/ArticleService";
import TopNav from "./TopNav";
import './Home.css';
import DoctorAPI from "./DoctorAPI";
import Login from "../containers/Login";
import ResultsPage from "./ResultsPage";

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
                                   <TopNav/>
                               }/>
                        <Route path='/search' exact
                               render={() =>
                               <DoctorAPI/>
                               }/>
                        <Route path='/search/:criteria' exact
                               component={ResultsPage} />
                    </div>
                </Router>
            </div>
        )
    }
}
export default Home;

























