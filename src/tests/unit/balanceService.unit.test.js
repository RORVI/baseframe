const balanceService = require('../../services/balanceService');
const { Op } = require('sequelize');

jest.mock('../../database/models', () => {
    const mockFindByPk = jest.fn();
    const mockFindAll = jest.fn();
    const mockSave = jest.fn();

    // This helps prevent 'uuid' or other internal Sequelize errors. 
    const mockTransaction = jest.fn(async (callback) => {
        const t = {
            LOCK: { UPDATE: 'UPDATE' },
            ...jest.requireActual('sequelize').Transaction.prototype,
            uuid: 'mock-transaction-uuid',
            name: 'mock-transaction-name',
        };
        return await callback(t);
    });

    const actualModels = jest.requireActual('../../database/models');

    return {
        sequelize: {
            ...actualModels.sequelize,
            transaction: mockTransaction,
            models: {
                Profile: { ...actualModels.sequelize.models.Profile, findByPk: mockFindByPk },
                Job: { ...actualModels.sequelize.models.Job, findAll: mockFindAll },
                Contract: { ...actualModels.sequelize.models.Contract },
            }
        },
        mockFindByPk,
        mockFindAll,
        mockSave,
        mockTransaction
    };
});

const { mockFindByPk, mockFindAll, mockSave, mockTransaction } = require('../../database/models');

describe('balanceService.deposit', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should reject if userId !== requesterId', async () => {
        const result = await balanceService.deposit(1, 100, 2);
        expect(result).toEqual({
            success: false,
            message: 'You can only deposit to your own account',
        });
        expect(mockTransaction).not.toHaveBeenCalled();
    });

    it('should throw if profile is not found or not a client', async () => {
        mockFindByPk.mockResolvedValue(null);

        await expect(balanceService.deposit(1, 100, 1)).rejects.toThrow('Only clients can deposit');
        expect(mockFindByPk).toHaveBeenCalledWith(1, { transaction: expect.objectContaining({ uuid: 'mock-transaction-uuid' }) });
    });

    it('should throw if deposit > 25% of unpaid jobs total', async () => {
        const mockProfile = { type: 'client', balance: 100, save: mockSave };
        mockFindByPk.mockResolvedValue(mockProfile);
        mockFindAll.mockResolvedValue([
            { price: 400 },
            { price: 200 },
        ]);

        await expect(balanceService.deposit(1, 200, 1)).rejects.toThrow(
            'Cannot deposit more than 25% of unpaid jobs total (150)'
        );
        expect(mockFindByPk).toHaveBeenCalledWith(1, { transaction: expect.objectContaining({ uuid: 'mock-transaction-uuid' }) });
        expect(mockFindAll).toHaveBeenCalledWith(expect.objectContaining({
            include: {
                model: expect.anything(),
                where: {
                    ClientId: 1,
                    status: 'in_progress'
                }
            },
            where: {
                paid: { [Op.not]: true }
            },
            transaction: expect.objectContaining({ uuid: 'mock-transaction-uuid' })
        }));
    });

    it('should deposit if amount is valid and update balance', async () => {
        const mockProfile = { type: 'client', balance: 100, save: mockSave };
        mockFindByPk.mockResolvedValue(mockProfile);
        mockFindAll.mockResolvedValue([
            { price: 400 },
            { price: 200 },
        ]);

        const result = await balanceService.deposit(1, 100, 1);

        expect(result).toEqual({ success: true, balance: 200 });
        expect(mockProfile.balance).toBe(200);
        expect(mockSave).toHaveBeenCalledWith({ transaction: expect.objectContaining({ uuid: 'mock-transaction-uuid' }) });
        expect(mockFindByPk).toHaveBeenCalledWith(1, { transaction: expect.objectContaining({ uuid: 'mock-transaction-uuid' }) });
        expect(mockFindAll).toHaveBeenCalledWith(expect.objectContaining({
            include: expect.anything(),
            where: { paid: { [Op.not]: true } },
            transaction: expect.objectContaining({ uuid: 'mock-transaction-uuid' })
        }));
    });
});