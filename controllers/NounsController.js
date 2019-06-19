const Sequelize = require('sequelize');

module.exports =

    class NounsController {

        constructor(models) {

            this.models = models;

        }


        getDeclensions() {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.nounDeclensionMdl.findAll({
                    include: [
                        {
                            model: self.models.casesMdl,
                            as: 'caseObj',
                            required: false
                        }]
                    }
                ).then(results => {
                    resolve(results);
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }

    }
