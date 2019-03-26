import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import ArticleService from "../services/ArticleService";
import TopNav from "./TopNav";
import './Home.css';

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
            <div>
                <TopNav/>
            <div className="container-fluid">
                <h1>
                    Home Page
                </h1>
            </div>
            </div>
        )
    }
}
export default Home;
