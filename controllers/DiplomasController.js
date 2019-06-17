
const Sequelize = require('sequelize');

module.exports =

    class DiplomasController {

        constructor(models) {

            this.models = models;

        }



        getDiplomas() {
            const self = this;
            return new Promise((resolve, reject) => {

                self.models.diplomasMdl.findAll({
                        include: [
                            {
                                model: self.models.langsMdl,
                                as: 'language',
                                required: true
                            },
                            {
                                model: self.models.levelsMdl,
                                as: 'level',
                                required: true
                            },
                            {
                                model: self.models.diplomasFeesMdl,
                                as: 'fees',
                                required: true,
                                where : {
                                    active :1
                                },
                                include : [ {
                                    model: self.models.studentCatsMdl,
                                    as: 'category',
                                    required: true                                   
                                }]
                            }]
                    }
                ).then(results => {
                    resolve({errMsg: '', data: results});
                }).catch(err => {
                    reject({errMsg: err, data: []});
                })
            });
        }
      


    }
