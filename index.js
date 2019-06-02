const express = require('express');
const http = require('http');
const axios = require('axios');
const csv=require("csvtojson");

const app = express();
const port = 4000;

const fetchCsvFile = () => {
    return axios({
        method: 'GET',
        options: {
            responseType: 'blob'
        },
        url: 'http://hck.re/nGaeKB'
    })
    .then(response => response.data);
}

app.get('/game', (req, res) => {
    fetchCsvFile()
    .then(csvData => {
        csv({
            colParser:{
                "Global_Sales": "number",
                "Rank": "number",
                "Year": "number"
            }
        })
        .fromString(csvData)
        .then(jsonData => {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(jsonData);
        })
    })
    .catch(err => {
        console.log(err.message);
    })
});

const server = http.createServer(app);

server.listen(port);
