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
                        ['updatedAt', 'DESC'],
                    ],
                    include: [
                        {
                            model: self.models.langsMdl,
                            as: 'lang',
                            required: false
                        },
                        {
                            model: self.models.formatsMdl,
                            as: 'form',
                            required: false
                        },
                        {
                            model: self.models.authorsMdl,
                            as: 'auth',
                            required: false
                        },
                    ]
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


        saveProgress(data){
            const self = this;
            console.log(data);
            let rawSql = "UPDATE `books` SET `bok_current_page`='" + data.newPage + "',`bok_updated_at`=CURRENT_DATE WHERE    `bok_id`= '" + data.bookId + "' ";

            self.models.dbObj.query(rawSql, {type: Sequelize.QueryTypes.UPDATE});
        }

    }
