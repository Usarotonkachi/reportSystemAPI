const Ticket = require('../models/ticket.model');
const { Op } = require('sequelize');

async function createTicket(subject, message) {
  return await Ticket.create({ subject, message });
}

async function updateStatus(id, status) {
  const ticket = await Ticket.findByPk(id);
  if (!ticket) return null;
  ticket.status = status;
  return await ticket.save();
}

async function completeTicket(id, resolvedText) {
  const ticket = await Ticket.findByPk(id);
  if (!ticket) return null;
  ticket.status = 'COMPLETED';
  ticket.resolvedText = resolvedText;
  return await ticket.save();
}

async function cancelTicket(id, cancelReason) {
  const ticket = await Ticket.findByPk(id);
  if (!ticket) return null;
  ticket.status = 'CANCELED';
  ticket.cancelReason = cancelReason;
  return await ticket.save();
}

async function getTickets(date, from, to) {
  const where = {};
  if (date) {
    const d = new Date(date);
    const start = new Date(d.setHours(0, 0, 0, 0));
    const end = new Date(d.setHours(23, 59, 59, 999));
    where.createdAt = { [Op.between]: [start, end] };
  } else if (from && to) {
    where.createdAt = { [Op.between]: [new Date(from), new Date(to)] };
  }

  return await Ticket.findAll({ where });
}

async function cancelAllInProgress() {
  const [count] = await Ticket.update(
    { status: 'CANCELED', cancelReason: 'Auto-canceled' },
    { where: { status: 'IN_PROGRESS' } }
  );
  return count;
}

module.exports = {
  createTicket,
  updateStatus,
  completeTicket,
  cancelTicket,
  getTickets,
  cancelAllInProgress,
};
