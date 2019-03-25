import {Link} from 'react-router-dom';
import React from "react";

const API_URL = 'http://localhost:8080/api/'

class CustomerService {

    static myInstance = null;

    static getInstance() {
        if(CustomerService.myInstance == null) {
            CustomerService.myInstance = new CustomerService();
        }
        return this.myInstance;
    }

}

export default CustomerService;
