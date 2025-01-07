// include file
import  userRequest from '../userRequest.js'
import express, { json } from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.route('/direction')
    .get((req, res) => {
        res.send(`GET request to the direction page`);
    })
    .post(async (req, res) => {
        // const requestData = JSON.stringify(req.body);
        const requestData = {
            "userLocation": {
              "latitude": 8.981089468375945,
              "longitude": 7.562370306450092
            },
            "destination": {
              "latitude": 9.064536267462163,
              "longitude": 7.458264025185316
            }
        };

        const userLocation = requestData.userLocation;
        const destination = requestData.destination;
        console.log("form detail:", userLocation, destination);
        console.log("userlocation", userLocation.latitude, userLocation.longitude);
        console.log("Destination", destination.latitude, destination.longitude);
        try {
            const sender = await userRequest(userLocation, destination);
            console.log(sender);
            res.send(JSON.stringify(sender));
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
        const requestData = JSON.stringify(req.body);
    });

app.listen(3003, () => {
    console.log('Server is running on port 3000');
});