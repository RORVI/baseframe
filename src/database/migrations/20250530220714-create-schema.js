'use strict';

const logger = require('../../utils/logger');

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableNames = await queryInterface.showAllTables();

    if (!tableNames.includes('Profiles')) {
      logger.info("Creating table for Profiles");
      await queryInterface.createTable('Profiles', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.literal('(lower(hex(randomblob(16))))')
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        profession: {
          type: Sequelize.STRING,
          allowNull: false
        },
        balance: {
          type: Sequelize.DECIMAL(12, 2)
        },
        type: {
          type: Sequelize.ENUM('client', 'contractor')
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false, 
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false, 
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });
    } else {
      logger.error("Skipping table creation for Profiles. Already existing");
    }

    if (!tableNames.includes('Contracts')) {
      logger.info("Creating table for Contracts");
      await queryInterface.createTable('Contracts', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.literal('(lower(hex(randomblob(16))))')
        },
        terms: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM('new', 'in_progress', 'terminated')
        },
        ClientId: {
          type: Sequelize.UUID,
          references: {
            model: 'Profiles',
            key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        ContractorId: {
          type: Sequelize.UUID,
          references: {
            model: 'Profiles',
            key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false, 
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false, 
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });
    } else {
      logger.error("Skipping table creation for Contracts. Already existing");
    }

    if (!tableNames.includes('Jobs')) {
      logger.info("Creating table for Jobs");
      await queryInterface.createTable('Jobs', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.literal('(lower(hex(randomblob(16))))')
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        price: {
          type: Sequelize.DECIMAL(12, 2),
          allowNull: false
        },
        paid: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        paymentDate: {
          type: Sequelize.DATE
        },
        ContractId: {
          type: Sequelize.UUID,
          references: {
            model: 'Contracts',
            key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false, 
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false, 
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });
    } else {
      logger.error("Skipping table creation for Jobs. Already existing");
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Jobs');
    await queryInterface.dropTable('Contracts');
    await queryInterface.dropTable('Profiles');
  }
};
