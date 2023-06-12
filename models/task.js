const {Sequelize, DataTypes} = require('sequelize');
const sequelize              = new Sequelize('todo_list', 'root', 'toor', {
    host   : 'localhost',
    dialect: 'mysql',
});

const Task = sequelize.define('Task', {
    title      : {
        type     : DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type     : DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'tasks',
});

module.exports = Task;