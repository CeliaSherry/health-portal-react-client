import {Link} from 'react-router-dom';
import React from "react";

const API_URL = 'http://localhost:8080/api/'
//const API_URL = 'https://cryptic-sea-99383.herokuapp.com/api/'

class ArticleService {

    static myInstance = null;

    static getInstance() {
        if (ArticleService.myInstance == null) {
            ArticleService.myInstance = new ArticleService();
        }
        return this.myInstance;
    }

    findAllArticles = () =>
        fetch(API_URL + "articles", {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json());

    findArticleById = (articleId) =>
        fetch(API_URL + "articles/" + articleId)
            .then(response => response.json());

    findArticlesForProvider = (providerId) =>
        fetch(API_URL + "articles/provider/" + providerId, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json());

    removeArticle = (articleId) =>
        fetch(API_URL + "articles/" + articleId, {
            method: 'delete',
            credentials: 'include'
        });

    updateArticle = (id, newArticle) => {
        return fetch(API_URL + 'articles/' + id, {
            method: 'put',
            body: JSON.stringify(newArticle),
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    createArticle = (providerId, article) =>
        fetch(API_URL + "provider/" + providerId + "/articles", {
            body: JSON.stringify(article),
            // credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response =>
            response.json());

    findAuthor = (articleId) =>
        fetch(API_URL + "articles/" + articleId + "/provider")
            .then(response => response.json())


    findFavoritedCustomers = (articleId) =>
        fetch(API_URL + "articles/" + articleId + "/customer")
            .then(response => response.json());


}

export default ArticleService;
