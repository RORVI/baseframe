const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({ dialect: 'sqlite', storage: './src/database/database.sqlite3' });

const Profile = require('./profile')(sequelize, DataTypes);
const Contract = require('./contract')(sequelize, DataTypes);
const Job = require('./job')(sequelize, DataTypes);

// Contractor association (contractorId is the foreign key)
Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor', foreignKey: 'ContractorId' });

// Client association (clientId is the foreign key)
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client', foreignKey: 'ClientId' });

Contract.hasMany(Job, { foreignKey: 'ContractId' });
Job.belongsTo(Contract, { foreignKey: 'ContractId' });

module.exports = { sequelize, Profile, Contract, Job };
