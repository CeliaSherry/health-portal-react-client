import {Link} from 'react-router-dom';
import React from "react";

const API_URL = 'http://localhost:8080/api/'

class PracticeService {

    static myInstance = null;

    static getInstance() {
        if(PracticeService.myInstance == null) {
            PracticeService.myInstance = new PracticeService();
        }
        return this.myInstance;
    }

    findAllPractices = () =>
        fetch(API_URL + "practices")
            .then(response => response.json());

    findPracticeById = (practiceId) =>
        fetch(API_URL + "practices/" + practiceId)
            .then(response => response.json());

    findIdByPracticeId = (practiceId) =>
        fetch(API_URL + "practiceId/" + practiceId + "/practice")
            .then(response => response.json())

    findPracticeByPracticeId = (practiceUid) =>
        fetch(API_URL + "practiceId/" + practiceUid)
            .then(response => response.json());


    removePractice = (practiceId) =>
        fetch(API_URL + "practices/" + practiceId, {
            method: 'delete',
            credentials: 'include'
        });

    updatePractice = (id, newPractice) => {
        return fetch(API_URL + 'practices/' + id, {
            method: 'put',
            body: JSON.stringify(newPractice),
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    createPractice = (practice) =>
        fetch(API_URL + "practices", {
            body: JSON.stringify(practice),
            // credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response =>
            response.json());

}

export default PracticeService;
