const Sequelize = require('sequelize');
const moment = require('moment');


module.exports =

    class BookController {

        constructor(models) {

            this.models = models;

        }



        getWIPBooks(filters = {}) {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.booksMdl.findAll({
                    where: {
                        currentPage: {
                            [Sequelize.Op.gt]: 0,
                            [Sequelize.Op.lt]: Sequelize.col('bok_pages')
                        },
                    },
                    order: [
                        ['currentPage', 'DESC'],
                    ],
                }).then(results => {
                    resolve(results);
                }).catch(err => {
                    console.log(err);
                    reject({errMsg: err, data: []});
                });
            });
        }


        getFormats()
        {
            const self = this;
            return new Promise((resolve, reject) => {
                self.models.formatsMdl.findAll({
                    }
                ).then(results => {
                    resolve(results);
                });
            });
        }


        getAuthors()
        {
            const self = this;
            return new Promise((resolve, reject) => {
                self.models.authorsMdl.findAll({
                    order: [
                        ['name', 'ASC'],
                    ],
                    }
                ).then(results => {
                    resolve(results);
                });
            });
        }


    }
