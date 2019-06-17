const port = process.env.PORT || 3500;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');

const DiplomasController = require('./controllers/DiplomasController');


app.use(bodyParser.json());
app.use(cors());

const dbModels = require('./models');

const diplCtrl = new DiplomasController(dbModels);


app.get('/api/diplomas', (req, res) => {

    diplCtrl.getDiplomas().then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});




http.listen(port, (req, res) => {
    console.log('Server listening on port number', port);
});


module.exports = {
    serverApp: app
};

