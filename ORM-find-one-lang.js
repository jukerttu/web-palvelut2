const Sequelize = require('sequelize');
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

async function findLang(name) {
    let lang = await Lang.findOne({where: {name: name}})
    console.log(lang);
    sequelize.close();
}

async function findAllRows() {
    let langs = await Lang.findAll({raw: true});
    console.log(langs);
    sequelize.close();
}

findLang("Finnish");
findLang("Icelandic");
//findAllRows()