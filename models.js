const Sequelize = require('sequelize');
//const dotenv = require('dotenv');
//dotenv.config();

console.log('process.env.KANBAN_DB');
console.log(process.env.DBNAME);

const dbname = process.env.DBNAME || 'pushkindb';

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



const levelsMdl = sequelize.define('levels', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'lvl_id',
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.CHAR,
        field: 'lvl_title'
    }
},
{
    timestamps: false,
    freezeTableName: true
}
);




const diplomasMdl = sequelize.define('diplomas', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'dip_id',
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.CHAR,
        field: 'dip_title'
    }
},
{
    timestamps: false,
    freezeTableName: true
}
);


const diplomasFeesMdl = sequelize.define('diploma_fees', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'dpf_id',
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: Sequelize.FLOAT,
        field: 'dpf_amount'
    },
    active: {
        type: Sequelize.INTEGER,
        field: 'dpf_active'
    }
},
{
    timestamps: false,
    freezeTableName: true
}
);

const studentCatsMdl = sequelize.define('student_categories', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'std_cat_id',
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.CHAR,
        field: 'std_title'
    }
},
{
    timestamps: false,
    freezeTableName: true
}
);





diplomasMdl.belongsTo(langsMdl, {foreignKey: 'dip_lang_id', as: 'language'});
diplomasMdl.belongsTo(levelsMdl, {foreignKey: 'dip_lvl_id', as: 'level'});


diplomasMdl.hasMany(diplomasFeesMdl, {foreignKey: 'dpf_diploma_id', as: 'fees'});
diplomasFeesMdl.belongsTo(studentCatsMdl, {foreignKey: 'dpf_student_cat_id', as: 'category'});


module.exports = {
    dbObj:sequelize,
    diplomasMdl,
    levelsMdl,
    langsMdl,
    diplomasFeesMdl,
    studentCatsMdl
};


