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


        getWordsDue(langId,sourceId) {
            console.log(langId,sourceId)
            const self = this;
            // limit
            return new Promise((resolve, reject) => {

                let whereOptions = {
                    where: {
                        langId: langId,
                        due: {
                            [Sequelize.Op.lte]: moment().toDate()
                        },
                    },
                    order: [
                        ['due', 'ASC'],
                    ]
                };

                if (sourceId > 0) {
                   Object.assign(whereOptions.where, {
                        sourceId: sourceId
                    });
                }

                self.models.wordsMdl.findAll(whereOptions).then(results => {
                    resolve(results);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }

        getSetsAndStatistics() {
            return new Promise((resolve, reject) => {
                Promise.all([this.getStatistics(), this.getNumSourcesForAllLangs()]).then(function (values) {


                    var fullResult = [];
                    values[0].forEach(function (rs) {
                        var cp = Object.assign({}, rs);
                        var setsArr = [];
                        values[1].forEach(function (src) {
                            if (src.sourceLangId == rs.lanId) {
                                setsArr.push(src);
                            }
                        });

                        cp['sets'] = setsArr;
                        fullResult.push(cp);
                    })

                    resolve(fullResult);
                });
            });
        }

        getStatistics() {
            // multi line string in ``
            const q = `SELECT   L.lan_id AS lanId, L.lan_title AS lang, COUNT(W.wor_id) AS totalWords ,  FORMAT(AVG(W.wor_avg_days_due),2) AS avgDue ,
            transtlPerLang.totalStats ,wordsDue.dueCount, levelStats.lvlsCount
            FROM words W
            JOIN languages L ON L.lan_id = W.wor_langid
            JOIN (
                SELECT lan_id as dueLangId, COUNT(W.wor_id) AS dueCount
                FROM words W
                JOIN languages L ON L.lan_id = W.wor_langid
                WHERE W.wor_due <= CURRENT_DATE
                GROUP BY L.lan_id
            ) AS wordsDue ON wordsDue.dueLangId = L.lan_id
            JOIN (
                SELECT lan_id,  GROUP_CONCAT(' |',wor_lvl,' ',ttl) AS lvlsCount
                FROM (
                    SELECT L.lan_id,  W.wor_lvl, COUNT(W.wor_id) AS ttl
                    FROM languages L JOIN words W ON W.wor_langid = L.lan_id
                    GROUP BY L.lan_id,W.wor_lvl
                    ORDER BY  COUNT(W.wor_id) DESC
                ) AS lvlStatsLocal
                GROUP BY lan_id
            ) AS levelStats ON levelStats.lan_id = L.lan_id
            JOIN (
            
                SELECT originalLangId ,
                GROUP_CONCAT(' |',transLang,' ',langCount) AS totalStats
                FROM 
                (
                SELECT T.tra_langid, L2.lan_title AS transLang,
                W.wor_langid AS originalLangId,
                COUNT(T.tra_langid) AS langCount
                FROM translations T 
                JOIN words W ON W.wor_id = T.tra_wordid
                JOIN languages L ON L.lan_id = W.wor_langid
                JOIN languages L2 ON L2.lan_id =T.tra_langid
                GROUP BY W.wor_langid, T.tra_langid
                ) AS transPerOriginalLang 
                GROUP BY originalLangId

            )  AS transtlPerLang ON transtlPerLang.originalLangId = L.lan_id
            GROUP BY  W.wor_langid
            ORDER BY  COUNT(W.wor_id) DESC `;


            const self = this;
            return new Promise((resolve, reject) => {
                self.models.dbObj.query(q, {type: Sequelize.QueryTypes.SELECT})
                    .then(foo => {
                        resolve(foo);
                    }).catch(errSql => {
                    reject({errMsg: errSql});
                });
            });
        }

        getSourcesByLangId(langId) {
            const self = this;
            return new Promise((resolve, reject) => {
                self.models.sourcesMdl.findAll({
                        where: {
                            langId: langId
                        }
                    }
                ).then(results => {
                    resolve(results);
                });
            });
        }


        getNumSourcesForAllLangs() {
            const q = ` SELECT W.wor_langid AS sourceLangId , src_title , COUNT(W.wor_id) AS ttlSrc 
                    FROM  words W 
                    JOIN sources S  ON W.wor_source_id = src_id
                    GROUP BY  W.wor_langid, S.src_id`;

            const self = this;
            return new Promise((resolve, reject) => {

                self.models.dbObj.query(q, {type: Sequelize.QueryTypes.SELECT})
                    .then(foo => {
                        resolve(foo);
                    }).catch(errSql => {
                    reject({errMsg: errSql});
                });
            });

        }


        getTranstl(langId) {
            const self = this;
            return new Promise((resolve, reject) => {

                let q = " SELECT T.tra_id AS transId, T.tra_wordid AS wordId, W.wor_posid as posId, ";
                q+= " T.tra_meaning AS meaning FROM translations T ";
                q+= " JOIN words W ON W.wor_id =T.tra_wordid ";
                q+= " WHERE W.wor_due <= CURRENT_DATE AND W.wor_langid = '" + langId +"'";

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
                    const showAgainInDays =  parseFloat(obj.due);

                    timesChecked++;

                    const newAverage = (showAgainInDays + currentAverage )/timesChecked;
                    const newShowDay = moment().add(showAgainInDays, 'days');

                    const sql = " UPDATE `words` SET `wor_avg_days_due` = '" + newAverage + "', `wor_checked` = CURRENT_DATE, `wor_times_tested` = '" + timesChecked +"', `wor_due` = '" + newShowDay.format('YYYY-MM-DD') + "' WHERE wor_id = '" + obj.wordId + "'";
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
                avgDue: 0,
                lvl: obj.level,
                sourceId:obj.sourceId,
            })
                .save().then(saved => {

                    self.models.translationsMdl.build({
                        langId: obj.transLangId,
                        wordId: saved.wordId,
                        meaning: obj.meaning,
                        example: obj.example
                    }).save();
            });
        }
    }
