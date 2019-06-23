const port = process.env.PORT || 3500;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');

const WordController = require('./controllers/WordController');
const NounsController = require('./controllers/NounsController');
const VerbsController = require('./controllers/VerbsController');


app.use(bodyParser.json());
app.use(cors());

const dbModels = require('./models');

const wCtrl = new WordController(dbModels);
const nCtrl = new NounsController(dbModels);
const vCtrl = new VerbsController(dbModels);


app.get('/api/words/:langId', (req, res) => {

    wCtrl.getWords(req.params.langId).then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});



app.get('/api/transtl/:langId', (req, res) => {

    wCtrl.getTranstl().then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});


app.get('/api/ndecl', (req, res) => {

    nCtrl.getDeclensions().then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});


app.get('/api/vdecl', (req, res) => {

    vCtrl.getDeclensions().then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});


app.get('/api/verbal', (req, res) => {

    vCtrl.getAllVerbalData().then(data => {
        res.send({tenses: data[0],
            aspects: data[1],
            voices: data[2],
            pronouns: data[3]});

    }).catch(err => {
        console.log(err);
    });
});


app.get('/api/new/word_options', (req, res) => {

    wCtrl.getPosLangs().then(data => {
        res.send({pos: data[0],
            langs: data[1]});

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

