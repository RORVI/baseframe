const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { param } = require('express-validator');

/**
 * @openapi
 * /jobs/unpaid:
 *   get:
 *     summary: Get unpaid jobs
 *     description: Returns all unpaid jobs for the currently authenticated user (contractor).
 *     tags:
 *       - Jobs
 *     responses:
 *       200:
 *         description: List of unpaid jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       401:
 *         description: Unauthorized
 */
router.get('/unpaid', jobController.getUnpaidJobs);

/**
 * @openapi
 * /jobs/{job_id}/pay:
 *   post:
 *     summary: Pay for a job
 *     description: Allows a client to pay for a specific job, transferring money to the contractor if sufficient balance is available.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: job_id
 *         required: true
 *         description: ID of the job to pay for
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Job paid successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 job:
 *                   $ref: '#/components/schemas/Job'
 *       400:
 *         description: Payment failed (e.g., not enough balance, job already paid)
 *       404:
 *         description: Job not found or unauthorized
 */
router.post(
    '/:job_id/pay',
    param('job_id').isInt({ min: 1 }).withMessage('Job ID must be a positive integer'),
    jobController.payForJob
  );

module.exports = router;
