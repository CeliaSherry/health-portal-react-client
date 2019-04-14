import React from 'react'
import TopNav from "../components/TopNav";
import ArticleService from "../services/ArticleService";
import {Link} from "react-router-dom";

class Article extends React.Component {

    constructor(props) {
        super(props);
        this.articleService = ArticleService.getInstance();
        this.state = {
            articleId: this.props.match.params.articleId
        }
    }

    componentDidMount = () =>
        this.findArticleById();


    findArticleById = () => {
        var aid = this.state.articleId;
        this.articleService.findArticleById(aid)
            .then(article =>
                this.setState({
                    article: article
                }))
    }

    renderData() {
        if (this.state.article) {
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
                </div>
            )
        }
        if (!(this.state.article)) {
            return (
                <div></div>
            )
        }

    }

    render() {
        return (
            <div className="container-fluid">
                <TopNav/>
                {this.renderData()}
            </div>
        )
    }
}

export default Article;
