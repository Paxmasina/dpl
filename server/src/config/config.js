const Sequelize = require('sequelize');
const db = {
    user: "postgres",
    password: "burislav94",
    host: "localhost",
    port: 5432,
    name: "agencija",
    dialcet: "postgres"
}

module.exports = new Sequelize(db.name, db.user, db.password, {
    host: db.host, //your server
    port:  db.port, //server port
    dialect: "postgres"
});
