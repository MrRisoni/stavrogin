const Sequelize = require('sequelize');
const moment = require('moment');


module.exports =

    class WordController {

        constructor(models) {

            this.models = models;

        }

//       [Op.gte]: moment().subtract(7, 'days').toDate()
        getLangs() {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.langsMdl.findAll({
                    where: {
                        foreign: 1
                    }
                }).then(results => {
                    resolve(results);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }

        getAllWords(langId) {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.wordsMdl.findAll({
                        where: {
                            langId: langId
                        },
                    }
                ).then(results => {
                    resolve(results);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }


        getWordsDue(langId) {
            const self = this;
            // limit
            return new Promise((resolve, reject) => {

                self.models.wordsMdl.findAll({
                        where: {
                            langId: langId,
                            due: {
                                [Sequelize.Op.lte]: moment().toDate()
                            },
                        },
                        order: [
                            ['due', 'ASC'],
                        ]
                    }
                ).then(results => {
                    resolve(results);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }

        getTranstl(langId) {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.translationsMdl.findAll().then(results => {
                    resolve(results);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }


        saveWord(obj) {

            const self = this;

            // find pos , origin lang, trans lang ,
            this.findBy(obj).then(res => {
                self.models.wordsMdl.build({
                    langId: res[0],
                    posId: res[2],
                    pronounce: obj.pronounceText,
                    added: new Date(),
                    title: obj.foreignText
                })
                    .save().then(saved => {
                    //console.log(saved.wordId);
                    // console.log(res[0] + ' ' +  res[1] + ' ' + res[2]);

                    self.models.translationsMdl.build({
                        langId: res[1],
                        wordId: saved.wordId,
                        meaning: obj.translationText
                    })
                        .save();
                });


            })


        }


    }
