const port = process.env.PORT || 3500;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');

const WordController = require('./controllers/WordController');
const BookController = require('./controllers/BookController');


app.use(bodyParser.json());
app.use(cors());

const dbModels = require('./models');

const wCtrl = new WordController(dbModels);
const bokCtrl = new BookController(dbModels);


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
    });
});

app.get('/api/reading', (req, res) => {
   Promise.all([bokCtrl.getWIPBooks(),wCtrl.getAllLangs(),bokCtrl.getFormats(),bokCtrl.getAuthors()]).then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});


app.get('/api/langsall', (req, res) => {
    wCtrl.getAllLangs().then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});


app.get('/api/formats', (req, res) => {
    bokCtrl.getFormats().then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});


app.get('/api/authors', (req, res) => {
    bokCtrl.getAuthors().then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});



app.get('/api/pos', (req, res) => {
    wCtrl.getPOS().then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});

app.get('/api/wordsdue/:langId/:sourceId', (req, res) => {

    wCtrl.getWordsDue(req.params.langId,req.params.sourceId).then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});

app.get('/api/books_wip', (req, res) => {

    bokCtrl.getWIPBooks().then(data => {
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


app.get('/api/sources/:langId', (req, res) => {

    wCtrl.getSourcesByLangId(req.params.langId).then(data => {
        res.send(data);

    }).catch(err => {
        console.log(err);
    });
});


app.get('/api/sources_all', (req, res) => {

    wCtrl.getNumSourcesForAllLangs().then(data => {
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
    });
});

app.post('/api/newword', (req, res) => {

    wCtrl.saveWord(req.body);
    res.sendStatus(200);
});


app.post('/api/save_progress', (req, res) => {

    bokCtrl.saveProgress(req.body);
    res.sendStatus(200);
});

app.get('/api/statistics', (req,res) => {
  wCtrl.getSetsAndStatistics().then(rsp => {
       res.send(rsp)
   }).catch(err => {
       res.sendStatus(500);
   });

});

http.listen(port, (req, res) => {
    console.log('Server listening on port number', port);
});




module.exports = {
    serverApp: app
};

