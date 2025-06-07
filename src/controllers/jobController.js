const jobService = require('../services/jobService');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

exports.getUnpaidJobs = async (req, res) => {
    try {
        const jobs = await jobService.getUnpaidJobsForProfile(req.profile.id);
        logger.info(`Found ${jobs.length} unpaid job(s) for profile ${req.profile.id}`);
        res.json(jobs);
    } catch (err) {
        logger.error(`Error fetching unpaid jobs: ${err.message}`, { stack: err.stack });
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.payForJob = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Validation failed for POST /jobs/${req.params.job_id}/pay:`, errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const jobId = req.params.job_id;
    const profileId = req.profile?.id;

    try {
        const paidJob = await jobService.payForJob(jobId, profileId);
        logger.info(`Job ${jobId} paid by profile ${profileId}`);
        res.json({ success: true, job: paidJob });
    } catch (err) {
        logger.warn(`Payment failed for job ${jobId} by profile ${profileId}: ${err.message}`);
        res.status(400).json({ error: err.message });
    }
};
