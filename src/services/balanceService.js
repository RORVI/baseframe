const { Profile, Job, Contract } = require('../database/models').sequelize.models;
const { Op } = require('sequelize');
const { sequelize } = require('../database/models');

exports.deposit = async (userId, amount, requesterId) => {
    if (Number(userId) !== Number(requesterId)) {
        return { success: false, message: 'You can only deposit to your own account' };
    }

    return await sequelize.transaction(async (t) => {
        const profile = await Profile.findByPk(userId, { transaction: t });
        if (!profile || profile.type !== 'client') {
            throw new Error('Only clients can deposit');
        }

        const unpaidJobs = await Job.findAll({
            include: {
                model: Contract,
                where: {
                    ClientId: userId,
                    status: 'in_progress'
                }
            },
            where: {
                paid: { [Op.not]: true }
            },
            transaction: t
        });

        const totalUnpaid = unpaidJobs.reduce((sum, job) => sum + job.price, 0);
        const maxDeposit = totalUnpaid * 0.25;

        if (amount > maxDeposit) {
            throw new Error(`Cannot deposit more than 25% of unpaid jobs total (${maxDeposit})`);
        }

        profile.balance += amount;
        await profile.save({ transaction: t });

        return { success: true, balance: profile.balance };
    });
};
