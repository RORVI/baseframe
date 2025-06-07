'use strict';
const { v4: uuidv4 } = require('uuid');
const logger = require('../../utils/logger');

module.exports = {
  async up(queryInterface, Sequelize) {
    const profiles = [
      { id: uuidv4(), firstName: 'Harry', lastName: 'Potter', profession: 'Wizard', balance: 1150, type: 'client' },
      { id: uuidv4(), firstName: 'Mr', lastName: 'Robot', profession: 'Hacker', balance: 231.11, type: 'client' },
      { id: uuidv4(), firstName: 'John', lastName: 'Snow', profession: 'Knows nothing', balance: 451.3, type: 'client' },
      { id: uuidv4(), firstName: 'Ash', lastName: 'Kethcum', profession: 'Pokemon master', balance: 1.3, type: 'client' },
      { id: uuidv4(), firstName: 'John', lastName: 'Lenon', profession: 'Musician', balance: 64, type: 'contractor' },
      { id: uuidv4(), firstName: 'Linus', lastName: 'Torvalds', profession: 'Programmer', balance: 1214, type: 'contractor' },
      { id: uuidv4(), firstName: 'Alan', lastName: 'Turing', profession: 'Programmer', balance: 22, type: 'contractor' },
      { id: uuidv4(), firstName: 'Aragorn', lastName: 'II Elessar Telcontarvalds', profession: 'Fighter', balance: 314, type: 'contractor' },
      { id: uuidv4(), firstName: 'Ada', lastName: 'Lovelace', profession: 'Mathematician', balance: 900.75, type: 'contractor' },
      { id: uuidv4(), firstName: 'Elon', lastName: 'Musk', profession: 'Entrepreneur', balance: 4500, type: 'client' }
    ];

    const profileByIndex = index => profiles[index].id;

    const contracts = [
      { id: uuidv4(), terms: 'bla bla bla', status: 'terminated', ClientId: profileByIndex(0), ContractorId: profileByIndex(4) },
      { id: uuidv4(), terms: 'bla bla bla', status: 'in_progress', ClientId: profileByIndex(0), ContractorId: profileByIndex(5) },
      { id: uuidv4(), terms: 'bla bla bla', status: 'in_progress', ClientId: profileByIndex(1), ContractorId: profileByIndex(5) },
      { id: uuidv4(), terms: 'bla bla bla', status: 'in_progress', ClientId: profileByIndex(1), ContractorId: profileByIndex(6) },
      { id: uuidv4(), terms: 'bla bla bla', status: 'new', ClientId: profileByIndex(2), ContractorId: profileByIndex(7) },
      { id: uuidv4(), terms: 'bla bla bla', status: 'in_progress', ClientId: profileByIndex(2), ContractorId: profileByIndex(6) },
      { id: uuidv4(), terms: 'bla bla bla', status: 'in_progress', ClientId: profileByIndex(3), ContractorId: profileByIndex(6) },
      { id: uuidv4(), terms: 'bla bla bla', status: 'in_progress', ClientId: profileByIndex(3), ContractorId: profileByIndex(5) },
      { id: uuidv4(), terms: 'bla bla bla', status: 'in_progress', ClientId: profileByIndex(3), ContractorId: profileByIndex(7) },
      { id: uuidv4(), terms: 'contract between Elon and Ada', status: 'in_progress', ClientId: profileByIndex(9), ContractorId: profileByIndex(8) },
      { id: uuidv4(), terms: 'future AI development', status: 'new', ClientId: profileByIndex(9), ContractorId: profileByIndex(6) }
    ];

    const contractByIndex = index => contracts[index].id;

    const jobs = [
      { description: 'work', price: 200, paid: false, ContractId: contractByIndex(0) },
      { description: 'work', price: 201, paid: false, ContractId: contractByIndex(1) },
      { description: 'work', price: 202, paid: false, ContractId: contractByIndex(2) },
      { description: 'work', price: 200, paid: false, ContractId: contractByIndex(3) },
      { description: 'work', price: 200, paid: false, ContractId: contractByIndex(6) },
      { description: 'work', price: 2020, paid: true, paymentDate: '2020-08-15T19:11:26.737Z', ContractId: contractByIndex(6) },
      { description: 'work', price: 200, paid: true, paymentDate: '2020-08-15T19:11:26.737Z', ContractId: contractByIndex(1) },
      { description: 'work', price: 200, paid: true, paymentDate: '2020-08-16T19:11:26.737Z', ContractId: contractByIndex(2) },
      { description: 'work', price: 200, paid: true, paymentDate: '2020-08-17T19:11:26.737Z', ContractId: contractByIndex(0) },
      { description: 'work', price: 200, paid: true, paymentDate: '2020-08-17T19:11:26.737Z', ContractId: contractByIndex(4) },
      { description: 'work', price: 21, paid: true, paymentDate: '2020-08-10T19:11:26.737Z', ContractId: contractByIndex(0) },
      { description: 'work', price: 21, paid: true, paymentDate: '2020-08-15T19:11:26.737Z', ContractId: contractByIndex(1) },
      { description: 'work', price: 121, paid: true, paymentDate: '2020-08-15T19:11:26.737Z', ContractId: contractByIndex(2) },
      { description: 'work', price: 121, paid: true, paymentDate: '2020-08-14T23:11:26.737Z', ContractId: contractByIndex(2) },
      { description: 'Neuralink integration', price: 1200, paid: true, paymentDate: '2020-08-21T10:00:00.000Z', ContractId: contractByIndex(9) },
      { description: 'Mars rocket design', price: 3400, paid: false, ContractId: contractByIndex(9) },
      { description: 'General AI prototype', price: 2100, paid: true, paymentDate: '2020-08-22T12:00:00.000Z', ContractId: contractByIndex(10) }
    ];

    logger.info('\n<== Seeding the database with UUIDs ==>');
    try {
      await queryInterface.bulkInsert('Profiles', profiles, {});
      logger.info(`Inserted ${profiles.length} profiles`);
    } catch (err) {
      logger.error(`Failed inserting profiles: ${err.message}`);
    }

    try {
      await queryInterface.bulkInsert('Contracts', contracts, {});
      logger.info(`Inserted ${contracts.length} contracts`);
    } catch (err) {
      logger.error(`Failed inserting contracts: ${err.message}`);
    }

    try {
      await queryInterface.bulkInsert('Jobs', jobs, {});
      logger.info(`Inserted ${jobs.length} jobs`);
    } catch (err) {
      logger.error(`Failed inserting jobs: ${err.message}`);
    }

    logger.info('<== Finished seeding the database ==>');
  },

  async down(queryInterface, Sequelize) {
    logger.info('\nRolling back UUID-based seeds');
    try {
      await queryInterface.bulkDelete('Jobs', null, {});
      await queryInterface.bulkDelete('Contracts', null, {});
      await queryInterface.bulkDelete('Profiles', null, {});
      logger.info('Completed rolling back seeds');
    } catch (err) {
      logger.error(`Failed rolling back seeds: ${err.message}`);
    }
  }
};
