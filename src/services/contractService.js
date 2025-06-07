const { sequelize } = require('../database/models');
const { Contract } = sequelize.models;
const { Op } = require('sequelize');

exports.getContractById = async (contractId, profileId) => {
    const contract = await Contract.findOne({
        where: {
            id: contractId,
            [Op.or]: [
                { ClientId: profileId },
                { ContractorId: profileId }
            ]
        }
    });

    return contract;
};

exports.getContractsForProfile = async (profileId) => {
    return await Contract.findAll({
        where: {
            status: { [Op.ne]: 'terminated' },
            [Op.or]: [
                { ClientId: profileId },
                { ContractorId: profileId }
            ]
        }
    });
};

