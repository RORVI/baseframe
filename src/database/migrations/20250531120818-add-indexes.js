'use strict';

const logger = require('../../utils/logger');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    logger.info('Adding indexes');
    await queryInterface.addIndex('Profiles', ['type'], {
      name: 'idx_profiles_type',
    });

    await queryInterface.addIndex('Contracts', ['ClientId', 'ContractorId'], {
      name: 'idx_contracts_client_contractor',
    });

    await queryInterface.addIndex('Jobs', ['paid'], {
      name: 'idx_jobs_paid',
    });
    logger.info('Indexes added');
  },

  async down (queryInterface, Sequelize) {
    logger.info('Removing indexes...');
    await queryInterface.removeIndex('Profiles', 'idx_profiles_type');
    await queryInterface.removeIndex('Contracts', 'idx_contracts_client_contractor');
    await queryInterface.removeIndex('Jobs', 'idx_jobs_paid');
    logger.info('Indexes removed');
  }
};
