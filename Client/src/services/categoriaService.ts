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
}