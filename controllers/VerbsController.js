const Sequelize = require('sequelize');

module.exports =

    class VerbsController {

        constructor(models) {

            this.models = models;

        }


        getAllVerbalData()
        {
            return Promise.all([this.getTenses(), this.getAspects(), this.getVoices(), this.getPronouns()]);
        }


        getTenses() {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.tenseMdl.findAll().then(results => {
                    resolve(results);
                }).catch(err => {
                    reject([]);
                })
            });
        }


        getAspects() {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.aspectMdl.findAll().then(results => {
                    resolve(results);
                }).catch(err => {
                    reject([]);
                })
            });
        }


        getPronouns() {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.pronounMdl.findAll().then(results => {
                    resolve(results);
                }).catch(err => {
                    reject([]);
                })
            });
        }


        getVoices() {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.voiceMdl.findAll().then(results => {
                    resolve(results);
                }).catch(err => {
                    reject([]);
                })
            });
        }


        getDeclensions() {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.verbDeclensionMdl.findAll({
                        include: [
                            {
                                model: self.models.tenseMdl,
                                as: 'tense',
                                required: false
                            },
                            {
                                model: self.models.aspectMdl,
                                as: 'aspect',
                                required: false
                            },
                            {
                                model: self.models.voiceMdl,
                                as: 'voice',
                                required: false
                            },
                            {
                                model: self.models.pronounMdl,
                                as: 'person',
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
