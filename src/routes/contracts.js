const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');
const { param } = require('express-validator');

/**
 * @openapi
 * /contracts/{id}:
 *   get:
 *     summary: Get contract by ID
 *     description: Returns a contract by ID, only if the profile is either the client or contractor.
 *     tags:
 *       - Contracts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the contract
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Contract found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       400:
 *         description: Invalid contract ID
 *       404:
 *         description: Contract not found or access denied
 */
router.get(
    '/:id', 
    param('id').isInt({ min: 1 }).withMessage('Contract ID must be a positive integer'),
    contractController.getContractById
);

/**
 * @openapi
 * /contracts:
 *   get:
 *     summary: Get all active contracts for the profile
 *     description: Returns all contracts associated with the current profile that are not terminated.
 *     tags:
 *       - Contracts
 *     responses:
 *       200:
 *         description: List of contracts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contract'
 */
router.get('/', contractController.fetchContracts);

module.exports = router;
