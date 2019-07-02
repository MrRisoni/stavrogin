
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


        findLangByTitle(title){
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.langsMdl.findAll({
                    where : {
                        title :title
                    },
                }).then(results => {
                    resolve(results[0].id);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }


        findPOSByTitle(title){
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.posMdl.findAll({
                    where : {
                        title :title
                    },
                }).then(results => {
                    resolve(results[0].id);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }



        findBy(obj)
        {
            return Promise.all([this.findLangByTitle(obj.foreignLang),
                this.findLangByTitle(obj.transLang),
                this.findPOSByTitle(obj.posText)]);

        }

        saveWord(obj)
        {

            const self = this;

            // find pos , origin lang, trans lang ,
         this.findBy(obj).then(res  => {
             self.models.wordsMdl.build({langId:res[0] ,posId: res[2], title:obj.foreignText})
                 .save().then(saved =>  {
                 //console.log(saved.wordId);
                // console.log(res[0] + ' ' +  res[1] + ' ' + res[2]);

                 self.models.translationsMdl.build({langId:res[1] ,wordId: saved.wordId, meaning:obj.translationText})
                     .save();
             });



         })



        }


    }
