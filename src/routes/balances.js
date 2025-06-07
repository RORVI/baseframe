const express = require('express');
const { param, body } = require('express-validator');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

/**
 * @openapi
 * /balances/deposit/{userId}:
 *   post:
 *     summary: Deposit money to a user's balance
 *     description: Allows depositing a specific amount to the balance of a user (typically from a client).
 *     tags:
 *       - Balances
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user receiving the deposit
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *                 minimum: 0.01
 *                 example: 150.50
 *     responses:
 *       200:
 *         description: Deposit successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Deposit completed"
 *       400:
 *         description: Validation failed or deposit not allowed
 *       404:
 *         description: User not found
 */
router.post(
  '/deposit/:userId',
  [
    param('userId').isInt({ min: 1 }).withMessage('User ID must be a positive integer'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0')
  ],
  balanceController.depositBalance
);

module.exports = router;
