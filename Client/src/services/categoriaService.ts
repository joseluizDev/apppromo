import HttpClient from "../http/httpClient";

export default class CategoriaService {
    async listarCategorias() {
        try {
            const response = await HttpClient.get('Categoria/listar');
            if (response.status !== 200) {
                return false;
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deletarCategoria(id: number) {
        try {
            const response = await HttpClient.delete(`Categoria/remover/$${id}`, true);
            if (response.status !== 200) {
                return false;
            }
            return true;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async criarCategoria(nome: string) {
        try {
            const response = await HttpClient.post('Categoria/cadastrar', { nome: nome }, true);
            if (response.status !== 200) {
                return false;
            }
            return true;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async atualizarCategoria(categoria: { id: number, nome: string }) {
        try {
            const response = await HttpClient.put('Categoria/atualizar', categoria, true);
            if (response.status !== 200) {
                return false;
            }
            return true;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async buscarCategoriaPorId(id: number) {
        try {
            const response = await HttpClient.get(`Categoria/listar/$${id}`, true);
            if (response.status !== 200) {
                return false;
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}