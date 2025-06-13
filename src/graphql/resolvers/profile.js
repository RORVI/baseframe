const { Profile, Contract } = require('../../database/models');
const logger = require('../../utils/logger');
const DataLoader = require('dataloader');

module.exports = {
    Query: {
        profiles: async () => {
            logger.info('[GraphQL] profiles query called');
            const all = await Profile.findAll();
            all.forEach(p => loaders.profile.prime(p.id, p)); 
            return all;
        },
        profile: async (_, { id }) => {
            logger.info(`[GraphQL] profile query called with id: ${id}`);
            return await loaders.profile.load(id);
        },
    },
    Mutation: {
        createProfile: async (_, args) => {
            try {
                logger.info(`[GraphQL] createProfile called with args: ${JSON.stringify(args)}`);
                const profile = await Profile.create(args);
                logger.info(`[GraphQL] Profile created with id: ${profile.id}`);
                return profile;
            } catch (error) {
                logger.error(`[GraphQL] Failed to create profile: ${error.message}`, { error });
                throw new Error('Failed to create profile');
            }
        },

        updateProfile: async (_, { id, ...updates }) => {
            try {
                logger.info(`[GraphQL] updateProfile called for id: ${id} with updates: ${JSON.stringify(updates)}`);
                const profile = await Profile.findByPk(id);
                if (!profile) {
                    logger.warn(`[GraphQL] Profile with id ${id} not found`);
                    throw new Error('Profile not found');
                }
                await profile.update(updates);
                logger.info(`[GraphQL] Profile with id ${id} successfully updated`);
                return profile;
            } catch (error) {
                logger.error(`[GraphQL] Failed to update profile with id ${id}: ${error.message}`, { error });
                throw new Error('Failed to update profile');
            }
        },

        deleteProfile: async (_, { id }) => {
            try {
                logger.info(`[GraphQL] deleteProfile called for id: ${id}`);
                const rows = await Profile.destroy({ where: { id } });
                if (rows > 0) {
                    logger.info(`[GraphQL] Profile with id ${id} deleted`);
                    return true;
                } else {
                    logger.warn(`[GraphQL] No profile found with id ${id} to delete`);
                    return false;
                }
            } catch (error) {
                logger.error(`[GraphQL] Failed to delete profile with id ${id}: ${error.message}`, { error });
                throw new Error('Failed to delete profile');
            }
        },
    },
    Profile: {
        contractsAsClient: (parent) =>
            Contract.findAll({ where: { ClientId: parent.id } }),
        contractsAsContractor: (parent) =>
            Contract.findAll({ where: { ContractorId: parent.id } }),
    },
};
