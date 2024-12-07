import HttpClient from "../http/httpClient";

export default class ProdutoService {
    async cadastrarProduto(produto: FormData) {
        try {
            const response = await HttpClient.postFormData('Produto/cadastrar', produto, true);
            if (response.status !== 201 && response.status !== 200) {
                return false;
            }
            return true;
        } catch (error: any) {
            console.error("Erro ao cadastrar produto", error.message);
            return false;
        }
    }
}