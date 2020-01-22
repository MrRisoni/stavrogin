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
        }, foreign: {
            type: Sequelize.INTEGER,
            field: 'lan_foreign'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

const posMdl = sequelize.define('poses', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'ps_id',
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.CHAR,
            field: 'ps_title'
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
        sourceId: {
            type: Sequelize.INTEGER,
            field: 'wor_source_id'
        },
        posId: {
            type: Sequelize.INTEGER,
            field: 'wor_posid'
        },
        timesTested: {
            type: Sequelize.INTEGER,
            field: 'wor_times_tested'
        },
        wordString: {
            type: Sequelize.CHAR,
            field: 'wor_word'
        },
        pronounce: {
            type: Sequelize.CHAR,
            field: 'wor_pronounce'
        },
        stem: {
            type: Sequelize.CHAR,
            field: 'wor_stem'
        },
        comment: {
            type: Sequelize.CHAR,
            field: 'wor_comment'
        },
        added: {
            type: Sequelize.DATE,
            field: 'wor_added'
        },
        due: {
            type: Sequelize.DATE,
            field: 'wor_due'
        },
        avgDue: { // the longer the avg Due the easier the word
            type: Sequelize.FLOAT,
            field: 'wor_avg_days_due'
        },
        lvl: {
            type: Sequelize.CHAR,
            field: 'wor_lvl'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);


const translationsMdl = sequelize.define('translations', {
        transId: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'tra_id',
            autoIncrement: true,
            primaryKey: true,
        },
        wordId: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'tra_wordid'
        },
        langId: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'tra_langid'
        },
        meaning: {
            type: Sequelize.CHAR,
            field: 'tra_meaning'
        },
        example: {
            type: Sequelize.CHAR,
            field: 'tra_example'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);




const sourcesMdl = sequelize.define('sources', {
        setId: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'src_id',
            autoIncrement: true,
            primaryKey: true,
        },
        langId: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'src_langid'
        },
        title: {
            type: Sequelize.CHAR,
            field: 'src_title'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);



const authorsMdl = sequelize.define('authors', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'auth_id',
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.CHAR,
            field: 'auth_title'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);


const formatsMdl = sequelize.define('formats', {
        Id: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'frm_id',
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.CHAR,
            field: 'frm_title'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);


const booksMdl = sequelize.define('books', {
        Id: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'bok_id',
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.CHAR,
            field: 'bok_title'
        },
        currentPage: {
            type: Sequelize.INTEGER,
            field: 'bok_current_page'
        },
        pagesTotal: {
            type: Sequelize.INTEGER,
            field: 'bok_pages'
        },
        code: {
            type: Sequelize.CHAR,
            field: 'bok_code'
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'bok_updated_at'
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);




booksMdl.belongsTo(langsMdl, {foreignKey: 'bok_lang_id', as: 'lang'});
booksMdl.belongsTo(formatsMdl, {foreignKey: 'bok_format_id', as: 'form'});
booksMdl.belongsTo(authorsMdl, {foreignKey: 'bok_author_id', as: 'auth'});
//wordsMdl.belongsTo(translationsMdl, {7foreignKey: 'tra_wordid', as: 'transtl'});


module.exports = {
    dbObj: sequelize,
    langsMdl,
    wordsMdl,
    posMdl,
    translationsMdl,
    sourcesMdl,
    booksMdl,
    formatsMdl,
    authorsMdl
};


