import prismaClient from '../../prisma';
import ListPostService from './ListPostService';

jest.mock('../../prisma', () => ({
	post: {
		findMany: jest.fn(),
	},
}));

describe('list post service', () => {
	it('should get all data from db', async () => {});
});
