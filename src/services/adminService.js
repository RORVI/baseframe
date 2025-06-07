const { sequelize } = require('../database/models');
const { Op } = require('sequelize');

exports.findTopProfession = async (start, end) => {
  const { Job, Contract, Profile } = sequelize.models;

  const result = await Job.findAll({
    attributes: [
      [sequelize.col('Contract.Contractor.profession'), 'profession'],
      [sequelize.fn('sum', sequelize.col('price')), 'total_earned']
    ],
    include: [
      {
        model: Contract,
        attributes: [],
        include: [
          {
            model: Profile,
            as: 'Contractor',
            attributes: []
          }
        ]
      }
    ],
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [new Date(start), new Date(end)]
      }
    },
    group: ['Contract.Contractor.profession'],
    order: [[sequelize.literal('total_earned'), 'DESC']],
    limit: 1,
    raw: true
  });

  return result[0]?.profession || 'No data';
};

exports.getBestClients = async (start, end, limit = 2) => {
    const { Job, Contract, Profile } = sequelize.models;

    return await Job.findAll({
      attributes: [
        [sequelize.col('Contract.Client.id'), 'id'],
        [sequelize.fn('concat', sequelize.col('Contract.Client.firstName'), ' ', sequelize.col('Contract.Client.lastName')), 'fullName'],
        [sequelize.fn('sum', sequelize.col('price')), 'paid']
      ],
      include: [
        {
          model: Contract,
          as: 'Contract',
          include: [
            {
              model: Profile,
              as: 'Client',
              attributes: []
            }
          ]
        }
      ],
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: [new Date(start), new Date(end)]
        }
      },
      group: ['Contract.Client.id'],
      order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']],
      limit
    });
  };