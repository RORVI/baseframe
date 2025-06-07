const contractService = require('../../services/contractService');
const { Contract } = require('../../database/models').sequelize.models;
const { Op } = require('sequelize');

jest.mock('../../database/models', () => {
  const actual = jest.requireActual('../../database/models');
  
  return {
    ...actual,
    sequelize: {
      ...actual.sequelize,
      models: {
        ...actual.sequelize.models,
        Contract: {
          findOne: jest.fn(),
        },
      },
    },
  };
});

describe('contractService.getContractById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the contract if found for the profileId', async () => {
    const mockContract = { id: 1, ClientId: 1 };
    Contract.findOne.mockResolvedValue(mockContract);

    const result = await contractService.getContractById(1, 1);

    expect(Contract.findOne).toHaveBeenCalledWith({
      where: {
        id: 1,
        [Op.or]: [{ ClientId: 1 }, { ContractorId: 1 }],
      },
    });
    expect(result).toEqual(mockContract);
  });

  it('should return null if no contract is found', async () => {
    Contract.findOne.mockResolvedValue(null);

    const result = await contractService.getContractById(999, 1);

    expect(result).toBeNull();
    expect(Contract.findOne).toHaveBeenCalled();
  });
});

describe('contractService.getContractsForProfile', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return contracts for the profile excluding terminated', async () => {
      const mockContracts = [
        { id: 1, ClientId: 1, status: 'in_progress' },
        { id: 2, ContractorId: 1, status: 'new' },
      ];
      Contract.findAll = jest.fn().mockResolvedValue(mockContracts);
  
      const result = await contractService.getContractsForProfile(1);
  
      expect(Contract.findAll).toHaveBeenCalledWith({
        where: {
          status: { [Op.ne]: 'terminated' },
          [Op.or]: [{ ClientId: 1 }, { ContractorId: 1 }],
        },
      });
      expect(result).toEqual(mockContracts);
    });
  
    it('should return empty array if no contracts found', async () => {
      Contract.findAll = jest.fn().mockResolvedValue([]);
  
      const result = await contractService.getContractsForProfile(42);
  
      expect(Contract.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  