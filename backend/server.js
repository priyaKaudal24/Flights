const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;


let flights = [];

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/flights', (req, res) => {
    const flight = req.body;
    flights.push(flight);
    res.send({ "success": true, "message": "flight is added to the database" });
});

app.get('/flights', (req, res) => {
    res.json(flights);
});
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));