const Sequelize = require('sequelize');
//const Postgres = require('pg');
//const path = 'mysql://root:root66@localhost:3306/nodejs';
const path = 'postgres://postgres:password@127.0.0.1:5432/Web_palvelut';

const sequelize = new Sequelize(path, {
    operatorsAliases: false,
    logging         : false
});

let Lang = sequelize.define('langs', {
    code: Sequelize.STRING,
    name: Sequelize.STRING
});

let langs = [
    {
        "code": "fi",
        "name": "Finnish",
    },
    {
        "code": "se",
        "name": "Swedish",
    },
    {
        "code": "en",
        "name": "English",
    },
    {
        "code": "no",
        "name": "Norwegian",
    },
    {
        "code": "da",
        "name": "Danish",
    },
    {
        "code": "de",
        "name": "German",
    },
    {
        "code": "is",
        "name": "Icelandic",
    }]


sequelize.sync({force: true}).then(() => {
    Lang.bulkCreate(langs, {validate: true}).then(() => {
        console.log('langs created');
    }).catch((err) => {
        console.log("Error: " + err);
    }).finally(() => {
        sequelize.close();
    });
});