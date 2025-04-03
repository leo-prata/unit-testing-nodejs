import CreatePostController from "./CreatePostController";
import CreatePostService from "../../services/post/CreatePostService";
import { Request, Response } from 'express';

jest.mock('../../services/post/CreatePostService', () => ({
    execute: jest.fn(), // instancia.execute se torna funcao mockada
}));

//simula a requisição
const mockReq = {
    body: { title: "title", content: "content" },
} as Request;


//simula a resposta 
const mockRes = {
    json: jest.fn(),
} as unknown as Response;

describe("Create Post Controller", () => {
    it("should call service and return the data as a response in json", async () => {
        //simula o post que o serviço vai retornar
        const mock_post_returned = { id: 1, title: "title", content: "content" };
        
        //configura o mock para retornar esses dados
        (CreatePostService.execute as jest.Mock).mockResolvedValue(mock_post_returned);

        //chama a funcao com o req e res mockados
        await CreatePostController.handle(mockReq, mockRes);
    
        //verifica se foi chamado com os dados certos
        expect(CreatePostService.execute).toHaveBeenCalledWith({
            title: mock_post_returned.title,
            content: mock_post_returned.content
        });

        //verifica se a reposta json foi enviada corretamente
        expect(mockRes.json).toHaveBeenCalledWith(mock_post_returned);
    }); 
});