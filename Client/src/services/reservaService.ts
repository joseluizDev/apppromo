import HttpClient from "../http/httpClient";

export default class ReservaService {
    async CriarReserva(product: object) {
        try {
            const response = await HttpClient.post('Reserva/cadastrar', product, true);
            if (response.status !== 200) {
                return false;
            }
            return response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async ListarReservas() {
        try {
            const response = await HttpClient.get('Reserva/listar', true);
            if (response.status !== 200) {
                return false;
            }
            const data = response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}