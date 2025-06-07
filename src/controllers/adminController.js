const { validationResult } = require('express-validator');
const adminService = require('../services/adminService');
const logger = require('../utils/logger');

exports.getBestProfession = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validation failed for /admin/best-profession', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { start, end } = req.query;

  try {
    const profession = await adminService.findTopProfession(start, end);
    res.json({ profession });
  } catch (err) {
    logger.error(`Error in getBestProfession: ${err.message}`);
    res.status(500).json({ error: 'Failed to retrieve best profession' });
  }
};

exports.getBestClients = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Validation failed for /admin/best-clients:`, errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { start, end, limit } = req.query;
  
    try {
      const results = await adminService.getBestClients(start, end, parseInt(limit) || 2);
      res.json(results);
    } catch (err) {
      logger.error(`Error in getBestClients: ${err.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  