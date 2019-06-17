
const Sequelize = require('sequelize');

module.exports =

    class WordController {

        constructor(models) {

            this.models = models;

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



    }
