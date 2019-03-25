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

}

export default PracticeService;
