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

    async deletarProduto(id: number) {
        try {
            const response = await HttpClient.delete(`Produto/remover/$${id}`, true);
            if (response.status !== 200) {
                return false;
            }
            return true;
        } catch (error) {
            console.error("Erro no deletar", error);
            return false;
        }
    }

    async atualizarProduto(produto: FormData) {
        try {
            const response = await HttpClient.putFromData('Produto/atualizar', produto, true);
            if (response.status !== 200) {
                return false;
            }
            return true;
        } catch (error) {
            console.error("Erro ao atualizar produto", error);
            return false;
        }
    }

    async removerImagem(url: string) {
        try {
            const response = await HttpClient.post(`Imagem/deletar`, {url}, true); 
            if (response.status !== 200) {
                return false;
            }
            return true;
        } catch (error) {
            console.error("Erro ao remover imagem", error);
            return false;
        }
    }
}