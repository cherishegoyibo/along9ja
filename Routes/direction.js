// include file
import  userRequest from '../funcs/userRequest.js'
import { getDirections } from '../funcs/mapDirectionRequest.js';
import express from 'express';

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
            const directionsDetail = await userRequest(userLocation, destination);
            res.send(directionsDetail);
        }
        catch(err) {
            res.status(500).send('Error, try again.')
        }
    });

// app.route('/direction/new')
//     .get((req, res) => {
//         res.send(`GET request to the new direction page`);
//     })
//     .post((req, res) => {
//         const requestData = JSON.stringify(req.body);
//     });

app.route('/updatedirection')
    .post((req, res) => {
        const mapout = getDirections(req.body.from, req.body.to);
        res.send(mapout);
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});