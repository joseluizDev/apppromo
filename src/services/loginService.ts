import HttpClient from "../http/httpClient";
import Cookie from 'js-cookie';

export default class LoginService {
    async login(email: string, senha: string): Promise<boolean> {
        try {
            const response = await HttpClient.post('Auth/login', { email, senha });

            if (response.status !== 200) {
                return false;
            }

            const dados = await response.json();
            Cookie.set('token', dados.token);

            return dados;
        } catch (error) {
            console.error("Erro no login", error);
            return false;
        }
    }
}
