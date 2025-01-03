// include file
import  { userRequest } from '../userRequest'
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.route('/direction')
    .get((req, res) => {
        res.send(`GET request to the direction page`);
    })
    .post((req, res) => {
        const requestData = req.body;
    });