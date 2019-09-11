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

    wCtrl.getAllWords(req.params.langId).then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});


app.get('/api/langs', (req, res) => {
    wCtrl.getForeignLangs().then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    })
});

app.get('/api/langsall', (req, res) => {
    wCtrl.getAllLangs().then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    })
});

app.get('/api/wordsdue/:langId', (req, res) => {

    wCtrl.getWordsDue(req.params.langId).then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});



app.get('/api/transtl/:langId', (req, res) => {

    wCtrl.getTranstl(req.params.langId).then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});


app.post('/api/update_due', (req, res) => {
    wCtrl.updateWord(req.body).then(rsp => {
        res.sendStatus(201);
    }).catch(err => {
        res.sendStatus(500);
    })
});


app.post('/api/newword', (req, res) => {

    wCtrl.saveWord(req.body);
    res.sendStatus(200);
});

http.listen(port, (req, res) => {
    console.log('Server listening on port number', port);
});




module.exports = {
    serverApp: app
};

