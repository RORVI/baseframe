const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { query } = require('express-validator');

/**
 * @openapi
 * /admin/best-profession:
 *   get:
 *     summary: Get the profession that earned the most money in a time range
 *     description: Returns the profession with the highest total earnings between the given start and end dates.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: query
 *         name: start
 *         required: true
 *         description: Start date (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end
 *         required: true
 *         description: End date (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Best profession found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profession:
 *                   type: string
 *                   example: "Software Developer"
 *                 earnings:
 *                   type: number
 *                   format: float
 *                   example: 20000
 *       400:
 *         description: Invalid date range or missing parameters
 *       500:
 *         description: Internal server error
 */
router.get(
    '/best-profession',
    [
        query('start').isISO8601().withMessage('Start date is required and must be ISO8601'),
        query('end').isISO8601().withMessage('End date is required and must be ISO8601')
    ],
    adminController.getBestProfession
);

/**
 * @openapi
 * /admin/best-clients:
 *   get:
 *     summary: Get the clients that paid the most in a time range
 *     description: Returns the top clients ranked by their total payments, limited by the optional `limit` query param.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: query
 *         name: start
 *         required: true
 *         description: Start date (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end
 *         required: true
 *         description: End date (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Max number of clients to return (default is 2)
 *         schema:
 *           type: integer
 *           default: 2
 *     responses:
 *       200:
 *         description: Top clients retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 12
 *                   fullName:
 *                     type: string
 *                     example: "John Doe"
 *                   paid:
 *                     type: number
 *                     example: 30500
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Internal server error
 */
router.get(
    '/best-clients',
    [
        query('start')
            .exists().withMessage('Start date is required')
            .isISO8601().withMessage('Start date must be a valid ISO8601 date'),
        query('end')
            .exists().withMessage('End date is required')
            .isISO8601().withMessage('End date must be a valid ISO8601 date'),
        query('limit')
            .optional()
            .isInt({ min: 1 }).withMessage('Limit must be a positive integer')
    ],
    adminController.getBestClients
);


module.exports = router;
