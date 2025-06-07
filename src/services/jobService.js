const { Job, Contract } = require('../database/models').sequelize.models;
const { Op } = require('sequelize');

exports.getUnpaidJobsForProfile = async (profileId) => {
    return await Job.findAll({
        where: {
            paid: { [Op.not]: true }
        },
        include: [{
            model: Contract,
            where: {
                status: 'in_progress',
                [Op.or]: [
                    { ClientId: profileId },
                    { ContractorId: profileId }
                ]
            }
        }]
    });
};

exports.payForJob = async (jobId, profileId) => {
    const { Job, Profile, Contract } = require('../database/models').sequelize.models;
    const { sequelize } = require('../database/models');

    return await sequelize.transaction(async (t) => {
        const job = await Job.findOne({
            where: {
                id: Number(jobId),
                paid: false
            },
            include: [{
                model: Contract,
                where: {
                    ClientId: profileId,
                    status: 'in_progress'
                }
            }],
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (!job) throw new Error('Job not found or already paid or access denied.');

        const client = await Profile.findByPk(job.Contract.ClientId, { transaction: t });
        const contractor = await Profile.findByPk(job.Contract.ContractorId, { transaction: t });

        if (!contractor) throw new Error('Contractor not found');

        if (client.balance < job.price) {
            throw new Error('Insufficient balance');
        }

        client.balance -= job.price;
        contractor.balance += job.price;
        job.paid = true;
        job.paymentDate = new Date();

        await client.save({ transaction: t });
        await contractor.save({ transaction: t });
        await job.save({ transaction: t });

        return job;
    });
};

