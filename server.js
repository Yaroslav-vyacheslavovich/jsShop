
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(express.static('.'));
const URL = 'data'

app.listen(3000, () => {
    console.log('server is running on port 3000!');
});

app.get('/Data', (req, res) => {
    fs.readFile(URL + '/data.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/cart', (req, res) => {
    fs.readFile(URL + '/cart.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/stat', (req, res) => {
    fs.readFile(URL + '/stat.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/addGood', (req, res) => {

    const item = req.body;

    fs.writeFile(URL + '/cart.json', JSON.stringify(item), (err) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            res.send('{"result": 1}');
        }

    });

});

app.get('/cart', (req, res) => {
    fs.readFile(URL + '/cart.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/statistic', (req, res) => {

    const item = req.body;

    fs.readFile(URL + '/stats.json', 'utf8', (err, data) => {
        const statistic = JSON.parse(data);
        statistic.push(item);

        fs.writeFile(URL + '/stats.json', JSON.stringify(statistic), (err) => {

        });
    });

});


