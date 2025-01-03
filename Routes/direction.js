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
    .post(async (req, res) => {
        const requestData = JSON.stringify(req.body);
        const userLocation = requestData.userLocation;
        const destination = requestData.destination;
        try {
            const sender = await userRequest(userLocation, destination);
            res.send(sender);
        }
        catch(err) {
            res.status(500).send('Error, try again.')
        }
    });

app.route('/direction/new')
    .get((req, res) => {
        res.send(`GET request to the new direction page`);
    })
    .post((req, res) => {
        res.send(`POST request to the new direction page`);
    });