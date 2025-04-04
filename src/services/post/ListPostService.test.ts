import prismaClient from '../../prisma';
import ListPostService from './ListPostService';

jest.mock('../../prisma', () => ({
	post: {
		findMany: jest.fn(),
	},
}));

describe('list post service', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should get all posts from db', async () => {
		const mockPosts = [
			{ id: 1, title: 'Post 1', content: 'Content 1' },
			{ id: 2, title: 'Post 2', content: 'Content 2' },
		];

		(prismaClient.post.findMany as jest.Mock).mockResolvedValue(mockPosts);

		const sutResult = await ListPostService.execute();

		expect(prismaClient.post.findMany).toHaveBeenCalledTimes(1);
		expect(prismaClient.post.findMany).toHaveBeenCalledWith({
			select: {
				title: true,
				content: true,
				id: true,
			},
		});
		expect(sutResult).toEqual(mockPosts);
	});
});
