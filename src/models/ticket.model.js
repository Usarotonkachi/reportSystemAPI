const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Ticket = sequelize.define('Ticket', {
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('NEW', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'),
    defaultValue: 'NEW',
  },
  resolvedText: {
    type: DataTypes.TEXT,
  },
  cancelReason: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
});

module.exports = Ticket;
