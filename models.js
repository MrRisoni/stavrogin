const Sequelize = require('sequelize');
//const dotenv = require('dotenv');
//dotenv.config();

console.log('process.env.KANBAN_DB');
console.log(process.env.DBNAME);

const dbname = process.env.DBNAME || 'stavrogindb';

const user = process.env.DBUSER || 'root';
const passwd = process.env.DBPASSWD || '';
const host = process.env.DBHOST || '';

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
        id: {
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


module.exports = {
    dbObj: sequelize,
    langsMdl,
    wordsMdl
};


