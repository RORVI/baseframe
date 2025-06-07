const adminService = require('../../services/adminService');
const { Op } = require('sequelize');

jest.mock('../../database/models', () => {
  const mockFindAll = jest.fn();

  const actualModels = jest.requireActual('../../database/models');

  return {
    sequelize: {
      ...actualModels.sequelize,
      models: {
        Job: { ...actualModels.sequelize.models.Job, findAll: mockFindAll },
        Contract: { ...actualModels.sequelize.models.Contract },
        Profile: { ...actualModels.sequelize.models.Profile }
      },
      fn: jest.fn((...args) => `fn(${args.join(',')})`),
      col: jest.fn((arg) => `col(${arg})`),
      literal: jest.fn((arg) => `literal(${arg})`),
    },
    default: {
      sequelize: {
        ...actualModels.sequelize,
        models: {
          Job: { ...actualModels.sequelize.models.Job, findAll: mockFindAll },
          Contract: { ...actualModels.sequelize.models.Contract },
          Profile: { ...actualModels.sequelize.models.Profile }
        },
        fn: jest.fn((...args) => `fn(${args.join(',')})`),
        col: jest.fn((arg) => `col(${arg})`),
        literal: jest.fn((arg) => `literal(${arg})`),
      },
    },
    mockFindAll
  };
});

const { mockFindAll } = require('../../database/models');

describe('adminService.findTopProfession', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return profession if data exists', async () => {
    mockFindAll.mockResolvedValue([{ profession: 'Engineer', total_earned: 2000 }]);

    const result = await adminService.findTopProfession('2025-01-01', '2025-12-31');
    expect(result).toBe('Engineer');
    expect(mockFindAll).toHaveBeenCalledWith(expect.objectContaining({
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: [new Date('2025-01-01'), new Date('2025-12-31')]
        }
      }
    }));
  });

  it('should return "No data" if result is empty', async () => {
    mockFindAll.mockResolvedValue([]);
    const result = await adminService.findTopProfession('2025-01-01', '2025-12-31');
    expect(result).toBe('No data');
  });
});

describe('adminService.getBestClients', () => {
  it('should return the best clients based on payments', async () => {
    const fakeClients = [
      { id: 1, fullName: 'John Doe', paid: 1500 },
      { id: 2, fullName: 'Jane Smith', paid: 1000 }
    ];
    mockFindAll.mockResolvedValue(fakeClients);

    const result = await adminService.getBestClients('2025-01-01', '2025-12-31', 2);

    expect(result).toEqual(fakeClients);
    expect(mockFindAll).toHaveBeenCalledWith(expect.objectContaining({
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: [new Date('2025-01-01'), new Date('2025-12-31')]
        }
      },
      limit: 2
    }));
  });
});