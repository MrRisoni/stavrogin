const port = process.env.PORT || 3500;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');

const WordController = require('./controllers/WordController');


app.use(bodyParser.json());
app.use(cors());

const dbModels = require('./models');

const wCtrl = new WordController(dbModels);


app.get('/api/words/:langId', (req, res) => {

    wCtrl.getWords(req.params.langId).then(data => {
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

