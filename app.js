const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = 'insert your openweathermap.org api key here';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null});
});

app.post('/', (req, res) => {
    let zip = req.body.zip;
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&APPID=${apiKey}`
    
    request(url, (err, response, body) => {
        if(err){
            res.render('index', {weather: null, error: 'There seems to be some sort of error. Please try again.'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main === undefined){
                res.render('index', {weather: null, error: 'There seems to be some sort of error. Please try again.'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
});

app.listen(3000, () => {
    console.log('The weather app is listening on port 3000.');
});