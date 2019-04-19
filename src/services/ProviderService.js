import {Link} from 'react-router-dom';
import React from "react";

const API_URL = 'http://localhost:8080/api/'
//const API_URL= 'https://cryptic-sea-99383.herokuapp.com/api/'

class ProviderService {

    static myInstance = null;

    static getInstance() {
        if(ProviderService.myInstance == null) {
            ProviderService.myInstance = new ProviderService();
        }
        return this.myInstance;
    }

    findAllProviders = () =>
        fetch(API_URL + "providers")
            .then(response => response.json());

    findProviderById = (userId) =>
        fetch(API_URL + "providers/user/" + userId)
            .then(response => response.json());

    findProvidersbyPractice = (practiceId) =>
        fetch(API_URL + "practice/" + practiceId + "/provider")
            .then(response => response.json())

    removeProvider = (userId) =>
        fetch(API_URL + "providers/user/" + userId, {
            method: 'delete',
            credentials: 'include'
        });

    updateProvider = (id, newProvider) => {
        return fetch(API_URL + 'providers/user/' + id, {
            method: 'put',
            body: JSON.stringify(newProvider),
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    register = (user) =>
        fetch(API_URL + "providers", {
            body: JSON.stringify(user),
            // credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response =>
            response.json());

}

export default ProviderService;
