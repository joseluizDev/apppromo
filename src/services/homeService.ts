import HttpClient from "../http/httpClient";

export default class HomeService {
    async listarProdutos() {
        try {
            const response = await HttpClient.get('Produto/listar', true);

            if (response.status !== 200) {
                return false;
            }

            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error("Erro no listar", error);
            return false;
        }
    }

    async listarProdutosPorCategoria(id: number) {
        try {
            const response = await HttpClient.get(`Produto/listar/categoria/$${id}`, true);

            if (response.status !== 200) {
                return false;
            }

            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error("Erro no listar", error);
            return false;
        }
    }
}