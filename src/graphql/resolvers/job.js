const { Job, Contract } = require('../../database/models');
const logger = require('../../utils/logger');

module.exports = {
    Query: {
        jobs: async () => {
            logger.info('[GraphQL] jobs query called');
            return await Job.findAll();
        },
        job: async (_, { id }) => {
            logger.info(`[GraphQL] job query called with id: ${id}`);
            return await Job.findByPk(id);
        },
    },
    Mutation: {
        createJob: async (_, args) => {
            try {
                logger.info(`[GraphQL] createJob called with args: ${JSON.stringify(args)}`);
                const job = await Job.create(args);
                logger.info(`[GraphQL] Job created with id: ${job.id}`);
                return job;
            } catch (error) {
                logger.error(`[GraphQL] Failed to create job: ${error.message}`, { error });
                throw new Error('Failed to create job');
            }
        },

        updateJob: async (_, { id, ...updates }) => {
            try {
                logger.info(`[GraphQL] updateJob called for id: ${id} with updates: ${JSON.stringify(updates)}`);
                const job = await Job.findByPk(id);
                if (!job) {
                    logger.warn(`[GraphQL] Job with id ${id} not found`);
                    throw new Error('Job not found');
                }
                await job.update(updates);
                logger.info(`[GraphQL] Job with id ${id} successfully updated`);
                return job;
            } catch (error) {
                logger.error(`[GraphQL] Failed to update job with id ${id}: ${error.message}`, { error });
                throw new Error('Failed to update job');
            }
        },

        deleteJob: async (_, { id }) => {
            try {
                logger.info(`[GraphQL] deleteJob called for id: ${id}`);
                const rows = await Job.destroy({ where: { id } });
                if (rows > 0) {
                    logger.info(`[GraphQL] Job with id ${id} deleted`);
                    return true;
                } else {
                    logger.warn(`[GraphQL] No job found with id ${id} to delete`);
                    return false;
                }
            } catch (error) {
                logger.error(`[GraphQL] Failed to delete job with id ${id}: ${error.message}`, { error });
                throw new Error('Failed to delete job');
            }
        },
    },
    Job: {
        contract: (job) => Contract.findByPk(job.ContractId),
    },
};
