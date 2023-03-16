const express = require("express");
const request = require('request');
const port = 2222;
const host = '0.0.0.0';
const app = express();
const bodyParser = require('body-parser');


// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json()); // parse JSON request body

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/pages/app.html');
});

app.get('/weather', async function(req,res) {
  const city = req.query.city;
  const apiKey = `f07964f00079489a73170d47743fc8f0`;

  console.log(`Received city : ${city}`);
  const url = `http://api.weatherstack.com/current?access_key=f07964f00079489a73170d47743fc8f0&query=${city}`;

  request(url, (error, response, body) => {
    // if the request is well recieved
    if (!error && response.statusCode === 200) {
      const weatherData = JSON.parse(body);
      res.json(weatherData);
    } else {
      res.status(response.statusCode).send(error);
    }
  });
  
});


app.listen(port,host);