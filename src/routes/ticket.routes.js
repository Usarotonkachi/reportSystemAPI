const express = require('express');
const controller = require('../controllers/ticket.controller');
const router = express.Router();

router.post('/', controller.create);
router.patch('/:id/start', controller.start);
router.patch('/:id/complete', controller.complete);
router.patch('/:id/cancel', controller.cancel);
router.get('/', controller.list);
router.post('/cancel-in-progress', controller.cancelInProgress);

module.exports = router;
