
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
//const { timeStamp } = require('node:console');
const app = express();
app.use(bodyParser.json());
app.use(express.static('.'));

app.listen(3000, () => {
    console.log('server is running on port 3000!');
});

app.get('/Data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/cart', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/addGood', (req, res) => {

    const item = req.body;

    fs.writeFile('cart.json', JSON.stringify(item), (err) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            res.send('{"result": 1}');
        }

    });

});
app.post('/statistic', (req, res) => {

    fs.readFile('stats.json', 'utf8', (err, data) => {

        const item = req.body;
        const statistic = JSON.parse(data);
        statistic.push(item);

        fs.writeFile('stats.json', JSON.stringify(statistic), (err) => {

        });
    });

});


