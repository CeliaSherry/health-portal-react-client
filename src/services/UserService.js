import {Link} from 'react-router-dom';
import React from "react";

const API_URL = 'http://localhost:8080/api/'

class UserService {

    static myInstance = null;

    static getInstance() {
        if (UserService.myInstance == null) {
            UserService.myInstance = new UserService();
        }
        return this.myInstance;
    }

    findAllUsers = () =>
        fetch(API_URL + "user")
            .then(response => response.json());

    findUserById = (userId) =>
        fetch(API_URL + "user/" + userId)
            .then(response => response.json());

    removeUser = (userId) =>
        fetch(API_URL + "user/" + userId, {
            method: 'delete',
            credentials: 'include'
        });

    register = (user) =>
        fetch(API_URL + "register", {
            body: JSON.stringify(user),
            // credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response =>
            response.json());


    profile = () =>
        fetch(API_URL + "profile")
            .then(response =>
                response.json());

    logout = () =>
        fetch(API_URL + "logout", {
            method: 'delete',
            credentials: 'include'
        });

    loggedIn = () =>
        fetch(API_URL + "loggedin", {
            method: 'POST',
            credentials: 'include'
        })
            .then(response =>
                response.json());

    loggedInUser = () =>
        fetch(API_URL + "loggedinuser", {
            method: 'POST',
            credentials: 'include'
        })
            .then(response =>
                response.json());


    login = (user) =>
        fetch(API_URL + "login", {
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response =>
            response.json()
        )
            .catch(error => {
                alert("Incorrect Username or Password");
            });

    updateUser = (id, newUser) => {
        return fetch(API_URL + 'user/' + id, {
            method: 'put',
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json'
            }
        });
    }


}


export default UserService;
