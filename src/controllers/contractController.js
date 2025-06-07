const { validationResult } = require('express-validator');
const contractService = require('../services/contractService');
const logger = require('../utils/logger');

exports.getContractById = async (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;
    const profileId = req.profile?.id;

    if (!errors.isEmpty()) {
        logger.warn(`Validation failed for GET /contracts/${id}: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const contract = await contractService.getContractById(id, profileId);

        if (!contract) {
            logger.info(`Contract ${id} not found or access denied for profile ${profileId}`);
            return res.status(404).json({ error: 'Contract not found or access denied.' });
        }

        logger.info(`Contract ${id} successfully retrieved for profile ${profileId}`);
        return res.status(200).json(contract);
    } catch (err) {
        logger.error(`Error retrieving contract ${id}: ${err.message}`, { stack: err.stack });
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.fetchContracts = async (req, res) => {
    const errors = validationResult(req);
    const profileId = req.profile?.id;

    if (!errors.isEmpty()) {
        logger.warn(`Validation failed for GET /contracts/: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const contracts = await contractService.getContractsForProfile(profileId);
        logger.info(`${contracts.length} contract(s) retrieved for profile ${profileId}`);
        return res.status(200).json(contracts);
    } catch (err) {
        logger.error(`Error fetching contracts: ${err.message}`, { stack: err.stack });
        return res.status(500).json({ error: 'Failed to fetch contracts' });
    }
};