const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        freezeTableName: true// para que no agruegue la S tipo solicitud's', al crear el schema en la db xd.
      }
  });
  

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.solicitud = require('./solicitud')(sequelize, Sequelize);

module.exports = db;
