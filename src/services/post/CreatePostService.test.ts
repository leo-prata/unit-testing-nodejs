import prismaClient from '../../prisma';
import CreatePostService from './CreatePostService';

jest.mock('../../prisma', () => ({
	post: {
		create: jest.fn(), // prismaClient.post.create se torna uma função mockada -> (jest.fn())
	},
}));

describe('Create Post Service', () => {
	it('should create a post with correct data', async () => {
		// dados de teste
		const post_data = { title: 'Title', content: 'Content' };

		// chamada da função com estes dados
		await CreatePostService.execute(post_data);

		// verificação se a função prismaClient.post.create foi chamada com os dados corretos
		expect(prismaClient.post.create).toHaveBeenCalledWith({
			data: {
				title: post_data.title,
				content: post_data.content,
			},
		});
	});

	it('should return the created post', async () => {
		// dados de exemplo
		const post_data = { title: 'Title', content: 'Content' };

		//dados que a funcao mockada do prisma irá retornar
		const returned_data = { id: 1, title: 'Title', content: 'Content' };

		//configura o mock para retornar o returned_data
		(prismaClient.post.create as jest.Mock).mockResolvedValue(returned_data);

		const result = await CreatePostService.execute(post_data);

		//verifica se os resultados batem
		expect(result).toEqual(returned_data);
	});
});
