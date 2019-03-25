import {Link} from 'react-router-dom';
import React from "react";

const API_URL = 'http://localhost:8080/api/'

class ArticleService {

    static myInstance = null;

    static getInstance() {
        if(ArticleService.myInstance == null) {
            ArticleService.myInstance = new ArticleService();
        }
        return this.myInstance;
    }

}

export default ArticleService;
