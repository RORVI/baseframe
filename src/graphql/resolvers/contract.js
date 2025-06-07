const { Contract, Profile, Job } = require('../../database/models');
const logger = require('../../utils/logger');

module.exports = {
    Query: {
        contracts: async () => {
            logger.info('[GraphQL] contracts query called');
            return await Contract.findAll();
        },
        contract: async (_, { id }) => {
            logger.info(`[GraphQL] contract query called with id: ${id}`);
            return await Contract.findByPk(id);
        },
    },

    Mutation: {
        createContract: async (_, args) => {
            try {
                logger.info(`[GraphQL] createContract called with args: ${JSON.stringify(args)}`);
                const contract = await Contract.create(args);
                logger.info(`[GraphQL] Contract created with id: ${contract.id}`);
                return contract;
            } catch (error) {
                logger.error(`[GraphQL] Failed to create contract: ${error.message}`, { error });
                throw new Error('Failed to create contract');
            }
        },

        updateContract: async (_, { id, ...updates }) => {
            try {
                logger.info(`[GraphQL] updateContract called for id: ${id} with updates: ${JSON.stringify(updates)}`);
                const contract = await Contract.findByPk(id);
                if (!contract) {
                    logger.warn(`[GraphQL] Contract with id ${id} not found`);
                    throw new Error('Contract not found');
                }
                await contract.update(updates);
                logger.info(`[GraphQL] Contract with id ${id} successfully updated`);
                return contract;
            } catch (error) {
                logger.error(`[GraphQL] Failed to update contract with id ${id}: ${error.message}`, { error });
                throw new Error('Failed to update contract');
            }
        },

        deleteContract: async (_, { id }) => {
            try {
                logger.info(`[GraphQL] deleteContract called for id: ${id}`);
                const rows = await Contract.destroy({ where: { id } });
                if (rows > 0) {
                    logger.info(`[GraphQL] Contract with id ${id} deleted`);
                    return true;
                } else {
                    logger.warn(`[GraphQL] No contract found with id ${id} to delete`);
                    return false;
                }
            } catch (error) {
                logger.error(`[GraphQL] Failed to delete contract with id ${id}: ${error.message}`, { error });
                throw new Error('Failed to delete contract');
            }
        },
    },

    Contract: {
        client: (contract) => Profile.findByPk(contract.ClientId),
        contractor: (contract) => Profile.findByPk(contract.ContractorId),
        jobs: (contract) => Job.findAll({ where: { ContractId: contract.id } }),
    },
};
