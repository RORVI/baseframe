const jobService = require('../../services/jobService');
const { Op } = require('sequelize');

jest.mock('../../database/models', () => {
  const mockFindAll = jest.fn();
  const mockFindOne = jest.fn();
  const mockFindByPk = jest.fn();
  const mockSave = jest.fn();

  const mockTransaction = jest.fn(async (callback) => {
    const t = {
      LOCK: { UPDATE: 'UPDATE' },
      ...jest.requireActual('sequelize').Transaction.prototype,
      uuid: 'mock-transaction-id',
      name: 'mock-transaction-name',
    };
    return await callback(t);
  });

  const actualModels = jest.requireActual('../../database/models');

  return {
    sequelize: {
      ...actualModels.sequelize,
      models: {
        Job: { findAll: mockFindAll, findOne: mockFindOne, save: mockSave },
        Contract: { ...actualModels.sequelize.models.Contract },
        Profile: { findByPk: mockFindByPk, save: mockSave }
      },
      transaction: mockTransaction,
    },
    default: {
      sequelize: {
        models: {
          Job: { findAll: mockFindAll, findOne: mockFindOne, save: mockSave },
          Contract: { ...actualModels.sequelize.models.Contract },
          Profile: { findByPk: mockFindByPk, save: mockSave }
        },
        transaction: mockTransaction,
      },
    },
    mockFindAll,
    mockFindOne,
    mockFindByPk,
    mockSave,
    mockTransaction,
  };
});

const { mockFindAll, mockFindOne, mockFindByPk, mockSave, mockTransaction } = require('../../database/models');

describe('jobService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUnpaidJobsForProfile', () => {
    it('should fetch unpaid jobs for a given profile', async () => {
      const fakeJobs = [{ id: 1 }, { id: 2 }];
      mockFindAll.mockResolvedValue(fakeJobs);

      const result = await jobService.getUnpaidJobsForProfile(1);

      expect(mockFindAll).toHaveBeenCalledWith({
        where: { paid: { [Op.not]: true } },
        include: [{
          model: expect.anything(),
          where: {
            status: 'in_progress',
            [Op.or]: [
              { ClientId: 1 },
              { ContractorId: 1 },
            ],
          },
        }],
      });
      expect(result).toEqual(fakeJobs);
    });
  });

  describe('payForJob', () => {
    it('should throw error if job is not found', async () => {
      const jobId = 999;
      const profileId = 1;

      mockFindOne.mockResolvedValue(null);

      await expect(jobService.payForJob(jobId, profileId)).rejects.toThrow('Job not found or already paid or access denied.');
    });
  });
});