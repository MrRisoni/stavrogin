
const Sequelize = require('sequelize');

module.exports =

    class WordController {

        constructor(models) {

            this.models = models;

        }

        getPosLangs()
        {
            return Promise.all([this.getPos(), this.getLangs()]);
        }



        getPos()
        {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.posMdl.findAll().then(results => {
                    resolve(results);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }


        getLangs()
        {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.langsMdl.findAll().then(results => {
                    resolve(results);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }

        getWords(langId) {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.wordsMdl.findAll({
                    where : {
                        langId :langId
                    },
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

                self.models.translationsMdl.findAll({}
                ).then(results => {
                    resolve(results);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }



    }
