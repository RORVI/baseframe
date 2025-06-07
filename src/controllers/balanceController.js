const { validationResult } = require('express-validator');
const balanceService = require('../services/balanceService');
const logger = require('../utils/logger');

exports.depositBalance = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Validation failed for deposit', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = parseInt(req.params.userId);
    const { amount } = req.body;
    const requesterId = req.profile?.id;

    try {
        const result = await balanceService.deposit(userId, amount, requesterId);
        if (!result.success) {
            logger.warn(`Deposit failed: ${result.message}`);
            return res.status(400).json({ error: result.message });
        }

        logger.info(`User ${userId} deposited ${amount}`);
        res.json({ message: 'Deposit successful', balance: result.balance });
    } catch (err) {
        logger.error(`Error during deposit: ${err.message}`, { stack: err.stack });
        res.status(500).json({ error: 'Internal server error' });
    }
};
