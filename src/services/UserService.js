import {Link} from 'react-router-dom';
import React from "react";

const API_URL = 'http://localhost:8080/api/'

class UserService {

    static myInstance = null;

    static getInstance() {
        if(UserService.myInstance == null) {
            UserService.myInstance = new UserService();
        }
        return this.myInstance;
    }



}



export default UserService;
