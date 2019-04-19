import {Link} from 'react-router-dom';
import React from "react";

//const API_URL = 'http://localhost:8080/api/'
const API_URL= 'https://cryptic-sea-99383.herokuapp.com/api/'

class CustomerService {

    static myInstance = null;

    static getInstance() {
        if (CustomerService.myInstance == null) {
            CustomerService.myInstance = new CustomerService();
        }
        return this.myInstance;
    }

    findAllCustomers = () =>
        fetch(API_URL + "customers")
            .then(response => response.json());

    findCustomerById = (userId) =>
        fetch(API_URL + "customers/user/" + userId)
            .then(response => response.json());

    removeCustomer = (userId) =>
        fetch(API_URL + "customers/user/" + userId, {
            method: 'delete',
            credentials: 'include'
        });

    updateCustomer = (id, newCustomer) => {
        return fetch(API_URL + 'customers/user/' + id, {
            method: 'put',
            body: JSON.stringify(newCustomer),
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    register = (user) =>
        fetch(API_URL + "customers", {
            body: JSON.stringify(user),
            // credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response =>
            response.json());

    favorite = (customerId, articleId) =>
        fetch(API_URL + "customer/" + customerId + "/article/" + articleId, {
            // credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

    unfavorite = (customerId, articleId) =>
        fetch(API_URL + "customer/" + customerId + "/article/" + articleId, {
            // credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });

    saveProvider = (customerId, providerId) =>
        fetch(API_URL + "customer/" + customerId + "/provider/" + providerId, {
            // credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

    unsaveProvider = (customerId) =>
        fetch(API_URL + "customer/" + customerId + "/provider", {
            // credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });

    findProviderForCustomer = (customerId) =>
        fetch(API_URL + "customer/" + customerId + "/provider")
            .then(response => response.json())
            .catch(error => {

            });

    findFavoritedArticles = (customerId) =>
        fetch(API_URL + "customer/" + customerId + "/article")
            .then(response => response.json());

}

export default CustomerService;
