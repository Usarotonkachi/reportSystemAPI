require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./db');
const Ticket = require('./models/ticket.model');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Connected to db');

    app.listen(PORT, () => {
      console.log(`running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('failed:', error);
  }
})();
