const Sequelize = require('sequelize');
const db = require('../config/config.js')

const Travel = db.define('travel', {
    title: {
        type: Sequelize.STRING,
        unique: true
    },
    imageURL: {
        type: Sequelize.STRING,
        required: true
    },
    dateFrom: {
        type: Sequelize.DATEONLY,
        required: true
    },
    dateTo: {
        type: Sequelize.DATEONLY,
        required: true
    },
    price: {
        type: Sequelize.FLOAT,
        required: true
    },
    description: {
        type: Sequelize.TEXT,
        required: true
    },
    transport: {
        type: Sequelize.STRING,
        required: true
    },
    type: {
        type: Sequelize.STRING,
        required: true
    }
})

Travel.associate = function(models) {
    Travel.belongsToMany(models.User, {
      through: 'TravelUser',
      as: 'travels',
      foreignKey: 'travelId',
    });
  };

module.exports = Travel;