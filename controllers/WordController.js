const Sequelize = require('sequelize');
const moment = require('moment');


module.exports =

    class WordController {

        constructor(models) {

            this.models = models;

        }

        getForeignLangs() {
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


        getAllLangs() {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.langsMdl.findAll({
                }).then(results => {
                    resolve(results);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }


        getPOS() {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.posMdl.findAll({
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

                let q = " SELECT T.tra_id AS transId, T.tra_wordid AS wordId, W.wor_posid as posId, ";
                q+= " T.tra_meaning AS meaning FROM translations T ";
                q+= " JOIN words W ON W.wor_id =T.tra_wordid ";
                q+= " WHERE W.wor_due <= CURRENT_DATE AND W.wor_langid = '" + langId +"'";


                /*self.models.translationsMdl.findAll().then(results => {
                    resolve(results);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })*/
                self.models.dbObj.query(q, {type: Sequelize.QueryTypes.SELECT})
                    .then(foo => {
                        resolve(foo);
                    }).catch(errSql => {
                    reject({errMsg: errSql});
                });
            });
        }


        updateWord(obj) {
            const self = this;

            return new Promise((resolve, reject) => {


                self.models.wordsMdl.findAll({
                        where: {
                            wordId: obj.wordId,
                        },
                    }
                ).then(results => {
                    let timesChecked = parseFloat(results[0].timesTested);
                    const currentAverage = parseFloat(results[0].avgDue);
                    console.log('tims chcked + ' + timesChecked + ' cur avg' + currentAverage + ' new due ' + obj.due);
                    const newAvg = parseFloat(obj.due);
                    console.log('new ag in ' + newAvg);

                    console.log('nominator');
                    console.log((newAvg + currentAverage ));


                    console.log('denominator');
                    console.log((timesChecked + 1 ));
                    timesChecked++;

                    const showAgainInDays = Math.ceil((newAvg + currentAverage )/timesChecked);
                    console.log('show in ' + showAgainInDays);
                    const newShowDay = moment().add(showAgainInDays, 'days');

                    const sql = " UPDATE `words` SET `wor_checked` = CURRENT_DATE, `wor_times_tested` = '" + timesChecked +"', `wor_due` = '" + newShowDay.format('YYYY-MM-DD') + "' WHERE wor_id = '" + obj.wordId + "'";
                    self.models.dbObj.query(sql, {type: Sequelize.QueryTypes.UPDATE})
                        .then(foo => {
                            resolve();
                        }).catch(errSql => {
                        reject({errMsg: errSql});
                    });

                }).catch(err => {
                    console.log(err);
                    reject({errMsg: err});
                });
            });
        }

        saveWord(obj) {
            const self = this;
            console.log(obj);
            self.models.wordsMdl.build({
                langId: obj.foreignLangId,
                posId:obj.chosenPosId,
                wordString: obj.foreign,
                pronounce: obj.pronounce,
                stem: obj.stem,
                comment: obj.comment,
                added: new Date(),
                due: new Date(),
                avgDue: 0
            })
                .save().then(saved => {

                    self.models.translationsMdl.build({
                        langId: obj.transLangId,
                        wordId: saved.wordId,
                        meaning: obj.meaning
                    }).save();
            });
        }
    }
