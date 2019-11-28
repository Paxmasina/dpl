const Sequelize = require('sequelize');
const db = require('../config/config.js')

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    }
})

User.associate = function(models) {
    User.belongsToMany(models.Travel, {
      through: 'TravelUser',
      as: 'users',
      foreignKey: 'userId',
    });
};


module.exports = User;