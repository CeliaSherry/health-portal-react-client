import {Link} from 'react-router-dom';
import React from "react";

const API_URL = 'http://localhost:8080/api/'

class ProviderService {

    static myInstance = null;

    static getInstance() {
        if(ProviderService.myInstance == null) {
            ProviderService.myInstance = new ProviderService();
        }
        return this.myInstance;
    }

}

export default ProviderService;
