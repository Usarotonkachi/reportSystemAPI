const service = require('../services/ticket.service');

exports.create = async (req, res) => {
  const { subject, message } = req.body;
  const ticket = await service.createTicket(subject, message);
  res.json(ticket);
};

exports.start = async (req, res) => {
  const ticket = await service.updateStatus(req.params.id, 'IN_PROGRESS');
  res.json(ticket);
};

exports.complete = async (req, res) => {
  const { resolvedText } = req.body;
  const ticket = await service.completeTicket(req.params.id, resolvedText);
  res.json(ticket);
};

exports.cancel = async (req, res) => {
  const { cancelReason } = req.body;
  const ticket = await service.cancelTicket(req.params.id, cancelReason);
  res.json(ticket);
};

exports.list = async (req, res) => {
  const { date, from, to } = req.query;
  const tickets = await service.getTickets(date, from, to);
  res.json(tickets);
};

exports.cancelInProgress = async (_req, res) => {
  const count = await service.cancelAllInProgress();
  res.json({ canceled: count });
};
