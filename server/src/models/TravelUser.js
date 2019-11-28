const db = require('../config/config.js')
const Sequelize = require('sequelize');

//const Travel = require('../models/Travel.js');

let TravelUser = db.define('traveluser', {
    userId: {
        type: Sequelize.INTEGER,
    },
    travelId: {
        type: Sequelize.INTEGER,
    },
});



module.exports = TravelUser;