const Sequelize = require('sequelize');

const dbname = process.env.DB_NAME || 'stavrogindb';

const user = process.env.DB_USER || 'root';
const passwd = process.env.DB_PASS || '';
const host = process.env.DB_HOST || '';

const sequelize = new Sequelize(dbname, user, passwd, {
    host: host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: true
});


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const langsMdl = sequelize.define('languages', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'lan_id',
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.CHAR,
            field: 'lan_title'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);


const wordsMdl = sequelize.define('words', {
        wordId: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'wor_id',
            autoIncrement: true,
            primaryKey: true,
        },
        langId: {
            type: Sequelize.INTEGER,
            field: 'wor_langid'
        },
        title: {
            type: Sequelize.CHAR,
            field: 'wor_word'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);


const casesMdl = sequelize.define('cases', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'cas_id',
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.CHAR,
            field: 'cas_title'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);


const nounDeclensionMdl = sequelize.define('ndeclensions', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'ndc_id',
            autoIncrement: true,
            primaryKey: true,
        },
        form: {
            type: Sequelize.CHAR,
            field: 'ndc_form'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

nounDeclensionMdl.belongsTo(casesMdl, {foreignKey: 'ndc_case_id', as: 'caseObj'});


module.exports = {
    dbObj: sequelize,
    langsMdl,
    wordsMdl,
    casesMdl,
    nounDeclensionMdl
};


